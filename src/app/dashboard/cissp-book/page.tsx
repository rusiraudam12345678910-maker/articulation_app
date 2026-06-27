import Link from 'next/link'

const chapters = [
  {
    file: 'ch01.html',
    domain: 1,
    eyebrow: 'Domain 1',
    title: 'Security and Risk Management',
    summary: 'Security fundamentals, risk analysis, policies, governance, compliance, and business continuity.',
    color: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  },
  {
    file: 'ch02.html',
    domain: 2,
    eyebrow: 'Domain 2',
    title: 'Asset Security',
    summary: 'Data classification, ownership, privacy, retention, and data security controls.',
    color: 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800',
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  },
  {
    file: 'ch03.html',
    domain: 3,
    eyebrow: 'Domain 3',
    title: 'Security Engineering',
    summary: 'System architecture, models, cryptography, physical security, and secure design principles.',
    color: 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  },
  {
    file: 'ch04.html',
    domain: 4,
    eyebrow: 'Domain 4',
    title: 'Communication and Network Security',
    summary: 'OSI/TCP-IP models, protocols, network attacks, firewalls, VPNs, and wireless security.',
    color: 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  },
  {
    file: 'ch05.html',
    domain: 5,
    eyebrow: 'Domain 5',
    title: 'Identity and Access Management',
    summary: 'Authentication, authorization, identity federation, access control models, and SSO.',
    color: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800',
    badge: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  },
  {
    file: 'ch06.html',
    domain: 6,
    eyebrow: 'Domain 6',
    title: 'Security Assessment and Testing',
    summary: 'Auditing, vulnerability testing, penetration testing, log reviews, and SOC reports.',
    color: 'bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800',
    badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
  },
  {
    file: 'ch07.html',
    domain: 7,
    eyebrow: 'Domain 7',
    title: 'Security Operations',
    summary: 'Incident response, forensics, disaster recovery, physical security, and operations controls.',
    color: 'bg-rose-50 dark:bg-rose-950 border-rose-200 dark:border-rose-800',
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300',
  },
  {
    file: 'ch08.html',
    domain: 8,
    eyebrow: 'Domain 8',
    title: 'Software Development Security',
    summary: 'SDLC, secure coding, databases, software vulnerabilities, and DevSecOps practices.',
    color: 'bg-teal-50 dark:bg-teal-950 border-teal-200 dark:border-teal-800',
    badge: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300',
  },
]

const extras = [
  {
    file: 'appA.html',
    icon: '📝',
    title: 'Comprehensive Questions',
    summary: 'Full-length practice exam questions covering all 8 CISSP domains.',
    color: 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700',
  },
  {
    file: 'appB.html',
    icon: '💿',
    title: 'About the CD-ROM',
    summary: 'Practice exam software, additional resources, and how to use them.',
    color: 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700',
  },
  {
    file: '../glossary.html',
    icon: '📖',
    title: 'Glossary',
    summary: '223 key CISSP terms and definitions from A to W.',
    color: 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700',
  },
]

export default function CISSPBookPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          📖 CISSP All-in-One Exam Guide
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          7th Edition — Complete book in HTML. Click any chapter to read it.
        </p>
      </div>

      {/* Chapter grid */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
          8 Domains
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {chapters.map((ch) => (
            <a
              key={ch.file}
              href={`/book/chapters/${ch.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col gap-2 rounded-xl border p-5 transition-shadow hover:shadow-md ${ch.color}`}
            >
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${ch.badge}`}>
                  {ch.eyebrow}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 leading-snug">
                {ch.title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {ch.summary}
              </p>
              <span className="mt-auto text-xs font-medium text-zinc-400 dark:text-zinc-500">
                Open chapter →
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Extras */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
          Appendices &amp; Glossary
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {extras.map((ex) => (
            <a
              key={ex.file}
              href={ex.file.startsWith('../') ? `/book/glossary.html` : `/book/chapters/${ex.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col gap-2 rounded-xl border p-5 transition-shadow hover:shadow-md ${ex.color}`}
            >
              <span className="text-2xl">{ex.icon}</span>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                {ex.title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {ex.summary}
              </p>
              <span className="mt-auto text-xs font-medium text-zinc-400 dark:text-zinc-500">
                Open →
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Full book link */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Open full book index</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            All chapters with sidebar navigation and full-text search.
          </p>
        </div>
        <a
          href="/book/index1.html"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 rounded-full bg-zinc-900 dark:bg-zinc-50 px-5 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
        >
          Open Book →
        </a>
      </div>
    </div>
  )
}
