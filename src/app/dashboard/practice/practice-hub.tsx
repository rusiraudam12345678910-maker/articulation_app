'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { addPracticeItem, updatePracticeItem, deletePracticeItem, type PracticeItem } from './actions'

const WAVE_BAR_COUNT = 48

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

export default function PracticeHub({ initialItems }: { initialItems: PracticeItem[] }) {
  const [items, setItems] = useState<PracticeItem[]>(initialItems)
  const [index, setIndex] = useState(0)
  const [recorderKey, setRecorderKey] = useState(0)
  const [view, setView] = useState<'drill' | 'manage'>('drill')
  const [newContent, setNewContent] = useState('')
  const [newType, setNewType] = useState<'word' | 'sentence'>('word')
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [editType, setEditType] = useState<'word' | 'sentence'>('word')

  const current = items[index] ?? null

  const goNext = useCallback(() => {
    if (!items.length) return
    setIndex(i => (i + 1) % items.length)
    setRecorderKey(k => k + 1)
  }, [items.length])

  const goPrev = useCallback(() => {
    if (!items.length) return
    setIndex(i => (i - 1 + items.length) % items.length)
    setRecorderKey(k => k + 1)
  }, [items.length])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    const c = newContent.trim()
    if (!c) return
    setAdding(true)
    const tempItem: PracticeItem = { id: `temp-${Date.now()}`, content: c, type: newType, created_at: new Date().toISOString() }
    setItems(prev => [tempItem, ...prev])
    setNewContent('')
    await addPracticeItem(c, newType)
    setAdding(false)
  }

  function startEdit(item: PracticeItem) {
    setEditingId(item.id)
    setEditContent(item.content)
    setEditType(item.type as 'word' | 'sentence')
  }

  async function handleSaveEdit(id: string) {
    const c = editContent.trim()
    if (!c) return
    setItems(prev => prev.map(i => i.id === id ? { ...i, content: c, type: editType } : i))
    setEditingId(null)
    await updatePracticeItem(id, c, editType)
  }

  async function handleDelete(id: string) {
    setItems(prev => {
      const next = prev.filter(i => i.id !== id)
      if (index >= next.length) setIndex(Math.max(0, next.length - 1))
      return next
    })
    setRecorderKey(k => k + 1)
    await deletePracticeItem(id)
  }

  return (
    <div className="flex flex-col gap-5 max-w-2xl">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Practice</h1>
        <div className="flex gap-2">
          <button onClick={() => setView('drill')} className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${view === 'drill' ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900' : 'border border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>Drill</button>
          <button onClick={() => setView('manage')} className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${view === 'manage' ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900' : 'border border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>Manage</button>
        </div>
      </div>

      {/* DRILL VIEW */}
      {view === 'drill' && (
        <>
          {items.length === 0 ? (
            <div className="text-sm text-zinc-400 py-12 text-center">
              No items yet — <button onClick={() => setView('manage')} className="text-red-400 underline">add some words or sentences</button> to start.
            </div>
          ) : current ? (
            <>
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 px-6 py-6">
                <div className="font-mono text-xs uppercase tracking-widest text-red-500 mb-3">Say it out loud</div>
                <div className="font-mono text-2xl sm:text-3xl leading-snug text-zinc-900 dark:text-zinc-50">
                  {current.content}
                </div>
                <div className="mt-1 font-mono text-xs text-zinc-400 capitalize">{current.type}</div>

                <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
                  <div className="flex gap-1.5 flex-wrap">
                    {items.slice(0, Math.min(items.length, 20)).map((_, i) => (
                      <div
                        key={i}
                        onClick={() => { setIndex(i); setRecorderKey(k => k + 1) }}
                        className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${i === index ? 'bg-red-500 scale-150' : 'bg-zinc-300 dark:bg-zinc-700'}`}
                      />
                    ))}
                    {items.length > 20 && <span className="font-mono text-xs text-zinc-400 ml-1">+{items.length - 20}</span>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={goPrev} className="rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold px-3.5 py-1.5 transition-colors">← Prev</button>
                    <button onClick={goNext} className="rounded-lg bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-700 text-xs font-semibold px-3.5 py-1.5 transition-colors">Next →</button>
                  </div>
                </div>
              </div>

              <Recorder key={recorderKey} drillText={current.content} />
            </>
          ) : null}
        </>
      )}

      {/* MANAGE VIEW */}
      {view === 'manage' && (
        <>
          {/* Add form */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 px-5 py-4 flex flex-col gap-3">
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Add item</span>
            <form onSubmit={handleAdd} className="flex flex-col gap-3">
              <textarea
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                placeholder="Enter a word or sentence..."
                rows={3}
                className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              />
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  {(['word', 'sentence'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setNewType(t)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors capitalize ${newType === t ? 'bg-red-600 text-white' : 'border border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={adding || !newContent.trim()}
                  className="ml-auto rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white text-sm font-semibold px-4 py-2 transition-colors"
                >
                  {adding ? 'Adding...' : 'Add'}
                </button>
              </div>
            </form>
          </div>

          {/* Items list */}
          {items.length === 0 ? (
            <p className="text-sm text-zinc-400 py-6 text-center">No items yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {items.map(item => (
                <div key={item.id} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-start gap-3">
                  {editingId === item.id ? (
                    <div className="flex-1 flex flex-col gap-2">
                      <textarea
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        autoFocus
                        rows={2}
                        className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                      />
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          {(['word', 'sentence'] as const).map(t => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setEditType(t)}
                              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors capitalize ${editType === t ? 'bg-red-600 text-white' : 'border border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                        <button onClick={() => handleSaveEdit(item.id)} className="rounded-full bg-zinc-900 dark:bg-zinc-50 px-3 py-1 text-xs font-semibold text-white dark:text-zinc-900 hover:bg-zinc-700 transition-colors">Save</button>
                        <button onClick={() => setEditingId(null)} className="rounded-full border border-zinc-300 dark:border-zinc-700 px-3 py-1 text-xs font-semibold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-zinc-900 dark:text-zinc-50">{item.content}</div>
                        <div className="text-xs text-zinc-400 capitalize mt-0.5">{item.type}</div>
                      </div>
                      <button onClick={() => startEdit(item)} className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors text-sm flex-shrink-0">✎</button>
                      <button onClick={() => handleDelete(item.id)} className="text-zinc-400 hover:text-red-500 transition-colors text-sm flex-shrink-0">✕</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
