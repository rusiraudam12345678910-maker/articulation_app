export default function CISSPBook2Page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          📗 CISSP All-in-One — 8th Edition
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Interactive reader with full-text search, TTS read-aloud, bookmarks, highlights, and progress tracking.
          Extracted from the official 8th Edition PDF.
        </p>
      </div>

      {/* Feature badges */}
      <div className="flex flex-wrap gap-2">
        {['🔍 Global Search', '🔊 Read Aloud', '🔖 Bookmarks', '✅ Progress Tracking', '🌙 Dark Mode', '⌨️ Keyboard Shortcuts'].map(f => (
          <span key={f} className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
            {f}
          </span>
        ))}
      </div>

      {/* Domain availability */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { num: 1, title: 'Security and Risk Management', available: true, sections: 28 },
          { num: 2, title: 'Asset Security', available: true, sections: 11 },
          { num: 3, title: 'Security Architecture and Engineering', available: false, sections: 0 },
          { num: 4, title: 'Communication and Network Security', available: false, sections: 0 },
          { num: 5, title: 'Identity and Access Management', available: false, sections: 0 },
          { num: 6, title: 'Security Assessment and Testing', available: false, sections: 0 },
          { num: 7, title: 'Security Operations', available: false, sections: 0 },
          { num: 8, title: 'Software Development Security', available: false, sections: 0 },
        ].map(d => (
          <div key={d.num} className={`rounded-xl border p-4 ${d.available
            ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950'
            : 'border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 opacity-60'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-bold uppercase tracking-wider ${d.available ? 'text-emerald-700 dark:text-emerald-400' : 'text-zinc-400'}`}>
                Domain {d.num}
              </span>
              {d.available
                ? <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full">{d.sections} sections</span>
                : <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">Coming soon</span>
              }
            </div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{d.title}</p>
          </div>
        ))}
      </div>

      {/* Open reader button */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Open Book2 Reader</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Opens the full interactive reader in a new tab. Domains 1 &amp; 2 available now.
          </p>
        </div>
        <a
          href="/book2/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 rounded-full bg-emerald-700 px-5 py-2 text-sm font-medium text-white hover:bg-emerald-600 transition-colors"
        >
          Open Book2 →
        </a>
      </div>
    </div>
  )
}
