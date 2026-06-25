'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

const WAVE_BAR_COUNT = 48

type Entry = {
  id: string
  content: string
  type: string
}

function Recorder({ drillText }: { drillText: string }) {
  const [recording, setRecording] = useState(false)
  const [hasRecording, setHasRecording] = useState(false)
  const [statusText, setStatusText] = useState('Tap to record yourself saying it')
  const [elapsed, setElapsed] = useState('0:00')
  const [playing, setPlaying] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioURLRef = useRef<string | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const animFrameRef = useRef<number>(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef(0)
  const barRefs = useRef<(HTMLDivElement | null)[]>([])
  const playingAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => () => cleanup(), [])

  useEffect(() => { reset() }, [drillText])

  function cleanup() {
    if (timerRef.current) clearInterval(timerRef.current)
    cancelAnimationFrame(animFrameRef.current)
    audioCtxRef.current?.close()
    streamRef.current?.getTracks().forEach(t => t.stop())
    if (audioURLRef.current) URL.revokeObjectURL(audioURLRef.current)
    playingAudioRef.current?.pause()
  }

  function reset() {
    cleanup()
    setRecording(false)
    setHasRecording(false)
    setStatusText('Tap to record yourself saying it')
    setElapsed('0:00')
    setPlaying(false)
    audioURLRef.current = null
    barRefs.current.forEach(b => {
      if (b) { b.style.height = '3px'; b.className = 'w-[3px] min-h-[3px] bg-zinc-600 rounded-sm transition-[height] duration-[50ms]' }
    })
  }

  function fmt(ms: number) {
    const s = Math.floor(ms / 1000)
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  }

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
      const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
      if (audioURLRef.current) URL.revokeObjectURL(audioURLRef.current)
      audioURLRef.current = URL.createObjectURL(blob)
      setHasRecording(true)
      setStatusText('Recorded — listen back')
      streamRef.current?.getTracks().forEach(t => t.stop())
    }
    mr.start()

    audioCtxRef.current = new AudioContext()
    const source = audioCtxRef.current.createMediaStreamSource(streamRef.current)
    const analyser = audioCtxRef.current.createAnalyser()
    analyser.fftSize = 256
    source.connect(analyser)
    const dataArray = new Uint8Array(analyser.frequencyBinCount)
    const step = Math.floor(dataArray.length / WAVE_BAR_COUNT)

    function draw() {
      analyser.getByteFrequencyData(dataArray)
      barRefs.current.forEach((b, i) => {
        if (!b) return
        const v = dataArray[i * step] ?? 0
        b.style.height = Math.max(3, (v / 255) * 56) + 'px'
        b.className = `w-[3px] min-h-[3px] rounded-sm transition-[height] duration-[50ms] ${v > 30 ? 'bg-red-500' : 'bg-zinc-600'}`
      })
      animFrameRef.current = requestAnimationFrame(draw)
    }
    draw()

    setRecording(true)
    setStatusText('Recording — speak now')
    startTimeRef.current = Date.now()
    timerRef.current = setInterval(() => setElapsed(fmt(Date.now() - startTimeRef.current)), 200)
  }

  function stopRecording() {
    if (mediaRecorderRef.current?.state !== 'inactive') mediaRecorderRef.current?.stop()
    setRecording(false)
    if (timerRef.current) clearInterval(timerRef.current)
    cancelAnimationFrame(animFrameRef.current)
    audioCtxRef.current?.close()
  }

  function playBack() {
    if (!audioURLRef.current) return
    playingAudioRef.current?.pause()
    const audio = new Audio(audioURLRef.current)
    playingAudioRef.current = audio
    setPlaying(true)
    audio.onended = () => setPlaying(false)
    audio.onerror = () => setPlaying(false)
    audio.play()
  }

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => recording ? stopRecording() : startRecording()}
          aria-label={recording ? 'Stop recording' : 'Start recording'}
          className={`w-14 h-14 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
            recording ? 'border-red-500 bg-red-500 animate-pulse' : 'border-red-500 bg-transparent hover:bg-red-500/10'
          }`}
        >
          <div className={`bg-red-500 transition-all ${recording ? 'w-3.5 h-3.5 rounded-sm' : 'w-[18px] h-[18px] rounded-full'}`} />
        </button>
        <div className="flex-1 h-14 flex items-center gap-0.5 overflow-hidden">
          {Array.from({ length: WAVE_BAR_COUNT }).map((_, i) => (
            <div key={i} ref={el => { barRefs.current[i] = el }} className="w-[3px] min-h-[3px] bg-zinc-600 rounded-sm" style={{ height: '3px' }} />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
        <span>{statusText}</span>
        <span>{elapsed}</span>
      </div>

      {hasRecording && (
        <div className="flex gap-2">
          <button
            onClick={playBack}
            disabled={playing}
            className={`rounded-lg text-white text-xs font-semibold px-4 py-2 transition-colors disabled:opacity-60 ${playing ? 'bg-emerald-600' : 'bg-emerald-700 hover:bg-emerald-600'}`}
          >
            {playing ? '🔊 Playing...' : '▶ Play back'}
          </button>
          <button
            onClick={reset}
            className="rounded-lg border border-zinc-600 text-zinc-300 hover:bg-zinc-700 text-xs font-semibold px-4 py-2 transition-colors"
          >
            Discard
          </button>
        </div>
      )}
    </div>
  )
}

export default function PracticeHub({ entries }: { entries: Entry[] }) {
  const [index, setIndex] = useState(0)
  const [recorderKey, setRecorderKey] = useState(0)

  const current = entries[index] ?? null

  const goNext = useCallback(() => {
    setIndex(i => (i + 1) % entries.length)
    setRecorderKey(k => k + 1)
  }, [entries.length])

  const goPrev = useCallback(() => {
    setIndex(i => (i - 1 + entries.length) % entries.length)
    setRecorderKey(k => k + 1)
  }, [entries.length])

  if (entries.length === 0) {
    return (
      <div className="text-sm text-zinc-400 py-12 text-center">
        No entries yet — add some words or phrases first.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 max-w-2xl">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Practice</h1>

      {current && (
        <>
          {/* Word card */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 px-6 py-6">
            <div className="font-mono text-xs uppercase tracking-widest text-red-500 mb-3">Say it out loud</div>
            <div className="font-mono text-2xl sm:text-3xl leading-snug text-zinc-900 dark:text-zinc-50">
              {current.content}
            </div>

            {/* Progress dots + nav */}
            <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
              <div className="flex gap-1.5 flex-wrap">
                {entries.slice(0, Math.min(entries.length, 20)).map((_, i) => (
                  <div
                    key={i}
                    onClick={() => { setIndex(i); setRecorderKey(k => k + 1) }}
                    className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${i === index ? 'bg-red-500 scale-150' : 'bg-zinc-300 dark:bg-zinc-700'}`}
                  />
                ))}
                {entries.length > 20 && <span className="font-mono text-xs text-zinc-400 ml-1">+{entries.length - 20}</span>}
              </div>
              <div className="flex gap-2">
                <button onClick={goPrev} className="rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold px-3.5 py-1.5 transition-colors">← Prev</button>
                <button onClick={goNext} className="rounded-lg bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-700 text-xs font-semibold px-3.5 py-1.5 transition-colors">Next →</button>
              </div>
            </div>
          </div>

          <Recorder key={recorderKey} drillText={current.content} />
        </>
      )}
    </div>
  )
}
