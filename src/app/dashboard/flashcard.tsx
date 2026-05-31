'use client'

import { useState } from 'react'
import { incrementPractice, toggleMastered } from './actions'

type Entry = {
  id: string
  content: string
  type: string
  is_mastered: boolean
  practice_count: number
}

const TYPE_COLORS: Record<string, string> = {
  word: 'text-blue-600 dark:text-blue-400',
  phrase: 'text-purple-600 dark:text-purple-400',
  sentence: 'text-green-600 dark:text-green-400',
}

export default function Flashcard({ entries }: { entries: Entry[] }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const unmastered = entries.filter((e) => !e.is_mastered)
  const current = unmastered[index]

  function next() {
    setFlipped(false)
    setIndex((i) => (i + 1) % unmastered.length)
  }

  function prev() {
    setFlipped(false)
    setIndex((i) => (i - 1 + unmastered.length) % unmastered.length)
  }

  async function handlePractice() {
    if (!flipped) {
      setFlipped(true)
      await incrementPractice(current.id, current.practice_count)
    }
  }

  async function handleMastered() {
    await toggleMastered(current.id, false)
    if (unmastered.length <= 1) {
      setOpen(false)
    } else {
      setIndex((i) => Math.min(i, unmastered.length - 2))
      setFlipped(false)
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => { setOpen(true); setIndex(0); setFlipped(false) }}
        className="self-start rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        ▶ Flashcard mode ({unmastered.length} remaining)
      </button>
    )
  }

  if (!unmastered.length) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 text-center">
        <p className="text-zinc-500 dark:text-zinc-400 mb-4">You&apos;ve mastered all entries!</p>
        <button onClick={() => setOpen(false)} className="text-sm text-zinc-500 hover:underline">Close</button>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-400">{index + 1} / {unmastered.length} remaining</span>
        <button onClick={() => setOpen(false)} className="text-xs text-zinc-400 hover:text-zinc-600">✕ Close</button>
      </div>

      {/* Card */}
      <div
        onClick={handlePractice}
        className="min-h-40 flex flex-col items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 cursor-pointer select-none p-6 gap-3"
      >
        {flipped ? (
          <>
            <span className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 text-center">{current.content}</span>
            <span className={`text-xs font-medium capitalize ${TYPE_COLORS[current.type]}`}>{current.type}</span>
            <span className="text-xs text-zinc-400">Practiced {current.practice_count + 1} time{current.practice_count + 1 !== 1 ? 's' : ''}</span>
          </>
        ) : (
          <span className="text-sm text-zinc-400">Tap to reveal</span>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={prev}
          className="rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          ← Prev
        </button>
        {flipped && (
          <button
            onClick={handleMastered}
            className="rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
          >
            ✓ Mastered
          </button>
        )}
        <button
          onClick={next}
          className="rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
