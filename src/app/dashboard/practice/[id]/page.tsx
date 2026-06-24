import { createClient } from '@/utils/supabase/server'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import Recorder from '@/components/practice/recorder'

export default async function EntryPracticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: entry } = await supabase
    .from('entries')
    .select('id, content, type, practice_count')
    .eq('id', id)
    .single()

  if (!entry) notFound()

  return (
    <div className="flex flex-col gap-5 max-w-xl">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/practice"
          className="text-zinc-400 hover:text-zinc-200 transition-colors text-sm"
        >
          ← Practice
        </Link>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 px-6 py-5">
        <div className="font-mono text-xs uppercase tracking-widest text-red-500 mb-3 capitalize">
          {entry.type} practice
        </div>
        <div className="font-mono text-3xl leading-snug text-zinc-900 dark:text-zinc-50 mb-2">
          {entry.content}
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          Say it clearly and at a natural pace. Record yourself to hear how it sounds.
        </div>
        {entry.practice_count > 0 && (
          <div className="mt-3 font-mono text-xs text-zinc-400">
            Practiced {entry.practice_count}× total
          </div>
        )}
      </div>

      <Recorder
        entryId={entry.id}
        drillText={entry.content}
        mode="free"
      />
    </div>
  )
}
