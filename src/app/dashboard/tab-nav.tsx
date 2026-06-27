'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const tabs = [
  { label: 'All', href: '/dashboard' },
  { label: 'Words', href: '/dashboard/words' },
  { label: 'Phrases', href: '/dashboard/phrases' },
  { label: 'Sentences', href: '/dashboard/sentences' },
  { label: 'Topics', href: '/dashboard/topics' },
  { label: 'Proverbs', href: '/dashboard/proverbs' },
  { label: '+ Add', href: '/dashboard/add' },
  { label: '🎙 Practice', href: '/dashboard/practice' },
  { label: '👂 Listen & Repeat', href: '/dashboard/listen' },
  { label: '📚 CISSP', href: '/dashboard/cissp' },
  { label: '📖 CISSP Book', href: '/dashboard/cissp-book' },
]

export default function TabNav() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-1 -mb-px">
      {tabs.map((tab) => {
        const active = pathname === tab.href
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              active
                ? 'border-zinc-900 dark:border-zinc-50 text-zinc-900 dark:text-zinc-50'
                : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}
