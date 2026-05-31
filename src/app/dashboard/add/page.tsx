import { createClient } from '@/utils/supabase/server'
import { addEntry } from '../actions'
import { redirect } from 'next/navigation'

export default async function AddPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
      <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Add new entry</h2>
      <form className="flex flex-col gap-3">
        <textarea
          name="content"
          required
          rows={3}
          placeholder="Enter a word, phrase, or sentence..."
          className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50 resize-none"
        />
        <div className="flex items-center gap-3">
          <select
            name="type"
            defaultValue="word"
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
          >
            <option value="word">Word</option>
            <option value="phrase">Phrase</option>
            <option value="sentence">Sentence</option>
            <option value="topic">Topic</option>
            <option value="proverb">Proverb</option>
          </select>
          <button
            formAction={addEntry}
            className="rounded-full bg-zinc-900 dark:bg-zinc-50 px-5 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  )
}
