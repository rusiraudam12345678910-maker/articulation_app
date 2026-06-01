'use client'

import { addEntry, bulkAddEntries } from '../actions'
import { useState } from 'react'

const typeOptions = (
  <>
    <option value="word">Word</option>
    <option value="phrase">Phrase</option>
    <option value="sentence">Sentence</option>
    <option value="topic">Topic</option>
    <option value="proverb">Proverb</option>
  </>
)

export default function AddPage() {
  const [singleType, setSingleType] = useState('word')
  const [bulkType, setBulkType] = useState('word')

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
            placeholder="Enter a word, phrase, or sentence..."
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 resize-none"
          />
          {singleType === 'word' && (
            <input
              name="word_family"
              type="text"
              placeholder="Word family / root (optional) — e.g. run, beauty"
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
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
            placeholder={"apple\nbanana\ncherry\n..."}
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 resize-none font-mono"
          />
          {bulkType === 'word' && (
            <input
              name="word_family"
              type="text"
              placeholder="Word family / root for all above (optional) — e.g. run"
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
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
