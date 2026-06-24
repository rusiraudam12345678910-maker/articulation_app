'use client'

import { useState, useRef, useEffect } from 'react'
import { addListenItem, bulkAddListenItems, updateListenItem, deleteListenItem, type ListenItem } from './actions'

const WAVE_BAR_COUNT = 48

// ── Waveform recorder (inline, no shared component needed here) ─────────────
function Recorder({ onReset }: { onReset?: () => void }) {
  const [recording, setRecording] = useState(false)
  const [hasRec, setHasRec] = useState(false)
  const [status, setStatus] = useState('Tap to record your attempt')
  const [elapsed, setElapsed] = useState('0:00')

  const mrRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const urlRef = useRef<string | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const animRef = useRef<number>(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startRef = useRef(0)
  const barRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => () => cleanup(), [])

  function cleanup() {
    if (timerRef.current) clearInterval(timerRef.current)
    cancelAnimationFrame(animRef.current)
    ctxRef.current?.close()
    streamRef.current?.getTracks().forEach(t => t.stop())
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
  }

  function reset() {
    cleanup()
    setRecording(false)
    setHasRec(false)
    setStatus('Tap to record your attempt')
    setElapsed('0:00')
    urlRef.current = null
    barRefs.current.forEach(b => { if (b) { b.style.height = '3px'; b.className = 'w-[3px] min-h-[3px] bg-zinc-600 rounded-sm transition-[height] duration-[50ms]' } })
    onReset?.()
  }

  function fmt(ms: number) {
    const s = Math.floor(ms / 1000)
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  }

  // HTTPS or localhost required for MediaRecorder mic access
  async function start() {
    try { streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true }) }
    catch { setStatus('Microphone access needed — check browser permissions'); return }

    chunksRef.current = []
    const mr = new MediaRecorder(streamRef.current)
    mrRef.current = mr
    mr.ondataavailable = e => chunksRef.current.push(e.data)
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
      if (urlRef.current) URL.revokeObjectURL(urlRef.current)
      urlRef.current = URL.createObjectURL(blob)
      setHasRec(true)
      setStatus('Done — listen back and compare')
      streamRef.current?.getTracks().forEach(t => t.stop())
    }
    mr.start()

    ctxRef.current = new AudioContext()
    const src = ctxRef.current.createMediaStreamSource(streamRef.current)
    const analyser = ctxRef.current.createAnalyser()
    analyser.fftSize = 256
    src.connect(analyser)
    const data = new Uint8Array(analyser.frequencyBinCount)
    const step = Math.floor(data.length / WAVE_BAR_COUNT)

    function draw() {
      analyser.getByteFrequencyData(data)
      barRefs.current.forEach((b, i) => {
        if (!b) return
        const v = data[i * step] ?? 0
        b.style.height = Math.max(3, (v / 255) * 56) + 'px'
        b.className = `w-[3px] min-h-[3px] rounded-sm transition-[height] duration-[50ms] ${v > 30 ? 'bg-red-500' : 'bg-zinc-600'}`
      })
      animRef.current = requestAnimationFrame(draw)
    }
    draw()

    setRecording(true)
    setStatus('Recording — speak now')
    startRef.current = Date.now()
    timerRef.current = setInterval(() => setElapsed(fmt(Date.now() - startRef.current)), 200)
  }

  function stop() {
    if (mrRef.current?.state !== 'inactive') mrRef.current?.stop()
    setRecording(false)
    if (timerRef.current) clearInterval(timerRef.current)
    cancelAnimationFrame(animRef.current)
    ctxRef.current?.close()
  }

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 mt-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => recording ? stop() : start()}
          aria-label={recording ? 'Stop' : 'Record'}
          className={`w-12 h-12 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
            recording ? 'border-red-500 bg-red-500 animate-pulse' : 'border-red-500 bg-transparent hover:bg-red-500/10'
          }`}
        >
          <div className={`bg-red-500 transition-all ${recording ? 'w-3 h-3 rounded-sm' : 'w-4 h-4 rounded-full'}`} />
        </button>
        <div className="flex-1 h-12 flex items-center gap-0.5 overflow-hidden">
          {Array.from({ length: WAVE_BAR_COUNT }).map((_, i) => (
            <div key={i} ref={el => { barRefs.current[i] = el }} className="w-[3px] min-h-[3px] bg-zinc-600 rounded-sm" style={{ height: '3px' }} />
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-2 font-mono text-xs text-zinc-400">
        <span>{status}</span><span>{elapsed}</span>
      </div>
      {hasRec && (
        <div className="flex gap-2 mt-3">
          <button onClick={() => urlRef.current && new Audio(urlRef.current).play()} className="rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold px-3.5 py-1.5 transition-colors">▶ Play back</button>
          <button onClick={reset} className="rounded-lg border border-zinc-600 text-zinc-300 hover:bg-zinc-700 text-xs font-semibold px-3.5 py-1.5 transition-colors">Discard</button>
        </div>
      )}
    </div>
  )
}

// ── Main component ──────────────────────────────────────────────────────────
export default function ListenRepeat({ initialItems }: { initialItems: ListenItem[] }) {
  const [items, setItems] = useState<ListenItem[]>(initialItems)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [newContent, setNewContent] = useState('')
  const [bulkMode, setBulkMode] = useState(false)
  const [bulkText, setBulkText] = useState('')
  const [bulkAdding, setBulkAdding] = useState(false)
  const [speaking, setSpeaking] = useState<string | null>(null)
  const [recorderKey, setRecorderKey] = useState(0)
  const [view, setView] = useState<'drill' | 'manage'>('drill')

  // drill navigation
  const activeIndex = items.findIndex(i => i.id === activeId)

  function speak(text: string, id: string) {
    window.speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(text)
    utt.lang = 'en-US'
    utt.rate = 0.85   // slightly slower for clarity
    utt.onstart = () => setSpeaking(id)
    utt.onend = () => setSpeaking(null)
    utt.onerror = () => setSpeaking(null)
    window.speechSynthesis.speak(utt)
  }

  function goNext() {
    if (!items.length) return
    const next = (activeIndex + 1) % items.length
    setActiveId(items[next].id)
    setRecorderKey(k => k + 1)
  }

  function goPrev() {
    if (!items.length) return
    const prev = (activeIndex - 1 + items.length) % items.length
    setActiveId(items[prev].id)
    setRecorderKey(k => k + 1)
  }

  // set first item active on load
  useEffect(() => {
    if (items.length && !activeId) setActiveId(items[0].id)
  }, [items, activeId])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    const c = newContent.trim()
    if (!c) return
    const tempId = `temp-${Date.now()}`
    const tempItem: ListenItem = { id: tempId, content: c, created_at: new Date().toISOString() }
    setItems(prev => [tempItem, ...prev])
    setNewContent('')
    if (!activeId) setActiveId(tempId)
    await addListenItem(c)
  }

  async function handleBulkAdd() {
    const lines = bulkText.split('\n').map(l => l.trim()).filter(l => l.length > 0)
    if (!lines.length) return
    setBulkAdding(true)
    const now = new Date().toISOString()
    const tempItems: ListenItem[] = lines.map((l, i) => ({
      id: `temp-${Date.now()}-${i}`,
      content: l,
      created_at: now,
    }))
    setItems(prev => [...tempItems, ...prev])
    if (!activeId && tempItems.length) setActiveId(tempItems[0].id)
    setBulkText('')
    setBulkMode(false)
    await bulkAddListenItems(lines)
    setBulkAdding(false)
  }

  async function handleSaveEdit(id: string) {
    const c = editContent.trim()
    if (!c) return
    setItems(prev => prev.map(i => i.id === id ? { ...i, content: c } : i))
    setEditingId(null)
    await updateListenItem(id, c)
  }

  async function handleDelete(id: string) {
    setItems(prev => prev.filter(i => i.id !== id))
    if (activeId === id) {
      const remaining = items.filter(i => i.id !== id)
      setActiveId(remaining[0]?.id ?? null)
    }
    await deleteListenItem(id)
  }

  const activeItem = items.find(i => i.id === activeId) ?? null

  return (
    <div className="flex flex-col gap-5 max-w-5xl">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Listen & Repeat</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Hear it, then say it back — record yourself to compare</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView('drill')}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${view === 'drill' ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900' : 'border border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
          >
            Drill
          </button>
          <button
            onClick={() => setView('manage')}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${view === 'manage' ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900' : 'border border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
          >
            Manage
          </button>
        </div>
      </div>

      {/* ── DRILL VIEW ── */}
      {view === 'drill' && (
        <>
          {items.length === 0 ? (
            <div className="text-sm text-zinc-400 py-12 text-center">
              No items yet —{' '}
              <button onClick={() => setView('manage')} className="text-red-400 underline">add some words or phrases</button> to start.
            </div>
          ) : activeItem ? (
            <>
              {/* Drill card */}
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 px-6 py-6">
                <div className="font-mono text-xs uppercase tracking-widest text-red-500 mb-3">Listen & Repeat</div>

                {/* Word/phrase — large */}
                <div className="font-mono text-2xl sm:text-3xl leading-snug text-zinc-900 dark:text-zinc-50 mb-5">
                  {activeItem.content}
                </div>

                {/* Play button */}
                <button
                  onClick={() => speak(activeItem.content, activeItem.id)}
                  className={`flex items-center gap-3 rounded-xl px-5 py-3 font-semibold text-sm transition-all ${
                    speaking === activeItem.id
                      ? 'bg-blue-600 text-white scale-95'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  <span className="text-lg">{speaking === activeItem.id ? '🔊' : '▶'}</span>
                  {speaking === activeItem.id ? 'Playing...' : 'Listen'}
                </button>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
                  Listen, then record yourself saying it below.
                </p>

                {/* Progress dots + nav */}
                <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
                  <div className="flex gap-1.5 flex-wrap">
                    {items.slice(0, Math.min(items.length, 20)).map((item, i) => (
                      <div
                        key={item.id}
                        onClick={() => { setActiveId(item.id); setRecorderKey(k => k + 1) }}
                        className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${
                          item.id === activeId ? 'bg-red-500 scale-150' : 'bg-zinc-300 dark:bg-zinc-700'
                        }`}
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

              {/* Recorder */}
              <Recorder key={recorderKey} onReset={() => setRecorderKey(k => k + 1)} />
            </>
          ) : null}
        </>
      )}

      {/* ── MANAGE VIEW ── */}
      {view === 'manage' && (
        <>
          {/* Add form — single or bulk */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Add entries</span>
              <button
                onClick={() => { setBulkMode(b => !b); setBulkText(''); setNewContent('') }}
                className="text-xs text-red-500 hover:text-red-400 transition-colors font-mono"
              >
                {bulkMode ? '← Single' : 'Bulk add ↓'}
              </button>
            </div>

            {bulkMode ? (
              <div className="flex flex-col gap-2">
                <textarea
                  value={bulkText}
                  onChange={e => setBulkText(e.target.value)}
                  placeholder={"One word or phrase per line:\nThe quick brown fox\nPeter Piper picked\nShe sells seashells"}
                  rows={6}
                  className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-y font-mono"
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400 font-mono">
                    {bulkText.split('\n').filter(l => l.trim()).length} phrase{bulkText.split('\n').filter(l => l.trim()).length !== 1 ? 's' : ''} ready
                  </span>
                  <button
                    onClick={handleBulkAdd}
                    disabled={bulkAdding || !bulkText.trim()}
                    className="rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white text-sm font-semibold px-4 py-2 transition-colors"
                  >
                    {bulkAdding ? 'Adding...' : 'Add All'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAdd} className="flex gap-2">
                <input
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  placeholder="Add a word or phrase..."
                  className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="submit"
                  disabled={!newContent.trim()}
                  className="rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white text-sm font-semibold px-4 py-2 transition-colors"
                >
                  Add
                </button>
              </form>
            )}
          </div>

          {/* List */}
          {items.length === 0 ? (
            <p className="text-sm text-zinc-400 py-6 text-center">No items yet. Add your first word or phrase above.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {items.map(item => (
                <div key={item.id} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center gap-3">
                  {editingId === item.id ? (
                    <>
                      <input
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        autoFocus
                        className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-1.5 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <button onClick={() => handleSaveEdit(item.id)} className="rounded-full bg-zinc-900 dark:bg-zinc-50 px-3 py-1 text-xs font-semibold text-white dark:text-zinc-900 hover:bg-zinc-700 transition-colors">Save</button>
                      <button onClick={() => setEditingId(null)} className="rounded-full border border-zinc-300 dark:border-zinc-700 px-3 py-1 text-xs font-semibold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">Cancel</button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1 text-sm text-zinc-900 dark:text-zinc-50">{item.content}</span>
                      <button
                        onClick={() => speak(item.content, item.id)}
                        className="text-blue-500 hover:text-blue-400 transition-colors text-base"
                        title="Preview"
                      >
                        {speaking === item.id ? '🔊' : '▶'}
                      </button>
                      <button
                        onClick={() => { setEditingId(item.id); setEditContent(item.content) }}
                        className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors text-sm"
                        title="Edit"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-zinc-400 hover:text-red-500 transition-colors text-sm"
                        title="Delete"
                      >
                        ✕
                      </button>
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
