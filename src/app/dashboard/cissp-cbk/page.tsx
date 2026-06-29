export default function CISSPCBKPage() {
  const domains = [
    { num: 1, title: 'Security and Risk Management',        sections: 51  },
    { num: 2, title: 'Asset Security',                       sections: 43  },
    { num: 3, title: 'Security Architecture and Engineering',sections: 76  },
    { num: 4, title: 'Communication and Network Security',   sections: 28  },
    { num: 5, title: 'Identity and Access Management',       sections: 30  },
    { num: 6, title: 'Security Assessment and Testing',      sections: 28  },
    { num: 7, title: 'Security Operations',                  sections: 80  },
    { num: 8, title: 'Software Development Security',        sections: 27  },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          📘 CISSP CBK Reference — 5th Edition
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Interactive reader for the Official (ISC)² CISSP CBK Reference, 5th Edition.
          Full-text search, TTS read-aloud with word highlighting, bookmarks, and progress tracking.
        </p>
      </div>

      {/* Feature badges */}
      <div className="flex flex-wrap gap-2">
        {['🔍 Global Search', '🔊 Read Aloud', '🔖 Bookmarks', '✅ Progress Tracking', '🌙 Dark Mode', '⌨️ Keyboard Shortcuts', '📗 Send to Practice'].map(f => (
          <span key={f} className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
            {f}
          </span>
        ))}
      </div>

      {/* Domain grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {domains.map(d => (
          <div key={d.num} className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Domain {d.num}
              </span>
              <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                {d.sections} sections
              </span>
            </div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{d.title}</p>
          </div>
        ))}
      </div>

      {/* Open reader */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Open CBK Reader</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Opens the full interactive CBK reader in a new tab. All 8 domains available — 363 sections total.
          </p>
        </div>
        <a
          href="/cbk/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 rounded-full bg-blue-700 px-5 py-2 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
        >
          Open CBK →
        </a>
      </div>
    </div>
  )
}
