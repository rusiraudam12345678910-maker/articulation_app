import { NextRequest, NextResponse } from 'next/server'

async function getAzureToken(key: string, region: string): Promise<string | null> {
  try {
    const res = await fetch(`https://${region}.api.cognitive.microsoft.com/sts/v1.0/issuetoken`, {
      method: 'POST',
      headers: { 'Ocp-Apim-Subscription-Key': key, 'Content-Length': '0' },
    })
    if (!res.ok) return null
    return await res.text()
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  const key = process.env.AZURE_SPEECH_KEY
  const region = process.env.AZURE_SPEECH_REGION

  if (!key || !region) {
    return NextResponse.json({ error: 'Azure Speech not configured' }, { status: 500 })
  }

  const formData = await req.formData()
  const audio = formData.get('audio') as Blob | null

  if (!audio) {
    return NextResponse.json({ error: 'Missing audio' }, { status: 400 })
  }

  const audioBuffer = await audio.arrayBuffer()

  const url = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US&format=detailed`

  const token = await getAzureToken(key, region)

  const authHeaders: Record<string, string> = token
    ? { 'Authorization': `Bearer ${token}` }
    : { 'Ocp-Apim-Subscription-Key': key }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...authHeaders,
      'Content-Type': 'audio/wav',
    },
    body: audioBuffer,
  })

  const result = await response.json()

  if (!response.ok) {
    return NextResponse.json({ error: `Azure error ${response.status}`, raw: result }, { status: 502 })
  }

  if (result.RecognitionStatus !== 'Success') {
    return NextResponse.json({ error: `Recognition failed: ${result.RecognitionStatus}` }, { status: 422 })
  }

  const transcript = result?.NBest?.[0]?.Display ?? result?.DisplayText ?? ''

  if (!transcript) {
    return NextResponse.json({ error: 'Could not understand audio' }, { status: 422 })
  }

  return NextResponse.json({ transcript })
}
