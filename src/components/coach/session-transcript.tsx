import CorrectionCard from './correction-card'

export interface CoachTurn {
  id: string
  speaker: 'user' | 'ai'
  transcript: string
  corrections?: {
    original: string
    corrected: string
    type: 'grammar' | 'phrasing' | 'vocabulary'
    explanation: string
  }[]
  nativeRephrase?: string | null
}

export default function SessionTranscript({ turns }: { turns: CoachTurn[] }) {
  return (
    <div className="flex flex-col gap-3">
      {turns.map((turn) => (
        <div key={turn.id} className={`flex flex-col gap-2 ${turn.speaker === 'user' ? 'items-end' : 'items-start'}`}>
          {turn.speaker === 'ai' && (
            <span className="text-xs font-semibold text-emerald-500 px-1">AI Coach</span>
          )}
          <div
            className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${
              turn.speaker === 'user'
                ? 'bg-zinc-700 text-zinc-100'
                : 'bg-emerald-900/40 border border-emerald-800 text-emerald-100'
            }`}
          >
            {turn.transcript}
          </div>
          {turn.speaker === 'user' && turn.corrections && turn.corrections.length > 0 && (
            <div className="flex flex-col gap-2 max-w-[80%] w-full">
              {turn.corrections.map((c, i) => (
                <CorrectionCard key={i} correction={c} />
              ))}
              {turn.nativeRephrase && (
                <div className="bg-zinc-800 border border-emerald-800 rounded-lg p-3 text-sm">
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wide border border-emerald-700 bg-emerald-900/40 text-emerald-300 rounded-full px-2 py-0.5 mb-2">
                    Like a native speaker
                  </span>
                  <p className="text-emerald-100">{turn.nativeRephrase}</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
