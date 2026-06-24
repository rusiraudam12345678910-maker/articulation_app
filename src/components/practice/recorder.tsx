'use client'

import { useEffect, useRef, useState } from 'react'
import { logPractice } from '@/app/dashboard/practice/actions'

const WAVE_BAR_COUNT = 48

interface RecorderProps {
  entryId: string | null
  drillText: string
  mode: string
  onPracticed?: () => void
}

export default function Recorder({ entryId, drillText, mode, onPracticed }: RecorderProps) {
  const [recording, setRecording] = useState(false)
  const [hasRecording, setHasRecording] = useState(false)
  const [statusText, setStatusText] = useState('Tap to record yourself saying it')
  const [elapsed, setElapsed] = useState('0:00')
  const [marked, setMarked] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioBlobRef = useRef<Blob | null>(null)
  const audioURLRef = useRef<string | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const animFrameRef = useRef<number>(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef(0)
  const barRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    return () => {
      cleanup()
    }
  }, [])

  // reset when drill changes
  useEffect(() => {
    resetRecorder()
  }, [drillText])

  function cleanup() {
    if (timerRef.current) clearInterval(timerRef.current)
    cancelAnimationFrame(animFrameRef.current)
    if (audioCtxRef.current) audioCtxRef.current.close()
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    if (audioURLRef.current) URL.revokeObjectURL(audioURLRef.current)
  }

  function resetRecorder() {
    cleanup()
    setRecording(false)
    setHasRecording(false)
    setStatusText('Tap to record yourself saying it')
    setElapsed('0:00')
    setMarked(false)
    audioBlobRef.current = null
    audioURLRef.current = null
    barRefs.current.forEach(b => {
      if (b) { b.style.height = '3px'; b.classList.remove('bg-red-500'); b.classList.add('bg-zinc-600') }
    })
  }

  function formatTime(ms: number) {
    const s = Math.floor(ms / 1000)
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  }

  // HTTPS or localhost required for MediaRecorder mic access
  async function startRecording() {
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch {
      setStatusText('Microphone access needed — check browser permissions')
      return
    }

    audioChunksRef.current = []
    const mr = new MediaRecorder(streamRef.current)
    mediaRecorderRef.current = mr
    mr.ondataavailable = e => audioChunksRef.current.push(e.data)
    mr.onstop = () => {
      audioBlobRef.current = new Blob(audioChunksRef.current, { type: 'audio/webm' })
      if (audioURLRef.current) URL.revokeObjectURL(audioURLRef.current)
      audioURLRef.current = URL.createObjectURL(audioBlobRef.current)
      setHasRecording(true)
      setStatusText('Recorded — listen back and compare')
      streamRef.current?.getTracks().forEach(t => t.stop())
    }
    mr.start()

    // waveform via AnalyserNode
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
    setStatusText('Recording — speak now')
    startTimeRef.current = Date.now()
    timerRef.current = setInterval(() => {
      setElapsed(formatTime(Date.now() - startTimeRef.current))
    }, 200)
  }

  function stopRecording() {
    if (mediaRecorderRef.current?.state !== 'inactive') mediaRecorderRef.current?.stop()
    setRecording(false)
    if (timerRef.current) clearInterval(timerRef.current)
    cancelAnimationFrame(animFrameRef.current)
    if (audioCtxRef.current) audioCtxRef.current.close()
  }

  function playBack() {
    if (audioURLRef.current) new Audio(audioURLRef.current).play()
  }

  async function markPracticed() {
    await logPractice(entryId, mode, drillText)
    setMarked(true)
    setStatusText('Marked practiced ✓')
    onPracticed?.()
  }

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5">
      <div className="flex items-center gap-4">
        {/* Record button */}
        <button
          onClick={() => recording ? stopRecording() : startRecording()}
          aria-label={recording ? 'Stop recording' : 'Start recording'}
          className={`w-14 h-14 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
            recording
              ? 'border-red-500 bg-red-500 animate-pulse'
              : 'border-red-500 bg-transparent hover:bg-red-500/10'
          }`}
        >
          <div className={`rounded-full bg-red-500 transition-all ${recording ? 'w-3.5 h-3.5 rounded-sm' : 'w-[18px] h-[18px]'}`} />
        </button>

        {/* Waveform bars */}
        <div className="flex-1 h-14 flex items-center gap-0.5 overflow-hidden">
          {Array.from({ length: WAVE_BAR_COUNT }).map((_, i) => (
            <div
              key={i}
              ref={el => { barRefs.current[i] = el }}
              className="w-[3px] min-h-[3px] bg-zinc-600 rounded-sm transition-[height] duration-[50ms]"
              style={{ height: '3px' }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 font-mono text-xs text-zinc-400">
        <span>{statusText}</span>
        <span>{elapsed}</span>
      </div>

      {hasRecording && !marked && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={playBack}
            className="rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold px-3.5 py-1.5 transition-colors"
          >
            ▶ Play back
          </button>
          <button
            onClick={resetRecorder}
            className="rounded-lg border border-zinc-600 text-zinc-300 hover:bg-zinc-700 text-xs font-semibold px-3.5 py-1.5 transition-colors"
          >
            Discard
          </button>
          <button
            onClick={markPracticed}
            className="rounded-lg border border-zinc-600 text-zinc-300 hover:bg-zinc-700 text-xs font-semibold px-3.5 py-1.5 transition-colors"
          >
            ✓ Mark practiced
          </button>
        </div>
      )}

      {marked && (
        <div className="mt-3 text-xs font-mono text-emerald-400">Marked practiced ✓</div>
      )}
    </div>
  )
}
