'use client'

import { useEffect, useRef, useState } from 'react'

const WAVE_BAR_COUNT = 48

interface TurnResult {
  transcript: string
  aiReply: string
  corrections: {
    original: string
    corrected: string
    type: 'grammar' | 'phrasing' | 'vocabulary'
    explanation: string
  }[]
  nativeRephrase: string | null
  correctionSpeech: string | null
}

interface RepeatCheckResult {
  correct: boolean
  transcript: string
  expectedPhrase: string
}

interface CoachRecorderProps {
  sessionId: string
  onTurn: (result: TurnResult) => void
  expectedPhrase?: string | null
  onRepeatCheck?: (result: RepeatCheckResult) => void
}

function playAudioBase64(base64: string): Promise<void> {
  return new Promise((resolve) => {
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
    const blob = new Blob([bytes], { type: 'audio/mpeg' })
    const url = URL.createObjectURL(blob)
    const audio = new Audio(url)
    audio.onended = () => {
      URL.revokeObjectURL(url)
      resolve()
    }
    audio.onerror = () => {
      URL.revokeObjectURL(url)
      resolve()
    }
    void audio.play()
  })
}

export default function CoachRecorder({ sessionId, onTurn, expectedPhrase, onRepeatCheck }: CoachRecorderProps) {
  const [recording, setRecording] = useState(false)
  const [busy, setBusy] = useState(false)
  const [statusText, setStatusText] = useState(expectedPhrase ? 'Hold to talk, then repeat the phrase' : 'Hold to talk, release to send')
  const [errorText, setErrorText] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const animFrameRef = useRef<number>(0)
  const barRefs = useRef<(HTMLDivElement | null)[]>([])
  const recordingStartRef = useRef(0)

  const MIN_RECORDING_MS = 400

  useEffect(() => {
    return () => cleanup()
  }, [])

  useEffect(() => {
    setStatusText(expectedPhrase ? 'Hold to talk, then repeat the phrase' : 'Hold to talk, release to send')
  }, [expectedPhrase])

  function cleanup() {
    cancelAnimationFrame(animFrameRef.current)
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') audioCtxRef.current.close()
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop())
  }

  async function startRecording() {
    setErrorText(null)
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch {
      setErrorText('Microphone access needed — check browser permissions')
      return
    }

    audioChunksRef.current = []
    const mr = new MediaRecorder(streamRef.current)
    mediaRecorderRef.current = mr
    mr.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data)
    }
    mr.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: mr.mimeType || 'audio/webm' })
      streamRef.current?.getTracks().forEach((t) => t.stop())
      if (blob.size < 2000) {
        setStatusText('Hold to talk, release to send')
        setErrorText('Recording too short — hold the button a bit longer')
        return
      }
      void sendTurn(blob)
    }
    mr.start()
    recordingStartRef.current = Date.now()

    audioCtxRef.current = new AudioContext()
    const source = audioCtxRef.current.createMediaStreamSource(streamRef.current)
    const analyser = audioCtxRef.current.createAnalyser()
    analyser.fftSize = 256
    source.connect(analyser)
    const dataArray = new Uint8Array(analyser.frequencyBinCount)

    function drawWave() {
      analyser.getByteFrequencyData(dataArray)
      const step = Math.floor(dataArray.length / WAVE_BAR_COUNT)
      barRefs.current.forEach((bar, i) => {
        if (!bar) return
        const v = dataArray[i * step] ?? 0
        bar.style.height = Math.max(3, (v / 255) * 56) + 'px'
        if (v > 30) {
          bar.classList.add('bg-red-500')
          bar.classList.remove('bg-zinc-600')
        } else {
          bar.classList.remove('bg-red-500')
          bar.classList.add('bg-zinc-600')
        }
      })
      animFrameRef.current = requestAnimationFrame(drawWave)
    }
    drawWave()

    setRecording(true)
    setStatusText('Recording — release to send')
  }

  function stopRecording() {
    setRecording(false)
    cancelAnimationFrame(animFrameRef.current)
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') audioCtxRef.current.close()

    const elapsed = Date.now() - recordingStartRef.current
    const remaining = MIN_RECORDING_MS - elapsed
    const doStop = () => {
      if (mediaRecorderRef.current?.state !== 'inactive') mediaRecorderRef.current?.stop()
    }
    if (remaining > 0) {
      setTimeout(doStop, remaining)
    } else {
      doStop()
    }
  }

  async function sendTurn(blob: Blob) {
    setBusy(true)
    setStatusText(expectedPhrase ? 'Checking...' : 'Thinking...')
    try {
      const formData = new FormData()
      formData.append('audio', blob, 'turn.webm')
      if (expectedPhrase) formData.append('expectedPhrase', expectedPhrase)

      const res = await fetch(`/api/coach/session/${sessionId}/turn`, {
        method: 'POST',
        body: formData,
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setErrorText(data.error ?? 'Something went wrong — try again')
        setStatusText('Hold to talk, release to send')
        return
      }

      if (data.repeatCheck) {
        setStatusText(data.correct ? 'Nice!' : 'Try again...')
        if (data.feedbackAudioBase64) await playAudioBase64(data.feedbackAudioBase64)
        onRepeatCheck?.({ correct: data.correct, transcript: data.transcript, expectedPhrase: data.expectedPhrase })
        setStatusText(data.correct ? 'Hold to talk, release to send' : 'Hold to talk, then repeat the phrase')
        return
      }

      onTurn({
        transcript: data.transcript,
        aiReply: data.aiReply,
        corrections: data.corrections,
        nativeRephrase: data.nativeRephrase,
        correctionSpeech: data.correctionSpeech ?? null,
      })

      if (data.correctionAudioBase64) await playAudioBase64(data.correctionAudioBase64)
      if (data.replyAudioBase64) await playAudioBase64(data.replyAudioBase64)

      setStatusText('Hold to talk, release to send')
    } catch {
      setErrorText('Network error — try again')
      setStatusText('Hold to talk, release to send')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5">
      <div className="flex items-center gap-4">
        <button
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onTouchStart={(e) => { e.preventDefault(); startRecording() }}
          onTouchEnd={(e) => { e.preventDefault(); stopRecording() }}
          disabled={busy}
          aria-label={recording ? 'Recording — release to send' : 'Hold to talk'}
          className={`w-14 h-14 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all disabled:opacity-50 ${
            recording
              ? 'border-red-500 bg-red-500 animate-pulse'
              : 'border-red-500 bg-transparent hover:bg-red-500/10'
          }`}
        >
          <div className={`rounded-full bg-red-500 transition-all ${recording ? 'w-3.5 h-3.5 rounded-sm' : 'w-[18px] h-[18px]'}`} />
        </button>

        <div className="flex-1 h-14 flex items-center gap-0.5 overflow-hidden">
          {Array.from({ length: WAVE_BAR_COUNT }).map((_, i) => (
            <div
              key={i}
              ref={(el) => { barRefs.current[i] = el }}
              className="w-[3px] min-h-[3px] bg-zinc-600 rounded-sm transition-[height] duration-[50ms]"
              style={{ height: '3px' }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 font-mono text-xs text-zinc-400">
        <span>{statusText}</span>
      </div>

      {errorText && <div className="mt-2 text-xs font-mono text-red-400">{errorText}</div>}
    </div>
  )
}
