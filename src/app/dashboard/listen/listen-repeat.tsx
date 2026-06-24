'use client'

import { useState, useRef, useEffect } from 'react'
import { addListenItem, bulkAddListenItems, updateListenItem, deleteListenItem, type ListenItem } from './actions'

const WAVE_BAR_COUNT = 48

// ── Types ───────────────────────────────────────────────────────────────────
type WordScore = {
  word: string
  accuracyScore: number
  errorType: 'None' | 'Mispronunciation' | 'Omission' | 'Insertion'
}

type PronScore = {
  accuracyScore: number
  fluencyScore: number
  completenessScore: number
  pronunciationScore: number
  words: WordScore[]
}

// ── Score display ───────────────────────────────────────────────────────────
function ScoreRing({ score, label }: { score: number; label: string }) {
  const color = score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-amber-400' : 'text-red-400'
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`text-2xl font-bold font-mono ${color}`}>{score}</div>
      <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest text-center">{label}</div>
    </div>
  )
}

function WordChip({ w }: { w: WordScore }) {
  const bg =
    w.errorType === 'Mispronunciation' ? 'bg-red-500/20 border-red-500/40 text-red-300' :
    w.errorType === 'Omission'         ? 'bg-orange-500/20 border-orange-500/40 text-orange-300 line-through' :
    w.errorType === 'Insertion'        ? 'bg-purple-500/20 border-purple-500/40 text-purple-300' :
    w.accuracyScore >= 80              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' :
    w.accuracyScore >= 60              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' :
                                         'bg-red-500/10 border-red-500/30 text-red-300'
  return (
    <span className={`inline-flex flex-col items-center rounded-lg border px-2.5 py-1.5 font-mono text-sm ${bg}`}>
      <span>{w.word}</span>
      {w.errorType !== 'Omission' && (
        <span className="text-xs opacity-70">{w.accuracyScore}</span>
      )}
    </span>
  )
}

function PronunciationResult({ score }: { score: PronScore }) {
  const overall = score.pronunciationScore
  const overallColor = overall >= 80 ? 'border-emerald-500/30 bg-emerald-500/5' : overall >= 60 ? 'border-amber-500/30 bg-amber-500/5' : 'border-red-500/30 bg-red-500/5'
  const overallLabel = overall >= 80 ? 'Great pronunciation!' : overall >= 60 ? 'Good — keep practising' : 'Needs work — try again'

  return (
    <div className={`rounded-xl border p-4 flex flex-col gap-4 ${overallColor}`}>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-0.5">Pronunciation Score</div>
          <div className="text-xs text-zinc-500">{overallLabel}</div>
        </div>
        <div className="text-4xl font-bold font-mono text-zinc-100">{overall}<span className="text-lg text-zinc-500">/100</span></div>
      </div>

      {/* Sub-scores */}
      <div className="grid grid-cols-3 gap-3 border-t border-zinc-700 pt-3">
        <ScoreRing score={score.accuracyScore}      label="Accuracy" />
        <ScoreRing score={score.fluencyScore}       label="Fluency" />
        <ScoreRing score={score.completenessScore}  label="Complete" />
      </div>

      {/* Per-word breakdown */}
      {score.words.length > 0 && (
        <div className="border-t border-zinc-700 pt-3">
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">Word breakdown</div>
          <div className="flex flex-wrap gap-2">
            {score.words.map((w, i) => <WordChip key={i} w={w} />)}
          </div>
          <div className="flex gap-4 mt-3 flex-wrap">
            <span className="text-xs text-emerald-400">● Good (≥80)</span>
            <span className="text-xs text-amber-400">● Fair (60–79)</span>
            <span className="text-xs text-red-400">● Needs work (&lt;60) / Mispronounced</span>
            <span className="text-xs text-orange-400">● Omitted</span>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Compare Recorder ────────────────────────────────────────────────────────
function CompareRecorder({
  referenceUrl,
  referenceText,
  onReset,
}: {
  referenceUrl: string | null
  referenceText: string
  onReset?: () => void
}) {
  const [recording, setRecording] = useState(false)
  const [hasRec, setHasRec] = useState(false)
  const [status, setStatus] = useState('Record yourself saying it')
  const [elapsed, setElapsed] = useState('0:00')
  const [playingRef, setPlayingRef] = useState(false)
  const [playingMine, setPlayingMine] = useState(false)
  const [scoring, setScoring] = useState(false)
  const [pronScore, setPronScore] = useState<PronScore | null>(null)
  const [scoreError, setScoreError] = useState<string | null>(null)

  const mrRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const myBlobRef = useRef<Blob | null>(null)
  const myUrlRef = useRef<string | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const animRef = useRef<number>(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startRef = useRef(0)
  const barRefs = useRef<(HTMLDivElement | null)[]>([])
  const refAudioRef = useRef<HTMLAudioElement | null>(null)
  const myAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => () => cleanup(), [])

  function cleanup() {
    if (timerRef.current) clearInterval(timerRef.current)
    cancelAnimationFrame(animRef.current)
    ctxRef.current?.close()
    streamRef.current?.getTracks().forEach(t => t.stop())
    if (myUrlRef.current) URL.revokeObjectURL(myUrlRef.current)
    refAudioRef.current?.pause()
    myAudioRef.current?.pause()
  }

  function reset() {
    cleanup()
    setRecording(false)
    setHasRec(false)
    setStatus('Record yourself saying it')
    setElapsed('0:00')
    setPlayingRef(false)
    setPlayingMine(false)
    setPronScore(null)
    setScoreError(null)
    myBlobRef.current = null
    myUrlRef.current = null
    barRefs.current.forEach(b => {
      if (b) { b.style.height = '3px'; b.className = 'w-[3px] min-h-[3px] bg-zinc-600 rounded-sm transition-[height] duration-[50ms]' }
    })
    onReset?.()
  }

  function fmt(ms: number) {
    const s = Math.floor(ms / 1000)
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
  }

  function playAudio(url: string, isRef: boolean) {
    refAudioRef.current?.pause()
    myAudioRef.current?.pause()
    setPlayingRef(false)
    setPlayingMine(false)
    const audio = new Audio(url)
    if (isRef) {
      refAudioRef.current = audio
      setPlayingRef(true)
      audio.onended = () => setPlayingRef(false)
      audio.onerror = () => setPlayingRef(false)
    } else {
      myAudioRef.current = audio
      setPlayingMine(true)
      audio.onended = () => setPlayingMine(false)
      audio.onerror = () => setPlayingMine(false)
    }
    audio.play()
  }

  async function scoreRecording(blob: Blob) {
    setScoring(true)
    setScoreError(null)
    try {
      const fd = new FormData()
      fd.append('audio', blob, 'recording.webm')
      fd.append('referenceText', referenceText)
      const res = await fetch('/api/pronunciation-score', { method: 'POST', body: fd })
      if (!res.ok) {
        const err = await res.json()
        setScoreError(err?.error ?? 'Scoring failed')
      } else {
        const data = await res.json()
        setPronScore(data)
      }
    } catch {
      setScoreError('Network error — check connection')
    } finally {
      setScoring(false)
    }
  }

  // HTTPS or localhost required for MediaRecorder mic access
  async function startRecording() {
    try { streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true }) }
    catch { setStatus('Microphone access needed — check browser permissions'); return }

    chunksRef.current = []
    const mr = new MediaRecorder(streamRef.current)
    mrRef.current = mr
    mr.ondataavailable = e => chunksRef.current.push(e.data)
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
      myBlobRef.current = blob
      if (myUrlRef.current) URL.revokeObjectURL(myUrlRef.current)
      myUrlRef.current = URL.createObjectURL(blob)
      setHasRec(true)
      setStatus('Compare — play reference then yours')
      streamRef.current?.getTracks().forEach(t => t.stop())
      scoreRecording(blob)
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

  function stopRecording() {
    if (mrRef.current?.state !== 'inactive') mrRef.current?.stop()
    setRecording(false)
    if (timerRef.current) clearInterval(timerRef.current)
    cancelAnimationFrame(animRef.current)
    ctxRef.current?.close()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-5 flex flex-col gap-4">

        {/* Waveform + record button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => recording ? stopRecording() : startRecording()}
            aria-label={recording ? 'Stop recording' : 'Start recording'}
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

        <div className="flex justify-between font-mono text-xs text-zinc-400">
          <span>{scoring ? 'Scoring your pronunciation...' : status}</span>
          <span>{elapsed}</span>
        </div>

        {/* Side-by-side playback */}
        {hasRec && (
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Reference</span>
              <button
                onClick={() => referenceUrl && playAudio(referenceUrl, true)}
                disabled={!referenceUrl}
                className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all disabled:opacity-30 ${
                  playingRef ? 'bg-blue-600 text-white scale-95' : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                <span>{playingRef ? '🔊' : '▶'}</span>
                {playingRef ? 'Playing...' : 'Play reference'}
              </button>
              <p className="text-xs text-zinc-500 text-center">How it should sound</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Your recording</span>
              <button
                onClick={() => myUrlRef.current && playAudio(myUrlRef.current, false)}
                className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
                  playingMine ? 'bg-emerald-600 text-white scale-95' : 'bg-emerald-700 hover:bg-emerald-600 text-white'
                }`}
              >
                <span>{playingMine ? '🔊' : '▶'}</span>
                {playingMine ? 'Playing...' : 'Play mine'}
              </button>
              <p className="text-xs text-zinc-500 text-center">How you said it</p>
            </div>
          </div>
        )}

        {hasRec && (
          <div className="pt-1 border-t border-zinc-700">
            <button onClick={reset} className="rounded-lg border border-zinc-600 text-zinc-300 hover:bg-zinc-700 text-xs font-semibold px-3.5 py-1.5 transition-colors">
              Try again
            </button>
          </div>
        )}
      </div>

      {/* Scoring result */}
      {scoring && (
        <div className="rounded-xl border border-zinc-700 bg-zinc-800 p-4 flex items-center gap-3 font-mono text-sm text-zinc-400">
          <div className="w-4 h-4 rounded-full border-2 border-zinc-500 border-t-blue-400 animate-spin flex-shrink-0" />
          Analysing your pronunciation...
        </div>
      )}

      {scoreError && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 font-mono text-xs text-red-400">
          {scoreError}
        </div>
      )}

      {pronScore && !scoring && (
        <PronunciationResult score={pronScore} />
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
  const [referenceUrl, setReferenceUrl] = useState<string | null>(null)
  const [recorderKey, setRecorderKey] = useState(0)
  const [view, setView] = useState<'drill' | 'manage'>('drill')

  const refUrlCleanupRef = useRef<string | null>(null)
  const activeIndex = items.findIndex(i => i.id === activeId)

  async function speak(text: string, id: string) {
    window.speechSynthesis.cancel()

    if (refUrlCleanupRef.current) {
      URL.revokeObjectURL(refUrlCleanupRef.current)
      refUrlCleanupRef.current = null
      setReferenceUrl(null)
    }

    let mr: MediaRecorder | null = null
    const chunks: Blob[] = []

    try {
      const captureCtx = new AudioContext()
      const dest = captureCtx.createMediaStreamDestination()
      mr = new MediaRecorder(dest.stream)
      mr.ondataavailable = e => chunks.push(e.data)
      mr.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        refUrlCleanupRef.current = url
        setReferenceUrl(url)
        captureCtx.close()
      }
      mr.start()
    } catch {
      // AudioContext capture not supported in this browser — reference playback won't be available
    }

    const utt = new SpeechSynthesisUtterance(text)
    utt.lang = 'en-US'
    utt.rate = 0.85
    utt.onstart = () => setSpeaking(id)
    utt.onend = () => {
      setSpeaking(null)
      setTimeout(() => mr?.stop(), 200)
    }
    utt.onerror = () => {
      setSpeaking(null)
      mr?.stop()
    }
    window.speechSynthesis.speak(utt)
  }

  function goNext() {
    if (!items.length) return
    setActiveId(items[(activeIndex + 1) % items.length].id)
    setRecorderKey(k => k + 1)
    setReferenceUrl(null)
  }

  function goPrev() {
    if (!items.length) return
    setActiveId(items[(activeIndex - 1 + items.length) % items.length].id)
    setRecorderKey(k => k + 1)
    setReferenceUrl(null)
  }

  useEffect(() => {
    if (items.length && !activeId) setActiveId(items[0].id)
  }, [items, activeId])

  useEffect(() => {
    return () => { if (refUrlCleanupRef.current) URL.revokeObjectURL(refUrlCleanupRef.current) }
  }, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    const c = newContent.trim()
    if (!c) return
    const tempId = `temp-${Date.now()}`
    setItems(prev => [{ id: tempId, content: c, created_at: new Date().toISOString() }, ...prev])
    setNewContent('')
    if (!activeId) setActiveId(tempId)
    await addListenItem(c)
  }

  async function handleBulkAdd() {
    const lines = bulkText.split('\n').map(l => l.trim()).filter(l => l.length > 0)
    if (!lines.length) return
    setBulkAdding(true)
    const now = new Date().toISOString()
    const tempItems: ListenItem[] = lines.map((l, i) => ({ id: `temp-${Date.now()}-${i}`, content: l, created_at: now }))
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
    if (activeId === id) setActiveId(items.filter(i => i.id !== id)[0]?.id ?? null)
    await deleteListenItem(id)
  }

  const activeItem = items.find(i => i.id === activeId) ?? null

  return (
    <div className="flex flex-col gap-5 max-w-5xl">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Listen & Repeat</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Hear it · repeat it · get scored</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setView('drill')} className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${view === 'drill' ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900' : 'border border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>Drill</button>
          <button onClick={() => setView('manage')} className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${view === 'manage' ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900' : 'border border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}>Manage</button>
        </div>
      </div>

      {/* ── DRILL VIEW ── */}
      {view === 'drill' && (
        <>
          {items.length === 0 ? (
            <div className="text-sm text-zinc-400 py-12 text-center">
              No items yet — <button onClick={() => setView('manage')} className="text-red-400 underline">add some words or phrases</button> to start.
            </div>
          ) : activeItem ? (
            <>
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 px-6 py-6">
                <div className="font-mono text-xs uppercase tracking-widest text-red-500 mb-3">Listen & Repeat</div>
                <div className="font-mono text-2xl sm:text-3xl leading-snug text-zinc-900 dark:text-zinc-50 mb-5">
                  {activeItem.content}
                </div>
                <button
                  onClick={() => speak(activeItem.content, activeItem.id)}
                  disabled={speaking === activeItem.id}
                  className={`flex items-center gap-3 rounded-xl px-5 py-3 font-semibold text-sm transition-all disabled:cursor-not-allowed ${
                    speaking === activeItem.id ? 'bg-blue-600 text-white scale-95' : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  <span className="text-lg">{speaking === activeItem.id ? '🔊' : '▶'}</span>
                  {speaking === activeItem.id ? 'Playing...' : 'Listen'}
                </button>
                <p className="text-xs text-zinc-400 mt-2">
                  {referenceUrl ? '✓ Reference captured — now record yourself below.' : 'Press Listen, then record yourself saying it below.'}
                </p>
                <div className="flex items-center justify-between mt-6 flex-wrap gap-3">
                  <div className="flex gap-1.5 flex-wrap">
                    {items.slice(0, Math.min(items.length, 20)).map(item => (
                      <div
                        key={item.id}
                        onClick={() => { setActiveId(item.id); setRecorderKey(k => k + 1); setReferenceUrl(null) }}
                        className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${item.id === activeId ? 'bg-red-500 scale-150' : 'bg-zinc-300 dark:bg-zinc-700'}`}
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

              <CompareRecorder
                key={recorderKey}
                referenceUrl={referenceUrl}
                referenceText={activeItem.content}
                onReset={() => setRecorderKey(k => k + 1)}
              />
            </>
          ) : null}
        </>
      )}

      {/* ── MANAGE VIEW ── */}
      {view === 'manage' && (
        <>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Add entries</span>
              <button onClick={() => { setBulkMode(b => !b); setBulkText(''); setNewContent('') }} className="text-xs text-red-500 hover:text-red-400 transition-colors font-mono">
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
                  <span className="text-xs text-zinc-400 font-mono">{bulkText.split('\n').filter(l => l.trim()).length} phrase{bulkText.split('\n').filter(l => l.trim()).length !== 1 ? 's' : ''} ready</span>
                  <button onClick={handleBulkAdd} disabled={bulkAdding || !bulkText.trim()} className="rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white text-sm font-semibold px-4 py-2 transition-colors">
                    {bulkAdding ? 'Adding...' : 'Add All'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAdd} className="flex gap-2">
                <input value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="Add a word or phrase..." className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500" />
                <button type="submit" disabled={!newContent.trim()} className="rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white text-sm font-semibold px-4 py-2 transition-colors">Add</button>
              </form>
            )}
          </div>

          {items.length === 0 ? (
            <p className="text-sm text-zinc-400 py-6 text-center">No items yet. Add your first word or phrase above.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {items.map(item => (
                <div key={item.id} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center gap-3">
                  {editingId === item.id ? (
                    <>
                      <input value={editContent} onChange={e => setEditContent(e.target.value)} autoFocus className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-1.5 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-red-500" />
                      <button onClick={() => handleSaveEdit(item.id)} className="rounded-full bg-zinc-900 dark:bg-zinc-50 px-3 py-1 text-xs font-semibold text-white dark:text-zinc-900 hover:bg-zinc-700 transition-colors">Save</button>
                      <button onClick={() => setEditingId(null)} className="rounded-full border border-zinc-300 dark:border-zinc-700 px-3 py-1 text-xs font-semibold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">Cancel</button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1 text-sm text-zinc-900 dark:text-zinc-50">{item.content}</span>
                      <button onClick={() => speak(item.content, item.id)} className="text-blue-500 hover:text-blue-400 transition-colors text-base" title="Preview">{speaking === item.id ? '🔊' : '▶'}</button>
                      <button onClick={() => { setEditingId(item.id); setEditContent(item.content) }} className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors text-sm" title="Edit">✎</button>
                      <button onClick={() => handleDelete(item.id)} className="text-zinc-400 hover:text-red-500 transition-colors text-sm" title="Delete">✕</button>
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
