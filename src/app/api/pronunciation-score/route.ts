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
  const referenceText = formData.get('referenceText') as string | null

  if (!audio || !referenceText) {
    return NextResponse.json({ error: 'Missing audio or referenceText' }, { status: 400 })
  }

  const assessmentConfig = Buffer.from(
    JSON.stringify({
      ReferenceText: referenceText,
      GradingSystem: 'HundredMark',
      Granularity: 'Word',
      EnableMiscue: true,
    })
  ).toString('base64')

  const audioBuffer = await audio.arrayBuffer()

  const url = `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US&format=detailed`

  // Try subscription key first, fall back to bearer token
  const token = await getAzureToken(key, region)

  const authHeaders: Record<string, string> = token
    ? { 'Authorization': `Bearer ${token}` }
    : { 'Ocp-Apim-Subscription-Key': key }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...authHeaders,
      'Content-Type': 'audio/wav',
      'Pronunciation-Assessment': assessmentConfig,
    },
    body: audioBuffer,
  })

  const result = await response.json()

  if (!response.ok) {
    return NextResponse.json({
      error: `Azure error ${response.status}`,
      raw: result,
      tokenObtained: !!token,
    }, { status: 502 })
  }

  if (result.RecognitionStatus !== 'Success') {
    return NextResponse.json({
      error: `Recognition failed: ${result.RecognitionStatus}`,
      raw: result,
    }, { status: 422 })
  }

  const nBest = result?.NBest?.[0]
  const pronAssessment = nBest?.PronunciationAssessment

  if (!pronAssessment) {
    return NextResponse.json({ error: 'No pronunciation assessment in response', raw: result }, { status: 422 })
  }

  const words = (nBest?.Words ?? []).map((w: {
    Word: string
    PronunciationAssessment?: { AccuracyScore: number; ErrorType: string }
  }) => ({
    word: w.Word,
    accuracyScore: w.PronunciationAssessment?.AccuracyScore ?? 0,
    errorType: w.PronunciationAssessment?.ErrorType ?? 'None',
  }))

  return NextResponse.json({
    accuracyScore: Math.round(pronAssessment.AccuracyScore ?? 0),
    fluencyScore: Math.round(pronAssessment.FluencyScore ?? 0),
    completenessScore: Math.round(pronAssessment.CompletenessScore ?? 0),
    pronunciationScore: Math.round(pronAssessment.PronScore ?? 0),
    words,
  })
}
