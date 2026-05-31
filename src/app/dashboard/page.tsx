import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { isAdmin } from '@/utils/supabase/admin'
import { signout, addEntry } from './actions'
import EntriesList from './entries-list'
import Flashcard from './flashcard'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const admin = await isAdmin()

  const { data: entries } = await supabase
    .from('entries')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  return (
    <div className="flex min-h-full flex-col bg-zinc-50 dark:bg-black">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Articulation App
        </h1>
        <div className="flex items-center gap-4">
          {admin && (
            <a
              href="/admin"
              className="text-sm font-medium text-yellow-600 dark:text-yellow-400 hover:underline"
            >
              Admin
            </a>
          )}
          <span className="text-sm text-zinc-500 dark:text-zinc-400">{user.email}</span>
          <form>
            <button
              formAction={signout}
              className="rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-6 py-10">
        <div className="w-full max-w-2xl flex flex-col gap-8">

          {/* Add entry form */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              Add new entry
            </h2>
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

          {/* Flashcard mode */}
          {(entries?.length ?? 0) > 0 && (
            <Flashcard entries={entries ?? []} />
          )}

          {/* Entries list */}
          <EntriesList entries={entries ?? []} categories={categories ?? []} />

        </div>
      </main>
    </div>
  )
}
