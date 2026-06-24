'use client'

import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import Recorder from '@/components/practice/recorder'
import { addSlowDrillWord, deleteSlowDrillWord } from './actions'

type Entry = {
  id: string
  content: string
  type: string
  word_family: string | null
  practice_count: number
  last_practiced_at: string | null
}

type Stats = {
  streak: number
  total: number
  todayCount: number
  recentSessions: { practiced_at: string; mode: string; drill_text: string }[]
}

type SlowWord = { id: string; word: string }

type DrillItem = {
  id: string | null
  text: string
  phonetic?: string
  hint?: string
  ending?: string   // the droppable ending to highlight in slow-drill
  coach?: string    // coaching cue e.g. "land the T"
}

type Mode = 'minimal-pairs' | 'word-endings' | 'shadow' | 'free' | 'slow-drill'

// ── Slow Drill built-in word list ──────────────────────────────────────────
type BuiltinSlowWord = { word: string; ending: string; coach: string }

const BUILTIN_SLOW_WORDS: BuiltinSlowWord[] = [
  { word: 'walked',     ending: 'ed',   coach: 'Hard T at the end — /wɔːkt/' },
  { word: 'asked',      ending: 'ed',   coach: 'Both consonants land — /æskt/' },
  { word: 'stopped',    ending: 'ped',  coach: 'Clip the P then T — /stɑːpt/' },
  { word: 'watched',    ending: 'ed',   coach: 'Full CH-T ending — /wɑːtʃt/' },
  { word: 'laughed',    ending: 'ed',   coach: 'F then T — don\'t merge them — /læft/' },
  { word: 'months',     ending: 'ths',  coach: 'TH then S — no shortcuts — /mʌnθs/' },
  { word: 'thoughts',   ending: 'ghts', coach: 'Three sounds at the end — /θɔːts/' },
  { word: 'facts',      ending: 'cts',  coach: 'K then S — feel both — /fækts/' },
  { word: 'texts',      ending: 'xts',  coach: 'Four consonants — slow down — /tɛksts/' },
  { word: 'best',       ending: 'st',   coach: 'S then T — land the T — /bɛst/' },
  { word: 'past',       ending: 'st',   coach: 'Don\'t swallow the T — /pæst/' },
  { word: 'next',       ending: 'xt',   coach: 'K-S then T — /nɛkst/' },
  { word: 'context',    ending: 'xt',   coach: 'Two T sounds — both must land — /ˈkɒntɛkst/' },
  { word: 'helped',     ending: 'ed',   coach: 'L-P then T — /hɛlpt/' },
  { word: 'jumped',     ending: 'ed',   coach: 'M-P then T — /dʒʌmpt/' },
  { word: 'risks',      ending: 'sks',  coach: 'S-K then S — /rɪsks/' },
  { word: 'desks',      ending: 'sks',  coach: 'Cluster landing — /dɛsks/' },
  { word: 'strengths',  ending: 'gths', coach: 'N-G-TH-S — every sound counts — /strɛŋkθs/' },
  { word: 'world',      ending: 'rld',  coach: 'R then L then D — /wɜːrld/' },
  { word: 'ield',       ending: 'eld',  coach: 'Clear L then D — /jiːld/' },
  { word: 'called',     ending: 'ed',   coach: 'L then D — don\'t drop the D — /kɔːld/' },
  { word: 'filled',     ending: 'ed',   coach: 'L then D — feel the D — /fɪld/' },
  { word: 'cold',       ending: 'ld',   coach: 'L then D — /koʊld/' },
  { word: 'bold',       ending: 'ld',   coach: 'L then D — /boʊld/' },
  { word: 'and',        ending: 'd',    coach: 'Don\'t reduce to "an" — /ænd/' },
  { word: 'hand',       ending: 'nd',   coach: 'N then D — /hænd/' },
  { word: 'mind',       ending: 'nd',   coach: 'N then D — /maɪnd/' },
  { word: 'find',       ending: 'nd',   coach: 'N then D — /faɪnd/' },
]

// detect droppable ending in a word
const ENDING_RULES: { pattern: RegExp; ending: string; coach: string }[] = [
  { pattern: /sks$/i,           ending: 'sks',  coach: 'S-K-S cluster — land every sound' },
  { pattern: /gths$/i,          ending: 'gths', coach: 'N-G-TH-S cluster — slow right down' },
  { pattern: /nths$/i,          ending: 'nths', coach: 'TH then S — no shortcuts' },
  { pattern: /[aeiou]ths$/i,    ending: 'ths',  coach: 'TH then S — feel both' },
  { pattern: /[^aeiou]ed$/i,    ending: 'ed',   coach: 'Land the final T or D — don\'t drop it' },
  { pattern: /[aeiou]ed$/i,     ending: 'ed',   coach: 'Clear D at the end' },
  { pattern: /[^aeiou]ts$/i,    ending: 'ts',   coach: 'T then S — two distinct sounds' },
  { pattern: /[^aeiou]st$/i,    ending: 'st',   coach: 'S then T — land the T' },
  { pattern: /xt$/i,            ending: 'xt',   coach: 'K-S then T — three sounds' },
  { pattern: /[^aeiou]ld$/i,    ending: 'ld',   coach: 'L then D — feel the D' },
  { pattern: /[^aeiou]nd$/i,    ending: 'nd',   coach: 'N then D — don\'t drop the D' },
  { pattern: /[^aeiou]t$/i,     ending: 't',    coach: 'Hard stop — land the T clearly' },
  { pattern: /[^aeiou]d$/i,     ending: 'd',    coach: 'Don\'t reduce — land the D' },
  { pattern: /[^aeiou]s$/i,     ending: 's',    coach: 'Crisp S — don\'t swallow it' },
]

function detectEnding(word: string): { ending: string; coach: string } | null {
  for (const rule of ENDING_RULES) {
    if (rule.pattern.test(word.trim())) {
      return { ending: rule.ending, coach: rule.coach }
    }
  }
  return null
}

function highlightEnding(text: string, ending: string) {
  const idx = text.toLowerCase().lastIndexOf(ending.toLowerCase())
  if (idx === -1) return <span>{text}</span>
  return (
    <>
      <span>{text.slice(0, idx)}</span>
      <span className="text-red-400 underline decoration-red-400 decoration-2 underline-offset-4">{text.slice(idx)}</span>
    </>
  )
}

// ── Other drill data ───────────────────────────────────────────────────────

const WORD_ENDING_PATTERNS = /(?:ed|sts?|nds?|lts?|rts?|nths?|tched|pped|ked|fted|xed)$/i

const BUILTIN_MINIMAL_PAIRS: DrillItem[] = [
  { id: null, text: 'ship / sheep', phonetic: '/ʃɪp/ — /ʃiːp/' },
  { id: null, text: 'light / right', phonetic: '/laɪt/ — /raɪt/' },
  { id: null, text: 'cat / cut',     phonetic: '/kæt/ — /kʌt/' },
  { id: null, text: 'thin / fin',    phonetic: '/θɪn/ — /fɪn/' },
  { id: null, text: 'full / fool',   phonetic: '/fʊl/ — /fuːl/' },
  { id: null, text: 'vest / west',   phonetic: '/vɛst/ — /wɛst/' },
]

const MODE_META: Record<Mode, { label: string; desc: string; hint: string }> = {
  'slow-drill': {
    label: 'Slow Drill',
    desc: 'Half speed, exaggerated endings — builds muscle memory.',
    hint: 'Read at half your normal speed. Exaggerate every consonant — especially the ending. Speed comes later.',
  },
  'minimal-pairs': {
    label: 'Minimal Pairs',
    desc: 'Contrast sounds that trip people up.',
    hint: 'Say each word slowly, then at normal pace. Feel the difference in vowel length / tongue position.',
  },
  'word-endings': {
    label: 'Word Endings',
    desc: "Drill consonants people drop — -ed, -s, -t, -d.",
    hint: "Don't swallow the last sound. Land it clearly — even slightly exaggerated.",
  },
  shadow: {
    label: 'Shadow / Sentences',
    desc: 'Stress and rhythm practice — read aloud with natural pacing.',
    hint: 'Read at natural conversational pace. Stress the content words — nouns, verbs, adjectives.',
  },
  free: {
    label: 'All Entries',
    desc: 'Practice any saved entry in sequence.',
    hint: 'Say it clearly and at a natural pace. Record yourself to hear how it sounds.',
  },
}

function buildDrills(entries: Entry[], mode: Mode, slowWords: SlowWord[]): DrillItem[] {
  switch (mode) {
    case 'slow-drill': {
      // merge built-in list + user custom words, deduplicate by lowercased word
      const seen = new Set<string>()
      const items: DrillItem[] = []

      BUILTIN_SLOW_WORDS.forEach(w => {
        seen.add(w.word)
        items.push({ id: null, text: w.word, ending: w.ending, coach: w.coach })
      })

      slowWords.forEach(w => {
        if (!seen.has(w.word)) {
          seen.add(w.word)
          const det = detectEnding(w.word)
          items.push({
            id: null,
            text: w.word,
            ending: det?.ending,
            coach: det?.coach ?? 'Say it at half speed — land every consonant.',
          })
        }
      })

      // also pull matching words from user's saved entries
      entries
        .filter(e => e.type === 'word' && WORD_ENDING_PATTERNS.test(e.content.trim()) && !seen.has(e.content.toLowerCase()))
        .forEach(e => {
          seen.add(e.content.toLowerCase())
          const det = detectEnding(e.content)
          items.push({
            id: e.id,
            text: e.content,
            ending: det?.ending,
            coach: det?.coach ?? 'Say it at half speed — land every consonant.',
          })
        })

      return items
    }

    case 'minimal-pairs': {
      const families: Record<string, Entry[]> = {}
      entries.forEach(e => {
        if (e.word_family) {
          if (!families[e.word_family]) families[e.word_family] = []
          families[e.word_family].push(e)
        }
      })
      const pairs: DrillItem[] = []
      Object.values(families).forEach(group => {
        for (let i = 0; i < group.length - 1; i++) {
          pairs.push({ id: group[i].id, text: `${group[i].content} / ${group[i + 1].content}` })
        }
      })
      return pairs.length > 0 ? pairs : BUILTIN_MINIMAL_PAIRS
    }

    case 'word-endings': {
      const matched = entries.filter(e => e.type === 'word' && WORD_ENDING_PATTERNS.test(e.content.trim()))
      const base: DrillItem[] = matched.map(e => ({ id: e.id, text: e.content, hint: "Don't drop the ending." }))
      if (base.length > 0) return base
      return entries.filter(e => e.type === 'word').slice(0, 20).map(e => ({ id: e.id, text: e.content, hint: "Say it slowly and clearly." }))
    }

    case 'shadow': {
      const matched = entries.filter(e => e.type === 'phrase' || e.type === 'sentence' || e.type === 'proverb')
      if (matched.length > 0) return matched.map(e => ({ id: e.id, text: e.content }))
      return entries.slice(0, 20).map(e => ({ id: e.id, text: e.content }))
    }

    case 'free':
    default:
      return entries.map(e => ({ id: e.id, text: e.content }))
  }
}

// ── Pacing dot component (60 BPM = 1 beat/sec) ────────────────────────────
function PacingDot({ active }: { active: boolean }) {
  const [lit, setLit] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!active) { setLit(false); return }
    // pulse at 60 BPM — one beat per second
    intervalRef.current = setInterval(() => {
      setLit(true)
      setTimeout(() => setLit(false), 200)
    }, 1000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [active])

  if (!active) return null

  return (
    <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
      <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-100 ${lit ? 'bg-red-400' : 'bg-zinc-700'}`} />
      <span>half-speed pace — follow the beat</span>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function PracticeHub({
  entries,
  stats,
  slowDrillWords,
}: {
  entries: Entry[]
  stats: Stats
  slowDrillWords: SlowWord[]
}) {
  const [activeTab, setActiveTab] = useState<'practice' | 'progress'>('practice')
  const [mode, setMode] = useState<Mode>('slow-drill')
  const [index, setIndex] = useState(0)
  const [practiceKey, setPracticeKey] = useState(0)
  const [localSlowWords, setLocalSlowWords] = useState<SlowWord[]>(slowDrillWords)
  const [newWord, setNewWord] = useState('')
  const [addingWord, setAddingWord] = useState(false)

  const drills = useMemo(() => buildDrills(entries, mode, localSlowWords), [entries, mode, localSlowWords])
  const currentDrill = drills[index] ?? null
  const isSlowDrill = mode === 'slow-drill'

  const handleModeChange = useCallback((m: Mode) => {
    setMode(m)
    setIndex(0)
    setPracticeKey(k => k + 1)
  }, [])

  const handlePracticed = useCallback(() => {
    setTimeout(() => {
      setIndex(i => (i + 1) % drills.length)
      setPracticeKey(k => k + 1)
    }, 600)
  }, [drills.length])

  const goNext = useCallback(() => {
    setIndex(i => (i + 1) % drills.length)
    setPracticeKey(k => k + 1)
  }, [drills.length])

  const goPrev = useCallback(() => {
    setIndex(i => (i - 1 + drills.length) % drills.length)
    setPracticeKey(k => k + 1)
  }, [drills.length])

  async function handleAddWord(e: React.FormEvent) {
    e.preventDefault()
    const w = newWord.trim().toLowerCase()
    if (!w || localSlowWords.some(s => s.word === w)) return
    setAddingWord(true)
    // optimistic update with temp id
    const tempId = `temp-${Date.now()}`
    setLocalSlowWords(prev => [...prev, { id: tempId, word: w }])
    setNewWord('')
    await addSlowDrillWord(w)
    setAddingWord(false)
  }

  async function handleDeleteWord(id: string) {
    setLocalSlowWords(prev => prev.filter(s => s.id !== id))
    if (!id.startsWith('temp-')) await deleteSlowDrillWord(id)
  }

  const meta = MODE_META[mode]

  return (
    <div className="flex flex-col gap-5 max-w-2xl">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Practice</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Speech clarity drills from your saved entries</p>
        </div>
        <div className="flex items-center gap-2 border border-amber-400/40 rounded-full px-4 py-2 bg-zinc-800">
          <span className="text-amber-400 text-base">●</span>
          <span className="font-mono text-sm text-zinc-300">
            Streak: <span className="font-bold text-amber-400">{stats.streak}</span> days
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-zinc-200 dark:border-zinc-800 -mb-1">
        {(['practice', 'progress'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs font-mono uppercase tracking-widest border-b-2 transition-colors capitalize ${
              activeTab === tab
                ? 'border-red-500 text-red-500'
                : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* PRACTICE TAB */}
      {activeTab === 'practice' && (
        <>
          {/* Mode selector — 5 modes, 2 col on mobile, wrap on sm */}
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
            {(Object.entries(MODE_META) as [Mode, typeof MODE_META[Mode]][]).map(([key, m]) => (
              <button
                key={key}
                onClick={() => handleModeChange(key)}
                className={`rounded-xl border p-3.5 text-left transition-all ${
                  mode === key
                    ? 'border-red-500 bg-red-500/10'
                    : 'border-zinc-700 bg-zinc-800 hover:border-red-500/50'
                }`}
              >
                <div className="text-sm font-semibold text-zinc-100 mb-1">{m.label}</div>
                <div className="text-xs text-zinc-500 leading-snug">{m.desc}</div>
              </button>
            ))}
          </div>

          {/* Slow Drill: custom word manager */}
          {isSlowDrill && (
            <div className="bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-4 flex flex-col gap-3">
              <div className="font-mono text-xs uppercase tracking-widest text-zinc-400">Your custom words</div>
              <div className="flex flex-wrap gap-2">
                {localSlowWords.length === 0 && (
                  <span className="text-xs text-zinc-500">None yet — add words below to drill them.</span>
                )}
                {localSlowWords.map(w => (
                  <span key={w.id} className="flex items-center gap-1.5 rounded-full bg-zinc-700 border border-zinc-600 px-3 py-1 font-mono text-xs text-zinc-200">
                    {w.word}
                    <button
                      onClick={() => handleDeleteWord(w.id)}
                      className="text-zinc-500 hover:text-red-400 transition-colors ml-0.5"
                      aria-label={`Remove ${w.word}`}
                    >✕</button>
                  </span>
                ))}
              </div>
              <form onSubmit={handleAddWord} className="flex gap-2">
                <input
                  value={newWord}
                  onChange={e => setNewWord(e.target.value)}
                  placeholder="Add a word..."
                  className="flex-1 rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-1.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="submit"
                  disabled={addingWord || !newWord.trim()}
                  className="rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white text-xs font-semibold px-4 py-1.5 transition-colors"
                >
                  Add
                </button>
              </form>
              <p className="text-xs text-zinc-500">
                Built-in list: {BUILTIN_SLOW_WORDS.length} words · Your entries: auto-included if they have tricky endings
              </p>
            </div>
          )}

          {drills.length === 0 ? (
            <div className="text-sm text-zinc-400 py-8 text-center">
              No entries for this drill mode yet.
            </div>
          ) : currentDrill ? (
            <>
              {/* Drill card */}
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 px-6 py-5">
                <div className="font-mono text-xs uppercase tracking-widest text-red-500 mb-2">{meta.label}</div>

                {/* Word display — highlight ending in slow-drill mode */}
                <div className="font-mono text-2xl sm:text-3xl leading-snug text-zinc-900 dark:text-zinc-50 mb-1">
                  {isSlowDrill && currentDrill.ending
                    ? highlightEnding(currentDrill.text, currentDrill.ending)
                    : currentDrill.text.includes(' / ')
                    ? currentDrill.text.split(' / ').map((part, i, arr) => (
                        <span key={i}>
                          {part}
                          {i < arr.length - 1 && <span className="text-red-400 mx-2 font-bold">/</span>}
                        </span>
                      ))
                    : currentDrill.text}
                </div>

                {currentDrill.phonetic && (
                  <div className="font-mono text-sm text-zinc-400 mb-2">{currentDrill.phonetic}</div>
                )}

                {/* Coaching tip */}
                {isSlowDrill && currentDrill.coach && (
                  <div className="mt-2 flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    <span className="text-red-400 text-xs mt-0.5 flex-shrink-0">→</span>
                    <span className="text-xs text-red-300 font-mono">{currentDrill.coach}</span>
                  </div>
                )}

                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-3">
                  {currentDrill.hint ?? meta.hint}
                </div>

                {/* Pacing dot for slow-drill */}
                {isSlowDrill && (
                  <div className="mt-3">
                    <PacingDot active={isSlowDrill} />
                  </div>
                )}

                {/* Progress dots + nav */}
                <div className="flex items-center justify-between mt-5 flex-wrap gap-3">
                  <div className="flex gap-1.5 flex-wrap">
                    {drills.slice(0, Math.min(drills.length, 20)).map((_, i) => (
                      <div
                        key={i}
                        onClick={() => { setIndex(i); setPracticeKey(k => k + 1) }}
                        className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${
                          i === index ? 'bg-red-500 scale-150' : i < index ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'
                        }`}
                      />
                    ))}
                    {drills.length > 20 && (
                      <span className="text-xs text-zinc-400 font-mono ml-1">+{drills.length - 20}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={goPrev}
                      className="rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold px-3.5 py-1.5 transition-colors"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={goNext}
                      className="rounded-lg bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 text-xs font-semibold px-3.5 py-1.5 transition-colors"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>

              {/* Recorder */}
              <Recorder
                key={practiceKey}
                entryId={currentDrill.id}
                drillText={currentDrill.text}
                mode={mode}
                onPracticed={handlePracticed}
              />
            </>
          ) : null}
        </>
      )}

      {/* PROGRESS TAB */}
      {activeTab === 'progress' && (
        <>
          <div className="grid grid-cols-3 gap-3">
            {[
              { num: stats.total,      label: 'Drills Done' },
              { num: stats.streak,     label: 'Day Streak' },
              { num: stats.todayCount, label: 'Today' },
            ].map(({ num, label }) => (
              <div key={label} className="bg-zinc-800 rounded-xl p-4 text-center">
                <div className="text-3xl font-semibold text-amber-400 font-mono">{num}</div>
                <div className="font-mono text-xs uppercase tracking-widest text-zinc-500 mt-1">{label}</div>
              </div>
            ))}
          </div>

          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">Recent sessions</h2>

          {stats.recentSessions.length === 0 ? (
            <p className="text-sm text-zinc-400 py-4 text-center">No sessions yet — finish a drill to start your history.</p>
          ) : (
            <div className="flex flex-col gap-1.5">
              {stats.recentSessions.map((s, i) => (
                <div key={i} className="flex items-center justify-between bg-zinc-800 rounded-lg px-4 py-2.5 text-sm">
                  <div>
                    <div className="text-zinc-200">{s.drill_text}</div>
                    <div className="font-mono text-xs text-zinc-500 mt-0.5">
                      {s.practiced_at.slice(0, 10)} · {s.mode}
                    </div>
                  </div>
                  <div className="text-emerald-400 font-mono text-xs">✓</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
