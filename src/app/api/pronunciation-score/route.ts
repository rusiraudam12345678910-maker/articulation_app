import { NextRequest, NextResponse } from 'next/server'

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

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Content-Type': 'audio/wav',
      'Pronunciation-Assessment': assessmentConfig,
    },
    body: audioBuffer,
  })

  const result = await response.json()

  if (!response.ok) {
    return NextResponse.json({ error: 'Azure error', status: response.status, raw: result }, { status: 502 })
  }

  // RecognitionStatus other than Success means Azure heard nothing
  if (result.RecognitionStatus !== 'Success') {
    return NextResponse.json({
      error: `Azure recognition failed: ${result.RecognitionStatus}`,
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
