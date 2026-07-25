import { NextRequest, NextResponse, after } from 'next/server'
import OpenAI from 'openai'
import { randomUUID } from 'crypto'
import { createClient } from '@/utils/supabase/server'
import { buildSystemPrompt } from '../../../scenarios'

interface Correction {
  original: string
  corrected: string
  type: 'grammar' | 'phrasing' | 'vocabulary'
  explanation: string
}

const REPEAT_MATCH_THRESHOLD = 0.8

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim()
}

function levenshtein(a: string, b: string): number {
  const rows = a.length + 1
  const cols = b.length + 1
  const dist = Array.from({ length: rows }, (_, i) => [i, ...Array(cols - 1).fill(0)])
  for (let j = 1; j < cols; j++) dist[0][j] = j
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dist[i][j] = Math.min(dist[i - 1][j] + 1, dist[i][j - 1] + 1, dist[i - 1][j - 1] + cost)
    }
  }
  return dist[rows - 1][cols - 1]
}

function similarity(a: string, b: string): number {
  const na = normalize(a)
  const nb = normalize(b)
  if (!na && !nb) return 1
  const maxLen = Math.max(na.length, nb.length)
  if (maxLen === 0) return 1
  return 1 - levenshtein(na, nb) / maxLen
}

async function synthesizeSpeech(client: OpenAI, text: string): Promise<Buffer | null> {
  try {
    const speech = await client.audio.speech.create({ model: 'tts-1', voice: 'alloy', input: text })
    return Buffer.from(await speech.arrayBuffer())
  } catch {
    return null
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: sessionId } = await params

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'OpenAI not configured' }, { status: 500 })

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: session, error: sessionError } = await supabase
    .from('coach_sessions')
    .select('id, mode, scenario_type, user_id, correction_style')
    .eq('id', sessionId)
    .single()

  if (sessionError || !session || session.user_id !== user.id) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  const formData = await req.formData()
  const audio = formData.get('audio') as Blob | null
  if (!audio) return NextResponse.json({ error: 'Missing audio' }, { status: 400 })

  const expectedPhraseRaw = formData.get('expectedPhrase')
  const expectedPhrase = typeof expectedPhraseRaw === 'string' && expectedPhraseRaw.trim() ? expectedPhraseRaw.trim() : null

  const client = new OpenAI({ apiKey })

  // Whisper requires a File-like object with a filename
  const audioFile = new File([await audio.arrayBuffer()], 'turn.webm', { type: audio.type || 'audio/webm' })

  let transcript: string
  try {
    console.time('whisper')
    const transcription = await client.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
    })
    console.timeEnd('whisper')
    transcript = transcription.text.trim()
  } catch (err) {
    console.error('Whisper transcription failed:', err)
    const message = err instanceof Error ? err.message : 'Speech-to-text failed'
    return NextResponse.json({ error: `Speech-to-text failed: ${message}` }, { status: 502 })
  }

  if (!transcript) {
    return NextResponse.json({ error: 'Could not understand audio' }, { status: 422 })
  }

  // Repeat-back verification: don't treat this as a new conversational turn.
  if (expectedPhrase) {
    const score = similarity(transcript, expectedPhrase)
    const correct = score >= REPEAT_MATCH_THRESHOLD
    return NextResponse.json({ repeatCheck: true, correct, transcript, expectedPhrase })
  }

  const systemPrompt = buildSystemPrompt(session.mode, session.scenario_type, session.correction_style)

  let reply: string
  let corrections: Correction[]
  let nativeRephrase: string | null
  let correctionSpeech: string | null
  try {
    console.time('gpt-4o')
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: transcript },
      ],
    })
    console.timeEnd('gpt-4o')
    const parsed = JSON.parse(completion.choices[0]?.message?.content ?? '{}')
    reply = typeof parsed.reply === 'string' ? parsed.reply : "Sorry, could you say that again?"
    corrections = Array.isArray(parsed.corrections) ? parsed.corrections : []
    nativeRephrase = typeof parsed.nativeRephrase === 'string' ? parsed.nativeRephrase : null
    correctionSpeech = typeof parsed.correctionSpeech === 'string' ? parsed.correctionSpeech : null
  } catch (err) {
    console.error('GPT-4o reply failed:', err)
    const message = err instanceof Error ? err.message : 'AI reply failed'
    return NextResponse.json({ error: `AI reply failed: ${message}` }, { status: 502 })
  }

  console.time('tts')
  const [replyAudio, correctionAudio] = await Promise.all([
    synthesizeSpeech(client, reply),
    correctionSpeech ? synthesizeSpeech(client, correctionSpeech) : Promise.resolve(null),
  ])
  console.timeEnd('tts')

  const userTurnId = randomUUID()

  after(async () => {
    console.time('db-writes')
    await supabase.from('coach_turns').insert({ id: userTurnId, session_id: sessionId, speaker: 'user', transcript, native_rephrase: nativeRephrase })

    const dbWrites: PromiseLike<unknown>[] = [
      supabase.from('coach_turns').insert({ session_id: sessionId, speaker: 'ai', transcript: reply }),
    ]
    if (corrections.length > 0) {
      dbWrites.push(
        supabase.from('coach_corrections').insert(
          corrections.map((c) => ({
            turn_id: userTurnId,
            original: c.original,
            corrected: c.corrected,
            type: c.type,
            explanation: c.explanation,
          }))
        )
      )
    }
    await Promise.all(dbWrites)
    console.timeEnd('db-writes')
  })

  return NextResponse.json({
    transcript,
    aiReply: reply,
    corrections,
    nativeRephrase,
    correctionSpeech,
    replyAudioBase64: replyAudio ? replyAudio.toString('base64') : null,
    correctionAudioBase64: correctionAudio ? correctionAudio.toString('base64') : null,
  })
}
