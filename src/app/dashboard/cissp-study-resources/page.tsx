const domains = [
  { num: 1, title: 'Security and Risk Management',         sections: 13 },
  { num: 2, title: 'Asset Security',                        sections: 7  },
  { num: 3, title: 'Security Architecture and Engineering', sections: 11 },
  { num: 4, title: 'Communication and Network Security',    sections: 4  },
  { num: 5, title: 'Identity and Access Management',        sections: 7  },
  { num: 6, title: 'Security Assessment and Testing',       sections: 6  },
  { num: 7, title: 'Security Operations',                   sections: 16 },
  { num: 8, title: 'Software Development Security',         sections: 6  },
]

export default function CISSPStudyResourcesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          🗂️ CISSP Study Resources — 2024 Objectives
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Reader for the community-maintained jefferywmoore/CISSP-Study-Resources exam
          objective outlines. Full-text search, TTS read-aloud with highlighting, bookmarks,
          and progress tracking.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {['🔍 Global Search', '🔊 Read Aloud', '🔖 Bookmarks', '✅ Progress Tracking', '🌙 Dark Mode', '⌨️ Keyboard Shortcuts'].map(f => (
          <span key={f} className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
            {f}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {domains.map(d => (
          <div key={d.num} className="rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950 p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                Domain {d.num}
              </span>
              <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full">
                {d.sections} sections
              </span>
            </div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{d.title}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Open Study Resources Reader</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Opens the reader in a new tab. All 8 domains available — 70 sections total.
          </p>
        </div>
        <a
          href="/study-resources/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 rounded-full bg-purple-700 px-5 py-2 text-sm font-medium text-white hover:bg-purple-600 transition-colors"
        >
          Open Reader →
        </a>
      </div>
    </div>
  )
}
