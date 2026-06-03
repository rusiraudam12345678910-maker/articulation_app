'use client'

import { useState } from 'react'
import { saveDefinition } from './actions'

type Definition = {
  partOfSpeech: string
  definitions: { definition: string; example?: string }[]
}

type DictionaryResult = {
  word: string
  phonetic?: string
  meanings: Definition[]
}

type SavedDefinition = {
  part_of_speech: string | null
  definition: string
  example: string | null
}

export default function DefinitionButton({ word, saved }: { word: string; saved?: SavedDefinition }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<DictionaryResult | null>(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [savedLocally, setSavedLocally] = useState<SavedDefinition | undefined>(saved)

  async function fetchDefinition() {
    if (open) { setOpen(false); return }
    setOpen(true)
    if (data) return

    setLoading(true)
    setError('')
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.trim())}`)
      if (!res.ok) throw new Error('No definition found')
      const json = await res.json()
      setData(json[0])
    } catch {
      setError('No definition found for this word.')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave(partOfSpeech: string, definition: string, example?: string) {
    setSaving(true)
    await saveDefinition(word, partOfSpeech, definition, example ?? null)
    setSavedLocally({ part_of_speech: partOfSpeech, definition, example: example ?? null })
    setSaving(false)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={fetchDefinition}
        className={`mt-0.5 transition-colors flex-shrink-0 ${savedLocally ? 'text-green-500' : 'text-zinc-400 hover:text-green-500'}`}
        title={savedLocally ? 'Definition saved' : 'Get definition'}
      >
        📖
      </button>

      {open && (
        <div className="absolute left-0 top-7 z-10 w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 capitalize">{word}</span>
            <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-zinc-600 text-xs">✕</button>
          </div>

          {savedLocally && !data && !loading && (
            <div className="flex flex-col gap-1 mb-3 p-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <span className="text-xs font-medium text-green-700 dark:text-green-400">Saved definition</span>
              {savedLocally.part_of_speech && (
                <span className="text-xs italic text-purple-600 dark:text-purple-400">{savedLocally.part_of_speech}</span>
              )}
              <p className="text-xs text-zinc-700 dark:text-zinc-300">• {savedLocally.definition}</p>
              {savedLocally.example && (
                <p className="text-xs text-zinc-400 italic pl-2">&quot;{savedLocally.example}&quot;</p>
              )}
            </div>
          )}

          {loading && <p className="text-xs text-zinc-400">Loading...</p>}
          {error && <p className="text-xs text-red-500">{error}</p>}

          {data && (
            <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
              {data.phonetic && (
                <p className="text-xs text-zinc-400">{data.phonetic}</p>
              )}
              {data.meanings.slice(0, 3).map((meaning, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-purple-600 dark:text-purple-400 italic">
                    {meaning.partOfSpeech}
                  </span>
                  {meaning.definitions.slice(0, 2).map((def, j) => (
                    <div key={j} className="flex flex-col gap-0.5">
                      <div className="flex items-start gap-1.5">
                        <p className="text-xs text-zinc-700 dark:text-zinc-300 flex-1">• {def.definition}</p>
                        <button
                          onClick={() => handleSave(meaning.partOfSpeech, def.definition, def.example)}
                          disabled={saving}
                          className="text-xs text-zinc-400 hover:text-green-500 transition-colors flex-shrink-0 mt-0.5"
                          title="Save this definition"
                        >
                          {saving ? '…' : '💾'}
                        </button>
                      </div>
                      {def.example && (
                        <p className="text-xs text-zinc-400 italic pl-2">&quot;{def.example}&quot;</p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
