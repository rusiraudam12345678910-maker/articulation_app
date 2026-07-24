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

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: sessionId } = await params

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'OpenAI not configured' }, { status: 500 })

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: session, error: sessionError } = await supabase
    .from('coach_sessions')
    .select('id, mode, scenario_type, user_id')
    .eq('id', sessionId)
    .single()

  if (sessionError || !session || session.user_id !== user.id) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  const formData = await req.formData()
  const audio = formData.get('audio') as Blob | null
  if (!audio) return NextResponse.json({ error: 'Missing audio' }, { status: 400 })

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

  const systemPrompt = buildSystemPrompt(session.mode, session.scenario_type)

  let reply: string
  let corrections: Correction[]
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
  } catch (err) {
    console.error('GPT-4o reply failed:', err)
    const message = err instanceof Error ? err.message : 'AI reply failed'
    return NextResponse.json({ error: `AI reply failed: ${message}` }, { status: 502 })
  }

  let audioBuffer: Buffer | null = null
  try {
    console.time('tts')
    const speech = await client.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input: reply,
    })
    audioBuffer = Buffer.from(await speech.arrayBuffer())
    console.timeEnd('tts')
  } catch {
    // Non-fatal: user still gets text + corrections without audio playback
  }

  const userTurnId = randomUUID()

  after(async () => {
    console.time('db-writes')
    await supabase.from('coach_turns').insert({ id: userTurnId, session_id: sessionId, speaker: 'user', transcript })

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

  const meta = JSON.stringify({ transcript, aiReply: reply, corrections })

  return new NextResponse(audioBuffer ? new Uint8Array(audioBuffer) : undefined, {
    headers: {
      'Content-Type': audioBuffer ? 'audio/mpeg' : 'application/octet-stream',
      'X-Coach-Meta': Buffer.from(meta, 'utf-8').toString('base64'),
    },
  })
}
