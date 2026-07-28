'use client'

import { useEffect, useRef, useState } from 'react'

const WAVE_BAR_COUNT = 48

interface Note {
  id: string
  transcript: string
  audioURL: string
  createdAt: string
}

export default function VoiceRecorder() {
  const [recording, setRecording] = useState(false)
  const [transcribing, setTranscribing] = useState(false)
  const [statusText, setStatusText] = useState('Tap to start recording')
  const [elapsed, setElapsed] = useState('0:00')
  const [error, setError] = useState<string | null>(null)
  const [notes, setNotes] = useState<Note[]>([])

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const animFrameRef = useRef<number>(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef(0)
  const barRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    return () => cleanup()
  }, [])

  function cleanup() {
    if (timerRef.current) clearInterval(timerRef.current)
    cancelAnimationFrame(animFrameRef.current)
    if (audioCtxRef.current) audioCtxRef.current.close()
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
  }

  function formatTime(ms: number) {
    const s = Math.floor(ms / 1000)
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  }

  async function startRecording() {
    setError(null)
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      })
    } catch {
      setError('Microphone access needed — check browser permissions')
      return
    }

    audioChunksRef.current = []
    const mr = new MediaRecorder(streamRef.current)
    mediaRecorderRef.current = mr
    mr.ondataavailable = e => audioChunksRef.current.push(e.data)
    mr.onstop = () => handleStopped()
    mr.start()

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
    streamRef.current?.getTracks().forEach(t => t.stop())
    barRefs.current.forEach(b => {
      if (b) { b.style.height = '3px'; b.classList.remove('bg-red-500'); b.classList.add('bg-zinc-600') }
    })
  }

  async function handleStopped() {
    const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
    const audioURL = URL.createObjectURL(blob)
    setTranscribing(true)
    setStatusText('Transcribing...')

    try {
      const formData = new FormData()
      formData.append('audio', blob, 'recording.webm')
      const res = await fetch('/api/voice-notes/transcribe', { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok) {
        console.error('Transcription error:', data)
        setError(data.error ?? 'Transcription failed')
        setStatusText('Tap to start recording')
      } else {
        setNotes(prev => [
          { id: crypto.randomUUID(), transcript: data.transcript, audioURL, createdAt: new Date().toLocaleTimeString() },
          ...prev,
        ])
        setStatusText('Tap to start recording')
        setElapsed('0:00')
      }
    } catch {
      setError('Network error while transcribing')
      setStatusText('Tap to start recording')
    } finally {
      setTranscribing(false)
    }
  }

  function playBack(url: string) {
    new Audio(url).play()
  }

  function deleteNote(id: string) {
    setNotes(prev => {
      const note = prev.find(n => n.id === id)
      if (note) URL.revokeObjectURL(note.audioURL)
      return prev.filter(n => n.id !== id)
    })
  }

  const busy = recording || transcribing

  return (
    <div className="space-y-6">
      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5">
        <div className="flex items-center gap-4">
          <button
            onClick={() => (recording ? stopRecording() : startRecording())}
            disabled={transcribing}
            aria-label={recording ? 'Stop recording' : 'Start recording'}
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

        {error && <div className="mt-2 text-xs font-mono text-red-400">{error}</div>}
      </div>

      <div className="space-y-3">
        {notes.length === 0 && !busy && (
          <p className="text-sm text-zinc-500">Your recordings and transcripts will show up here.</p>
        )}
        {notes.map(note => (
          <div key={note.id} className="bg-zinc-800 border border-zinc-700 rounded-xl p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-zinc-100 flex-1">{note.transcript}</p>
              <span className="text-xs font-mono text-zinc-500 flex-shrink-0">{note.createdAt}</span>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => playBack(note.audioURL)}
                className="rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold px-3.5 py-1.5 transition-colors"
              >
                ▶ Play
              </button>
              <button
                onClick={() => deleteNote(note.id)}
                className="rounded-lg border border-zinc-600 text-zinc-300 hover:bg-zinc-700 text-xs font-semibold px-3.5 py-1.5 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
