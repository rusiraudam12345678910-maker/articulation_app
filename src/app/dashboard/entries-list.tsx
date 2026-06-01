'use client'

import { useState } from 'react'
import { deleteEntry, updateEntry, toggleFavorite, toggleMastered } from './actions'
import { updateEntryCategory, addCategory, deleteCategory } from './category-actions'
import DefinitionButton from './definition-modal'

const TYPE_LABELS: Record<string, string> = {
  word: 'Word',
  phrase: 'Phrase',
  sentence: 'Sentence',
  topic: 'Topic',
  proverb: 'Proverb',
}

const TYPE_COLORS: Record<string, string> = {
  word: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  phrase: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  sentence: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  topic: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  proverb: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300',
}

type Entry = {
  id: string
  content: string
  type: string
  created_at: string
  category_id: string | null
  user_id: string
  is_favorite: boolean
  is_mastered: boolean
  practice_count: number
  word_family: string | null
}

type Category = {
  id: string
  name: string
}

type User = {
  id: string
  email: string
}

export default function EntriesList({ entries, categories, users }: { entries: Entry[], categories: Category[], users: User[] }) {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [userFilter, setUserFilter] = useState('all')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [editType, setEditType] = useState('')

  function startEdit(entry: Entry) {
    setEditingId(entry.id)
    setEditContent(entry.content)
    setEditType(entry.type)
  }

  async function saveEdit(id: string) {
    await updateEntry(id, editContent, editType)
    setEditingId(null)
  }

  const filtered = entries.filter((e) => {
    const matchesSearch = e.content.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === 'all' || e.type === typeFilter
    const matchesCategory = categoryFilter === 'all' || e.category_id === categoryFilter
    const matchesFavorite = !showFavoritesOnly || e.is_favorite
    const matchesUser = userFilter === 'all' || e.user_id === userFilter
    return matchesSearch && matchesType && matchesCategory && matchesFavorite && matchesUser
  })

  const masteredCount = entries.filter((e) => e.is_mastered).length

  return (
    <div className="flex flex-col gap-4">

      {/* Progress bar */}
      {entries.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-3 flex flex-col gap-1.5">
          <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Progress</span>
            <span>{masteredCount} / {entries.length} mastered</span>
          </div>
          <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${entries.length ? (masteredCount / entries.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}

      {/* Categories manager */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Categories:</span>
        {categories.map((c) => (
          <span key={c.id} className="flex items-center gap-1 rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 text-xs text-zinc-700 dark:text-zinc-300">
            {c.name}
            <button onClick={() => deleteCategory(c.id)} className="text-zinc-400 hover:text-red-500 transition-colors ml-0.5">✕</button>
          </span>
        ))}
        <form action={addCategory} className="flex gap-1">
          <input
            name="name"
            placeholder="New category..."
            className="rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-1 text-xs text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
          />
          <button type="submit" className="rounded-full bg-zinc-900 dark:bg-zinc-50 px-3 py-1 text-xs font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors">
            Add
          </button>
        </form>
      </div>

      {/* Search & filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search entries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
        />
        <div className="flex gap-2 flex-wrap">
          {['all', 'word', 'phrase', 'sentence', 'topic', 'proverb'].map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors capitalize ${
                typeFilter === type
                  ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                  : 'border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {type === 'all' ? 'All' : TYPE_LABELS[type]}
            </button>
          ))}
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              showFavoritesOnly
                ? 'bg-yellow-400 text-yellow-900'
                : 'border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            ★ Favorites
          </button>
        </div>
      </div>

      {/* User filter */}
      {users.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setUserFilter('all')}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              userFilter === 'all'
                ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                : 'border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            All users
          </button>
          {users.map((u) => (
            <button
              key={u.id}
              onClick={() => setUserFilter(u.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                userFilter === u.id
                  ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                  : 'border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {u.email}
            </button>
          ))}
        </div>
      )}

      {/* Category filter */}
      {categories.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {['all', ...categories.map((c) => c.id)].map((val) => {
            const label = val === 'all' ? 'All categories' : categories.find((c) => c.id === val)?.name ?? ''
            return (
              <button
                key={val}
                onClick={() => setCategoryFilter(val)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  categoryFilter === val
                    ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                    : 'border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      )}

      {/* Results count */}
      <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
        {search || typeFilter !== 'all' || categoryFilter !== 'all' || showFavoritesOnly
          ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`
          : `Your entries${entries.length ? ` (${entries.length})` : ''}`}
      </h2>

      {/* Entries */}
      {!filtered.length ? (
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          {entries.length ? 'No entries match your search.' : 'No entries yet. Add your first word, phrase, or sentence above.'}
        </p>
      ) : (
        filtered.map((entry) => (
          <div
            key={entry.id}
            className={`flex items-start justify-between gap-4 bg-white dark:bg-zinc-900 rounded-xl border px-4 py-3 ${
              entry.is_mastered
                ? 'border-green-200 dark:border-green-900'
                : 'border-zinc-200 dark:border-zinc-800'
            }`}
          >
            {editingId === entry.id ? (
              <div className="flex flex-col gap-2 flex-1">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={3}
                  className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
                />
                <div className="flex items-center gap-2">
                  <select
                    value={editType}
                    onChange={(e) => setEditType(e.target.value)}
                    className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 py-1 text-xs text-zinc-900 dark:text-zinc-50 focus:outline-none"
                  >
                    <option value="word">Word</option>
                    <option value="phrase">Phrase</option>
                    <option value="sentence">Sentence</option>
                    <option value="topic">Topic</option>
                    <option value="proverb">Proverb</option>
                  </select>
                  <button onClick={() => saveEdit(entry.id)} className="rounded-full bg-zinc-900 dark:bg-zinc-50 px-3 py-1 text-xs font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 transition-colors">Save</button>
                  <button onClick={() => setEditingId(null)} className="rounded-full border border-zinc-300 dark:border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 transition-colors">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-start gap-2">
                  <button
                    onClick={() => {
                      const utterance = new SpeechSynthesisUtterance(entry.content)
                      utterance.lang = 'en-US'
                      window.speechSynthesis.speak(utterance)
                    }}
                    className="mt-0.5 text-zinc-400 hover:text-blue-500 transition-colors flex-shrink-0"
                    title="Pronounce"
                  >
                    🔊
                  </button>
                  <DefinitionButton word={entry.content} />
                  <span className={`text-sm text-zinc-900 dark:text-zinc-50 flex-1 ${entry.is_mastered ? 'line-through opacity-60' : ''}`}>
                    {entry.content}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TYPE_COLORS[entry.type]}`}>
                    {TYPE_LABELS[entry.type]}
                  </span>
                  {entry.practice_count > 0 && (
                    <span className="text-xs text-zinc-400">Practiced {entry.practice_count}×</span>
                  )}
                  {entry.is_mastered && (
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">✓ Mastered</span>
                  )}
                </div>
                {entry.word_family && (() => {
                  const related = entries.filter(
                    (e) => e.word_family === entry.word_family && e.id !== entry.id
                  )
                  return related.length > 0 ? (
                    <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                      <span className="text-xs text-zinc-400 dark:text-zinc-500">Related:</span>
                      {related.map((r) => (
                        <span
                          key={r.id}
                          className="rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 text-xs text-zinc-600 dark:text-zinc-300"
                        >
                          {r.content}
                        </span>
                      ))}
                    </div>
                  ) : null
                })()}
                <select
                  value={entry.category_id ?? ''}
                  onChange={(e) => updateEntryCategory(entry.id, e.target.value || null)}
                  className="hidden"
                >
                  <option value="">No category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            )}

            {editingId !== entry.id && (
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => toggleFavorite(entry.id, entry.is_favorite)}
                  className={`text-base transition-colors ${entry.is_favorite ? 'text-yellow-400' : 'text-zinc-300 hover:text-yellow-400'}`}
                  title={entry.is_favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  ★
                </button>
                <button
                  onClick={() => toggleMastered(entry.id, entry.is_mastered)}
                  className={`text-base transition-colors ${entry.is_mastered ? 'text-green-500' : 'text-zinc-300 hover:text-green-500'}`}
                  title={entry.is_mastered ? 'Mark as not mastered' : 'Mark as mastered'}
                >
                  ✓
                </button>
                <button onClick={() => startEdit(entry)} className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors text-sm">✎</button>
                <button onClick={() => deleteEntry(entry.id)} className="text-zinc-400 hover:text-red-500 transition-colors text-sm">✕</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}
