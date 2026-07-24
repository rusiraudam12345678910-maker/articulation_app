'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Progress {
  total: number
  byType: Record<string, number>
  recent: { type: string; created_at: string }[]
}

export default function ProgressView() {
  const [progress, setProgress] = useState<Progress | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/coach/progress')
      .then((res) => res.json())
      .then(setProgress)
      .finally(() => setLoading(false))
  }, [])

  const maxCount = progress ? Math.max(1, ...Object.values(progress.byType)) : 1

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <Link href="/dashboard/coach" className="text-xs text-zinc-500 hover:text-zinc-300">
        ← Back to Speech Coach
      </Link>
      <h1 className="text-xl font-semibold text-zinc-100 mt-2 mb-1">Progress</h1>
      <p className="text-sm text-zinc-400 mb-6">Correction patterns across all your sessions.</p>

      {loading && <p className="text-sm text-zinc-500">Loading...</p>}

      {progress && progress.total === 0 && (
        <p className="text-sm text-zinc-500">No corrections yet — complete a session to see your progress.</p>
      )}

      {progress && progress.total > 0 && (
        <div className="flex flex-col gap-3">
          {Object.entries(progress.byType).map(([type, count]) => (
            <div key={type} className="flex items-center gap-3">
              <span className="w-24 text-xs text-zinc-400 capitalize">{type}</span>
              <div className="flex-1 h-4 bg-zinc-800 rounded overflow-hidden">
                <div
                  className="h-full bg-emerald-600"
                  style={{ width: `${(count / maxCount) * 100}%` }}
                />
              </div>
              <span className="w-8 text-xs text-zinc-400 text-right">{count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
