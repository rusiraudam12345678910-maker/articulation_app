import Link from 'next/link'

const books = [
  {
    emoji: '📚',
    label: 'CISSP Notes',
    subtitle: 'Zero to Hero · CC BY-NC-SA 4.0',
    description: 'Structured study notes across all 8 CISSP domains with search, tables, diagrams, and open-ended review questions.',
    href: '/dashboard/cissp',
    color: 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900',
    badge: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300',
    btn: 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200',
    stats: '8 domains · study notes',
    internal: true,
  },
  {
    emoji: '📗',
    label: 'All-in-One 8th Ed.',
    subtitle: 'Mike Chapple & David Seidl',
    description: 'Full-text interactive reader extracted from the CISSP All-in-One 8th Edition. TTS read-aloud, word highlight, bookmarks, progress tracking, and Send to Practice.',
    href: '/dashboard/cissp-book2',
    externalHref: '/book2/index.html',
    color: 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950',
    badge: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300',
    btn: 'bg-emerald-700 text-white hover:bg-emerald-600',
    stats: '8 domains · 1067 sections',
    internal: false,
  },
  {
    emoji: '📘',
    label: 'CBK Reference 5th Ed.',
    subtitle: 'Official (ISC)² CBK Reference',
    description: 'Full-text interactive reader from the Official (ISC)² CISSP CBK Reference 5th Edition. Same features as Book2 — TTS, word highlighting, bookmarks, progress, and Send to Practice.',
    href: '/dashboard/cissp-cbk',
    externalHref: '/cbk/index.html',
    color: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950',
    badge: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    btn: 'bg-blue-700 text-white hover:bg-blue-600',
    stats: '8 domains · 363 sections',
    internal: false,
  },
  {
    emoji: '📖',
    label: 'CISSP Book (Original)',
    subtitle: 'Chapter-by-chapter HTML',
    description: 'The original HTML chapter reader for CISSP study. Static per-chapter view with core content.',
    href: '/dashboard/cissp-book',
    color: 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900',
    badge: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300',
    btn: 'bg-zinc-700 text-white hover:bg-zinc-600',
    stats: '8 chapters',
    internal: true,
  },
]

export default function CISSPBooksPage() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          🎓 CISSP Study Library
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          All your CISSP study resources in one place. Three full books plus structured notes — pick the resource that fits your study style.
        </p>
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-700">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
              <th className="px-4 py-3 text-left font-semibold text-zinc-600 dark:text-zinc-300">Resource</th>
              <th className="px-4 py-3 text-center font-semibold text-zinc-600 dark:text-zinc-300">TTS</th>
              <th className="px-4 py-3 text-center font-semibold text-zinc-600 dark:text-zinc-300">Search</th>
              <th className="px-4 py-3 text-center font-semibold text-zinc-600 dark:text-zinc-300">Bookmarks</th>
              <th className="px-4 py-3 text-center font-semibold text-zinc-600 dark:text-zinc-300">Progress</th>
              <th className="px-4 py-3 text-center font-semibold text-zinc-600 dark:text-zinc-300">Send to Practice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {[
              { name: '📚 CISSP Notes',           tts: false, search: true,  bookmarks: false, progress: false, practice: false },
              { name: '📗 All-in-One 8th Ed.',     tts: true,  search: true,  bookmarks: true,  progress: true,  practice: true  },
              { name: '📘 CBK Reference 5th Ed.',  tts: true,  search: true,  bookmarks: true,  progress: true,  practice: true  },
              { name: '📖 CISSP Book (Original)',  tts: false, search: false, bookmarks: false, progress: false, practice: false },
            ].map(r => (
              <tr key={r.name} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="px-4 py-3 font-medium text-zinc-800 dark:text-zinc-200">{r.name}</td>
                {[r.tts, r.search, r.bookmarks, r.progress, r.practice].map((v, i) => (
                  <td key={i} className="px-4 py-3 text-center">
                    {v ? <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                       : <span className="text-zinc-300 dark:text-zinc-600">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Book cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {books.map(b => (
          <div key={b.label} className={`rounded-xl border p-5 flex flex-col gap-3 ${b.color}`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{b.emoji}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${b.badge}`}>{b.stats}</span>
                </div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">{b.label}</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{b.subtitle}</p>
              </div>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-1">{b.description}</p>
            <div className="flex gap-2 mt-1">
              <Link
                href={b.href}
                className="rounded-full border border-zinc-300 dark:border-zinc-600 px-4 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Details →
              </Link>
              {b.externalHref && (
                <a
                  href={b.externalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${b.btn}`}
                >
                  Open Reader →
                </a>
              )}
              {b.internal && (
                <Link
                  href={b.href}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${b.btn}`}
                >
                  Open →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Study tip */}
      <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950 p-4">
        <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
          <strong>💡 Study tip:</strong> Use the <strong>All-in-One</strong> for exam prep (concise, exam-focused),
          and the <strong>CBK Reference</strong> for deep reference reading (authoritative (ISC)² content).
          The <strong>CISSP Notes</strong> are great for quick domain reviews with Q&amp;A.
          Use <strong>Send to Practice</strong> in the readers to build your flashcard deck from key passages.
        </p>
      </div>
    </div>
  )
}
