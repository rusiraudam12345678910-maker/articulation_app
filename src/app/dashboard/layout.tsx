import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { isAdmin } from '@/utils/supabase/admin'
import { signout } from './actions'
import TabNav from './tab-nav'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const admin = await isAdmin()

  return (
    <div className="flex min-h-full flex-col bg-zinc-50 dark:bg-black">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Articulation App
        </h1>
        <div className="flex items-center gap-4">
          {admin && (
            <a href="/admin" className="text-sm font-medium text-yellow-600 dark:text-yellow-400 hover:underline">
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

      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6">
        <TabNav />
      </div>

      <main className="flex flex-1 flex-col items-center px-6 py-10">
        <div className="w-full max-w-2xl flex flex-col gap-8">
          {children}
        </div>
      </main>
    </div>
  )
}
