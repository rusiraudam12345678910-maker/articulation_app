'use client'

import { addEntry, bulkAddEntries } from '../actions'
import { useState, useEffect, useRef } from 'react'

const typeOptions = (
  <>
    <option value="word">Word</option>
    <option value="phrase">Phrase</option>
    <option value="sentence">Sentence</option>
    <option value="topic">Topic</option>
    <option value="proverb">Proverb</option>
  </>
)

async function fetchWordFamilySuggestion(word: string): Promise<string | null> {
  const clean = word.trim().toLowerCase()
  if (!clean || clean.includes(' ')) return null
  try {
    // Get words derived from / related to the same root using Datamuse
    const res = await fetch(`https://api.datamuse.com/words?rel_trg=${encodeURIComponent(clean)}&max=5`)
    if (!res.ok) return null
    const related: { word: string }[] = await res.json()
    // Also fetch words with similar spelling (likely same root)
    const res2 = await fetch(`https://api.datamuse.com/words?sp=${encodeURIComponent(clean.slice(0, 4))}*&max=8`)
    const spelled: { word: string }[] = res2.ok ? await res2.json() : []

    // Try to find the shortest common root among spelled variants
    const candidates = spelled.map((w) => w.word).filter((w) => w !== clean)
    // Pick the shortest word that is a prefix of the input word (likely root)
    const root = candidates
      .filter((w) => clean.startsWith(w) && w.length >= 3)
      .sort((a, b) => a.length - b.length)[0]

    return root ?? clean
  } catch {
    return null
  }
}

function WordFamilyInput({
  word,
  value,
  onChange,
}: {
  word: string
  value: string
  onChange: (v: string) => void
}) {
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const clean = word.trim().toLowerCase()
    if (!clean || clean.includes(' ') || clean.length < 3) {
      setSuggestion(null)
      return
    }
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      const s = await fetchWordFamilySuggestion(clean)
      setSuggestion(s)
      setLoading(false)
    }, 600)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [word])

  return (
    <div className="flex flex-col gap-1">
      <input
        name="word_family"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Word family / root (optional) — e.g. run, beauty"
        className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
      />
      {loading && (
        <p className="text-xs text-zinc-400 pl-1">Finding word family...</p>
      )}
      {!loading && suggestion && suggestion !== value && (
        <div className="flex items-center gap-2 pl-1">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">Suggested root:</span>
          <button
            type="button"
            onClick={() => onChange(suggestion)}
            className="rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            {suggestion} — use this
          </button>
        </div>
      )}
    </div>
  )
}

export default function AddPage() {
  const [singleType, setSingleType] = useState('word')
  const [bulkType, setBulkType] = useState('word')
  const [singleContent, setSingleContent] = useState('')
  const [singleWordFamily, setSingleWordFamily] = useState('')
  const [bulkWordFamily, setBulkWordFamily] = useState('')
  const [bulkFirstWord, setBulkFirstWord] = useState('')

  function handleBulkChange(val: string) {
    const firstLine = val.split('\n')[0].trim()
    setBulkFirstWord(firstLine)
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Single add */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Add single entry</h2>
        <form className="flex flex-col gap-3">
          <textarea
            name="content"
            required
            rows={3}
            value={singleContent}
            onChange={(e) => setSingleContent(e.target.value)}
            placeholder="Enter a word, phrase, or sentence..."
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 resize-none"
          />
          {singleType === 'word' && (
            <WordFamilyInput
              word={singleContent}
              value={singleWordFamily}
              onChange={setSingleWordFamily}
            />
          )}
          <div className="flex items-center gap-3">
            <select
              name="type"
              value={singleType}
              onChange={(e) => setSingleType(e.target.value)}
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
            >
              {typeOptions}
            </select>
            <button
              formAction={addEntry}
              className="rounded-full bg-zinc-900 dark:bg-zinc-50 px-5 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
            >
              Add
            </button>
          </div>
        </form>
      </div>

      {/* Bulk add */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Bulk add</h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Enter one entry per line — all will be added as the same type.</p>
        <form className="flex flex-col gap-3">
          <textarea
            name="contents"
            required
            rows={8}
            onChange={(e) => handleBulkChange(e.target.value)}
            placeholder={"apple\nbanana\ncherry\n..."}
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 resize-none font-mono"
          />
          {bulkType === 'word' && (
            <WordFamilyInput
              word={bulkFirstWord}
              value={bulkWordFamily}
              onChange={setBulkWordFamily}
            />
          )}
          <div className="flex items-center gap-3">
            <select
              name="type"
              value={bulkType}
              onChange={(e) => setBulkType(e.target.value)}
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
            >
              {typeOptions}
            </select>
            <button
              formAction={bulkAddEntries}
              className="rounded-full bg-zinc-900 dark:bg-zinc-50 px-5 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
            >
              Add all
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}
