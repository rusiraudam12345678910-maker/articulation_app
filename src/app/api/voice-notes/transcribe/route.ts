import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'OpenAI not configured' }, { status: 500 })
  }

  const formData = await req.formData()
  const audio = formData.get('audio') as Blob | null

  if (!audio) {
    return NextResponse.json({ error: 'Missing audio' }, { status: 400 })
  }

  const client = new OpenAI({ apiKey })

  // Whisper requires a File-like object with a filename
  const audioFile = new File([await audio.arrayBuffer()], 'recording.webm', { type: audio.type || 'audio/webm' })

  let transcript: string
  try {
    const transcription = await client.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'en',
    })
    transcript = transcription.text.trim()
  } catch (err) {
    console.error('Whisper transcription failed:', err)
    const message = err instanceof Error ? err.message : 'Speech-to-text failed'
    return NextResponse.json({ error: `Speech-to-text failed: ${message}` }, { status: 502 })
  }

  if (!transcript) {
    return NextResponse.json({ error: 'Could not understand audio' }, { status: 422 })
  }

  return NextResponse.json({ transcript })
}
