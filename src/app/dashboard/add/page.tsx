'use client'

import { addEntry, bulkAddEntries } from '../actions'
import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'

const typeOptions = (
  <>
    <option value="word">Word</option>
    <option value="phrase">Phrase</option>
    <option value="sentence">Sentence</option>
    <option value="topic">Topic</option>
    <option value="proverb">Proverb</option>
  </>
)

async function fetchWordSuggestions(query: string): Promise<string[]> {
  const clean = query.trim().toLowerCase()
  if (!clean || clean.length < 2) return []
  try {
    const res = await fetch(
      `https://api.datamuse.com/words?sp=${encodeURIComponent(clean)}*&max=10`
    )
    if (!res.ok) return []
    const data: { word: string }[] = await res.json()
    return data.map((d) => d.word)
  } catch {
    return []
  }
}

function WordFamilyInput({
  value,
  onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [dropdownStyle, setDropdownStyle] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 })
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!value || value.length < 2) {
      setSuggestions([])
      setOpen(false)
      return
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      const results = await fetchWordSuggestions(value)
      setSuggestions(results)
      if (results.length > 0 && inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect()
        setDropdownStyle({ top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX, width: rect.width })
        setOpen(true)
      } else {
        setOpen(false)
      }
      setLoading(false)
    }, 350)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [value])

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [close])

  function select(word: string) {
    onChange(word)
    setOpen(false)
    setSuggestions([])
  }

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          name="word_family"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Word family / root (optional) — type to search e.g. intellig..."
          autoComplete="off"
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
        />
        {loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">searching...</span>
        )}
      </div>

      {open && suggestions.length > 0 && createPortal(
        <ul
          style={{ position: 'absolute', top: dropdownStyle.top, left: dropdownStyle.left, width: dropdownStyle.width, zIndex: 9999 }}
          className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-xl overflow-hidden"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {suggestions.map((word) => (
            <li key={word}>
              <button
                type="button"
                onMouseDown={() => select(word)}
                className="w-full text-left px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              >
                {word}
              </button>
            </li>
          ))}
        </ul>,
        document.body
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
            <WordFamilyInput value={singleWordFamily} onChange={setSingleWordFamily} />
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
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Enter words separated by spaces or new lines — all will be added as the same type.</p>
        <form className="flex flex-col gap-3">
          <textarea
            name="contents"
            required
            rows={8}
            placeholder={"apple banana cherry\nor one per line..."}
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 resize-none font-mono"
          />
          {bulkType === 'word' && (
            <WordFamilyInput value={bulkWordFamily} onChange={setBulkWordFamily} />
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
