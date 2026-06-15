'use client'

import { useState } from 'react'
import { savePhraseExamples } from './actions'

type Props = {
  phrase: string
  saved?: string[]
}

export default function PhraseExamples({ phrase, saved }: Props) {
  const [examples, setExamples] = useState<string[]>(saved ?? [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  async function fetchExamples() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/phrase-examples', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phrase }),
      })
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      const fetched: string[] = data.examples ?? []
      setExamples(fetched)
      setDraft(fetched)
      setEditing(true)
    } catch {
      setError('Could not fetch examples.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    await savePhraseExamples(phrase, draft)
    setExamples(draft)
    setEditing(false)
    setSaving(false)
  }

  function startEdit() {
    setDraft([...examples])
    setEditing(true)
  }

  if (examples.length === 0) {
    return (
      <div className="mt-1 pl-0.5">
        {error && <p className="text-xs text-red-500 mb-1">{error}</p>}
        <button
          onClick={fetchExamples}
          disabled={loading}
          className="text-xs text-zinc-400 hover:text-blue-500 transition-colors"
        >
          {loading ? 'Fetching examples…' : '+ Get examples'}
        </button>
      </div>
    )
  }

  if (editing) {
    return (
      <div className="mt-1 pl-0.5 flex flex-col gap-1.5">
        {draft.map((ex, i) => (
          <textarea
            key={i}
            value={ex}
            rows={2}
            onChange={(e) => {
              const next = [...draft]
              next[i] = e.target.value
              setDraft(next)
            }}
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 py-1.5 text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-900 resize-none"
          />
        ))}
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-zinc-900 dark:bg-zinc-50 px-3 py-1 text-xs font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 transition-colors"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button
            onClick={() => setEditing(false)}
            className="rounded-full border border-zinc-300 dark:border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-1 pl-0.5 flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">Examples:</span>
        <button
          onClick={startEdit}
          className="text-xs text-zinc-400 hover:text-blue-500 transition-colors"
          title="Edit examples"
        >
          ✎
        </button>
        <button
          onClick={fetchExamples}
          disabled={loading}
          className="text-xs text-zinc-400 hover:text-blue-500 transition-colors"
          title="Refresh examples"
        >
          {loading ? '…' : '↻'}
        </button>
      </div>
      {examples.map((ex, i) => (
        <p key={i} className="text-xs text-zinc-500 dark:text-zinc-400 italic pl-1">
          &quot;{ex}&quot;
        </p>
      ))}
    </div>
  )
}
