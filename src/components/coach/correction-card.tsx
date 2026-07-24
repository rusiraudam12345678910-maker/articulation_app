interface Correction {
  original: string
  corrected: string
  type: 'grammar' | 'phrasing' | 'vocabulary'
  explanation: string
}

const TYPE_LABEL: Record<Correction['type'], string> = {
  grammar: 'Grammar',
  phrasing: 'Phrasing',
  vocabulary: 'Vocabulary',
}

const TYPE_COLOR: Record<Correction['type'], string> = {
  grammar: 'bg-amber-900/40 text-amber-300 border-amber-700',
  phrasing: 'bg-sky-900/40 text-sky-300 border-sky-700',
  vocabulary: 'bg-purple-900/40 text-purple-300 border-purple-700',
}

export default function CorrectionCard({ correction }: { correction: Correction }) {
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-sm">
      <span className={`inline-block text-[10px] font-semibold uppercase tracking-wide border rounded-full px-2 py-0.5 mb-2 ${TYPE_COLOR[correction.type]}`}>
        {TYPE_LABEL[correction.type]}
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-red-400 line-through">{correction.original}</span>
        <span className="text-emerald-400">{correction.corrected}</span>
      </div>
      {correction.explanation && (
        <p className="text-zinc-400 text-xs mt-2">{correction.explanation}</p>
      )}
    </div>
  )
}
