'use client'

import { useState } from 'react'
import Link from 'next/link'
import CoachRecorder from '@/components/coach/coach-recorder'
import SessionTranscript, { CoachTurn } from '@/components/coach/session-transcript'

const SCENARIOS = [
  { value: 'job_interview', label: 'Job interview' },
  { value: 'small_talk', label: 'Small talk' },
  { value: 'ordering_food', label: 'Ordering food' },
]

interface Summary {
  total: number
  byType: Record<string, number>
}

export default function CoachHub() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [mode, setMode] = useState<'free' | 'scenario'>('free')
  const [scenarioType, setScenarioType] = useState(SCENARIOS[0].value)
  const [turns, setTurns] = useState<CoachTurn[]>([])
  const [starting, setStarting] = useState(false)
  const [summary, setSummary] = useState<Summary | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function startSession() {
    setStarting(true)
    setError(null)
    try {
      const res = await fetch('/api/coach/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, scenarioType: mode === 'scenario' ? scenarioType : undefined }),
      })
      if (!res.ok) {
        setError('Could not start session')
        return
      }
      const data = await res.json()
      setSessionId(data.sessionId)
      setTurns([])
      setSummary(null)
    } finally {
      setStarting(false)
    }
  }

  function handleTurn(result: {
    transcript: string
    aiReply: string
    corrections: CoachTurn['corrections']
    nativeRephrase: CoachTurn['nativeRephrase']
  }) {
    setTurns((prev) => [
      ...prev,
      { id: `${Date.now()}-user`, speaker: 'user', transcript: result.transcript, corrections: result.corrections, nativeRephrase: result.nativeRephrase },
      { id: `${Date.now()}-ai`, speaker: 'ai', transcript: result.aiReply },
    ])
  }

  async function endSession() {
    if (!sessionId) return
    const res = await fetch(`/api/coach/session/${sessionId}/end`, { method: 'POST' })
    if (res.ok) {
      const data = await res.json()
      setSummary(data.summary)
    }
    setSessionId(null)
  }

  if (!sessionId) {
    return (
      <div className="max-w-xl mx-auto py-10 px-4">
        <h1 className="text-xl font-semibold text-zinc-100 mb-1">Speech Coach</h1>
        <p className="text-sm text-zinc-400 mb-6">
          Practice a natural conversation. The AI will chat with you and gently correct your grammar,
          phrasing, and word choice after each turn.
        </p>

        {summary && (
          <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 mb-6">
            <h2 className="text-sm font-semibold text-zinc-200 mb-2">Last session summary</h2>
            <p className="text-sm text-zinc-400 mb-2">{summary.total} correction(s)</p>
            <ul className="text-xs text-zinc-400 flex flex-col gap-1">
              {Object.entries(summary.byType).map(([type, count]) => (
                <li key={type}>{type}: {count}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-3 mb-6">
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input type="radio" checked={mode === 'free'} onChange={() => setMode('free')} />
            Free conversation
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-300">
            <input type="radio" checked={mode === 'scenario'} onChange={() => setMode('scenario')} />
            Scenario
          </label>
          {mode === 'scenario' && (
            <select
              value={scenarioType}
              onChange={(e) => setScenarioType(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200"
            >
              {SCENARIOS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          )}
        </div>

        <button
          onClick={startSession}
          disabled={starting}
          className="rounded-lg bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 transition-colors"
        >
          {starting ? 'Starting...' : 'Start session'}
        </button>

        {error && <p className="text-xs text-red-400 mt-3">{error}</p>}

        <Link href="/dashboard/coach/progress" className="block text-xs text-zinc-500 hover:text-zinc-300 mt-6">
          View progress →
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-4 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-zinc-100">Speech Coach</h1>
        <button
          onClick={endSession}
          className="rounded-lg border border-zinc-600 text-zinc-300 hover:bg-zinc-700 text-xs font-semibold px-3 py-1.5 transition-colors"
        >
          End session
        </button>
      </div>

      <SessionTranscript turns={turns} />

      <CoachRecorder sessionId={sessionId} onTurn={handleTurn} />
    </div>
  )
}
