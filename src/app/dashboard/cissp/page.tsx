'use client'

import { useState } from 'react'
import { domains, Domain, Topic } from './data'

const DOMAIN_COLORS: Record<number, string> = {
  1: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  2: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  3: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  4: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  5: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  6: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
  7: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300',
  8: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300',
}

export default function CISSPPage() {
  const [activeDomain, setActiveDomain] = useState<Domain>(domains[0])
  const [activeTopic, setActiveTopic] = useState<Topic>(domains[0].topics[0])
  const [sidebarOpen, setSidebarOpen] = useState(true)

  function selectDomain(domain: Domain) {
    setActiveDomain(domain)
    setActiveTopic(domain.topics[0])
  }

  return (
    <div className="flex gap-0 min-h-screen">

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-12'} flex-shrink-0 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col transition-all duration-200 overflow-hidden`}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
          {sidebarOpen && <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Contents</span>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors ml-auto"
            title={sidebarOpen ? 'Collapse' : 'Expand'}
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>

        {sidebarOpen && (
          <div className="overflow-y-auto flex-1 py-2">
            {domains.map((domain) => (
              <div key={domain.id}>
                <button
                  onClick={() => selectDomain(domain)}
                  className={`w-full text-left px-4 py-2.5 flex items-center gap-2 transition-colors ${
                    activeDomain.id === domain.id
                      ? 'bg-zinc-100 dark:bg-zinc-800'
                      : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <span className={`rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 ${DOMAIN_COLORS[domain.number]}`}>
                    {domain.number}
                  </span>
                  <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 leading-tight">
                    {domain.title}
                  </span>
                </button>

                {activeDomain.id === domain.id && (
                  <div className="ml-7 border-l border-zinc-200 dark:border-zinc-700 pl-3 pb-1">
                    {domain.topics.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => setActiveTopic(topic)}
                        className={`w-full text-left py-1.5 pr-3 text-xs transition-colors leading-tight ${
                          activeTopic.id === topic.id
                            ? 'text-zinc-900 dark:text-zinc-50 font-medium'
                            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
                        }`}
                      >
                        {topic.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main reading area */}
      <div className="flex-1 overflow-y-auto">
        <div className="w-full px-8 py-10">

          {/* Attribution banner */}
          <div className="mb-8 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 px-5 py-4">
            <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
              <strong>Attribution:</strong> This content is adapted from{' '}
              <a
                href="https://theinfosecvault.gitbook.io/cissp-zero-to-hero"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-900 dark:hover:text-blue-100"
              >
                CISSP: Zero to Hero
              </a>{' '}
              by{' '}
              <a
                href="https://www.linkedin.com/in/lorenzoleonelli/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-900 dark:hover:text-blue-100"
              >
                Lorenzo Leonelli
              </a>{' '}
              (CISSP, PMP, ITIL4 MP, ISO27001 LA), licensed under{' '}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-900 dark:hover:text-blue-100"
              >
                CC BY-NC-SA 4.0
              </a>
              . Used for non-commercial study purposes with credit to the original author.
            </p>
          </div>

          {/* Domain header */}
          <div className="mb-6">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold mb-3 ${DOMAIN_COLORS[activeDomain.number]}`}>
              Domain {activeDomain.number}
            </span>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
              {activeDomain.title}
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{activeDomain.summary}</p>
          </div>

          {/* Topic navigation pills */}
          <div className="flex gap-1.5 flex-wrap mb-6">
            {activeDomain.topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic)}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                  activeTopic.id === topic.id
                    ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900'
                    : 'border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {topic.title}
              </button>
            ))}
          </div>

          {/* Topic content */}
          <div className="flex flex-col gap-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-800 pb-3">
              {activeTopic.title}
            </h2>

            {activeTopic.content.map((section, i) => (
              <div key={i} className="flex flex-col gap-3">
                {section.subheading && (
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 border-b border-zinc-200 dark:border-zinc-700 pb-2 mt-2">
                    {section.subheading}
                  </h3>
                )}
                {section.heading && (
                  <h4 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                    {section.heading}
                  </h4>
                )}

                {section.body && (
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {section.body}
                  </p>
                )}

                {section.list && (
                  <ul className="flex flex-col gap-1.5 pl-1">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex gap-2 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        <span className="text-zinc-400 flex-shrink-0 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.table && (
                  <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
                          {section.table.headers.map((h, j) => (
                            <th key={j} className="px-3 py-2.5 text-left font-semibold text-zinc-700 dark:text-zinc-300">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, j) => (
                          <tr key={j} className="border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                            {row.map((cell, k) => (
                              <td key={k} className="px-3 py-2.5 text-zinc-600 dark:text-zinc-400 align-top">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.note && (
                  <div className="rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 px-4 py-3">
                    <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                      <strong>ℹ Note:</strong> {section.note}
                    </p>
                  </div>
                )}

                {section.tip && (
                  <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 px-4 py-3">
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
                      <strong>✓ Tip:</strong> {section.tip}
                    </p>
                  </div>
                )}

                {section.warning && (
                  <div className="rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 px-4 py-3">
                    <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                      <strong>⚠ Warning:</strong> {section.warning}
                    </p>
                  </div>
                )}

                {section.questions && section.questions.length > 0 && (
                  <div className="mt-4 flex flex-col gap-3">
                    <h5 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">Open Questions</h5>
                    {section.questions.map((q, qi) => (
                      <details key={qi} className="rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                        <summary className="px-4 py-3 text-sm text-zinc-800 dark:text-zinc-200 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 list-none flex items-start gap-2">
                          <span className="flex-shrink-0 font-semibold text-zinc-400">{qi + 1}.</span>
                          <span>{q.q}</span>
                        </summary>
                        <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {q.a}
                        </div>
                      </details>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Domain navigation */}
          <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-between">
            {domains.findIndex(d => d.id === activeDomain.id) > 0 ? (
              <button
                onClick={() => selectDomain(domains[domains.findIndex(d => d.id === activeDomain.id) - 1])}
                className="rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                ← Previous Domain
              </button>
            ) : <div />}

            {domains.findIndex(d => d.id === activeDomain.id) < domains.length - 1 ? (
              <button
                onClick={() => selectDomain(domains[domains.findIndex(d => d.id === activeDomain.id) + 1])}
                className="rounded-full bg-zinc-900 dark:bg-zinc-50 px-4 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
              >
                Next Domain →
              </button>
            ) : <div />}
          </div>

          {/* Footer attribution */}
          <div className="mt-8 text-center">
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Content by{' '}
              <a href="https://www.linkedin.com/in/lorenzoleonelli/" target="_blank" rel="noopener noreferrer" className="underline">
                Lorenzo Leonelli
              </a>{' '}
              · Licensed CC BY-NC-SA 4.0 ·{' '}
              <a href="https://theinfosecvault.gitbook.io/cissp-zero-to-hero" target="_blank" rel="noopener noreferrer" className="underline">
                Original Source
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
