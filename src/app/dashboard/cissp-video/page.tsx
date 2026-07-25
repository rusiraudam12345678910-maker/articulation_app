'use client'

import { useMemo, useState } from 'react'
import { chapters, VIDEO_ID, VideoChapter } from './data'

function youtubeUrl(seconds: number): string {
  return `https://www.youtube.com/watch?v=${VIDEO_ID}&t=${seconds}s`
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  const before = text.slice(0, idx)
  const match = text.slice(idx, idx + query.length)
  const after = text.slice(idx + query.length)
  return (
    <>
      {before}
      <mark className="bg-yellow-200 dark:bg-yellow-700 text-zinc-900 dark:text-zinc-50 rounded px-0.5">{match}</mark>
      {after}
    </>
  )
}

export default function CISSPVideoPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo<VideoChapter[]>(() => {
    const q = query.trim().toLowerCase()
    if (!q) return chapters
    return chapters.filter(
      (c) => c.title.toLowerCase().includes(q) || c.covered.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
        CISSP Video Timeline
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
        Click any chapter to jump straight to that point in the video, opened in a new tab.
      </p>

      <div className="relative mb-6">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search chapters or topics…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="px-4 py-8 text-sm text-zinc-400 text-center">
            No chapters match &ldquo;{query}&rdquo;
          </div>
        ) : (
          <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {filtered.map((c) => (
              <li key={c.seconds}>
                <a
                  href={youtubeUrl(c.seconds)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 px-4 py-3.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors"
                >
                  <span className="flex-shrink-0 w-20 text-xs font-mono text-emerald-600 dark:text-emerald-400 pt-0.5">
                    {c.time}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                      {highlight(c.title, query)}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-relaxed">
                      {highlight(c.covered, query)}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-zinc-300 dark:text-zinc-600 text-xs pt-1">↗</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
