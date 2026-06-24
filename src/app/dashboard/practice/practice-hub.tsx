'use client'

import { useState, useMemo, useCallback } from 'react'
import Recorder from '@/components/practice/recorder'

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

type DrillItem = {
  id: string | null   // null for built-in drills
  text: string
  phonetic?: string
  hint?: string
}

type Mode = 'minimal-pairs' | 'word-endings' | 'shadow' | 'free'

const WORD_ENDING_PATTERNS = /(?:ed|sts?|nds?|lts?|rts?|nths?|tched|pped|ked|fted|xed)$/i

// built-in minimal pairs for when users have no word_family groupings
const BUILTIN_MINIMAL_PAIRS: DrillItem[] = [
  { id: null, text: 'ship / sheep', phonetic: '/ʃɪp/ — /ʃiːp/' },
  { id: null, text: 'light / right', phonetic: '/laɪt/ — /raɪt/' },
  { id: null, text: 'cat / cut', phonetic: '/kæt/ — /kʌt/' },
  { id: null, text: 'thin / fin', phonetic: '/θɪn/ — /fɪn/' },
  { id: null, text: 'full / fool', phonetic: '/fʊl/ — /fuːl/' },
  { id: null, text: 'vest / west', phonetic: '/vɛst/ — /wɛst/' },
]

const MODE_META: Record<Mode, { label: string; desc: string; hint: string }> = {
  'minimal-pairs': {
    label: 'Minimal Pairs',
    desc: 'Contrast sounds that trip people up.',
    hint: 'Say each word slowly, then at normal pace. Feel the difference in vowel length / tongue position.',
  },
  'word-endings': {
    label: 'Word Endings',
    desc: "Drill the consonants people drop — -ed, -s, -t, -d.",
    hint: "Don't swallow the last sound. Land on it clearly — even slightly exaggerated.",
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

function buildDrills(entries: Entry[], mode: Mode): DrillItem[] {
  switch (mode) {
    case 'minimal-pairs': {
      // group by word_family and surface pairs
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
          pairs.push({
            id: group[i].id,
            text: `${group[i].content} / ${group[i + 1].content}`,
          })
        }
      })
      return pairs.length > 0 ? pairs : BUILTIN_MINIMAL_PAIRS
    }

    case 'word-endings': {
      const matches = entries
        .filter(e => e.type === 'word' && WORD_ENDING_PATTERNS.test(e.content.trim()))
        .map(e => ({ id: e.id, text: e.content, hint: 'Land the ending clearly — don\'t drop it.' }))
      return matches.length > 0 ? matches : entries.filter(e => e.type === 'word').slice(0, 20).map(e => ({ id: e.id, text: e.content }))
    }

    case 'shadow': {
      const matches = entries
        .filter(e => e.type === 'phrase' || e.type === 'sentence' || e.type === 'proverb')
        .map(e => ({ id: e.id, text: e.content }))
      return matches.length > 0 ? matches : entries.slice(0, 20).map(e => ({ id: e.id, text: e.content }))
    }

    case 'free':
    default:
      return entries.map(e => ({ id: e.id, text: e.content }))
  }
}

export default function PracticeHub({ entries, stats }: { entries: Entry[]; stats: Stats }) {
  const [activeTab, setActiveTab] = useState<'practice' | 'progress'>('practice')
  const [mode, setMode] = useState<Mode>('free')
  const [index, setIndex] = useState(0)
  const [practiceKey, setPracticeKey] = useState(0)

  const drills = useMemo(() => buildDrills(entries, mode), [entries, mode])
  const currentDrill = drills[index] ?? null

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

  const meta = MODE_META[mode]

  return (
    <div className="flex flex-col gap-5 max-w-2xl">

      {/* Header: streak pill */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Practice</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Speech clarity drills from your saved entries</p>
        </div>
        <div className="flex items-center gap-2 border border-amber-400/40 rounded-full px-4 py-2 bg-zinc-800 dark:bg-zinc-800">
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
          {/* Mode selector */}
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {(Object.entries(MODE_META) as [Mode, typeof MODE_META[Mode]][]).map(([key, m]) => (
              <button
                key={key}
                onClick={() => handleModeChange(key)}
                className={`rounded-xl border p-3.5 text-left transition-all ${
                  mode === key
                    ? 'border-red-500 bg-red-500/10 dark:bg-red-500/10'
                    : 'border-zinc-700 bg-zinc-800 hover:border-red-500/50'
                }`}
              >
                <div className="text-sm font-semibold text-zinc-100 mb-1">{m.label}</div>
                <div className="text-xs text-zinc-500 leading-snug">{m.desc}</div>
              </button>
            ))}
          </div>

          {drills.length === 0 ? (
            <div className="text-sm text-zinc-400 py-8 text-center">
              No entries for this drill mode yet. Add some words, phrases, or sentences first.
            </div>
          ) : currentDrill ? (
            <>
              {/* Drill card */}
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 px-6 py-5">
                <div className="font-mono text-xs uppercase tracking-widest text-red-500 mb-2">{meta.label}</div>
                <div className="font-mono text-2xl sm:text-3xl leading-snug text-zinc-900 dark:text-zinc-50 mb-1">
                  {currentDrill.text.includes(' / ')
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
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                  {currentDrill.hint ?? meta.hint}
                </div>

                {/* Progress dots + nav */}
                <div className="flex items-center justify-between mt-5 flex-wrap gap-3">
                  <div className="flex gap-1.5">
                    {drills.slice(0, Math.min(drills.length, 20)).map((_, i) => (
                      <div
                        key={i}
                        onClick={() => { setIndex(i); setPracticeKey(k => k + 1) }}
                        className={`w-1.5 h-1.5 rounded-full cursor-pointer transition-all ${
                          i === index
                            ? 'bg-red-500 scale-150'
                            : i < index
                            ? 'bg-emerald-500'
                            : 'bg-zinc-300 dark:bg-zinc-700'
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
              { num: stats.total, label: 'Drills Done' },
              { num: stats.streak, label: 'Day Streak' },
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
