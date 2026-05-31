import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { createServiceClient } from '@/utils/supabase/service'
import { isAdmin } from '@/utils/supabase/admin'
import UsersTable from './users-table'

export default async function AdminPage() {
  const admin = await isAdmin()
  if (!admin) redirect('/dashboard')

  const supabase = await createClient()
  const serviceClient = createServiceClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profiles } = await serviceClient
    .from('profiles')
    .select('id, role, created_at')
    .order('created_at', { ascending: true })

  const { data: authUsers } = await serviceClient.auth.admin.listUsers()

  const users = profiles?.map((p) => ({
    ...p,
    email: authUsers?.users.find((u) => u.id === p.id)?.email ?? 'Unknown',
  }))

  const { data: entries } = await serviceClient
    .from('entries')
    .select('id, content, type, user_id, created_at')
    .order('created_at', { ascending: false })

  return (
    <div className="flex min-h-full flex-col bg-zinc-50 dark:bg-black">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Admin Panel
        </h1>
        <a
          href="/dashboard"
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
        >
          ← Back to dashboard
        </a>
      </header>

      <main className="flex flex-1 flex-col items-center px-6 py-10">
        <div className="w-full max-w-4xl flex flex-col gap-10">

          {/* Users */}
          <div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              Users ({users?.length ?? 0})
            </h2>
            <UsersTable users={users ?? []} currentUserId={user!.id} />
          </div>

          {/* All entries */}
          <div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              All Entries ({entries?.length ?? 0})
            </h2>
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 text-left">
                    <th className="px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Content</th>
                    <th className="px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Type</th>
                    <th className="px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">User ID</th>
                    <th className="px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {entries?.map((e) => (
                    <tr key={e.id} className="border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                      <td className="px-4 py-3 text-zinc-900 dark:text-zinc-50">{e.content}</td>
                      <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 capitalize">{e.type}</td>
                      <td className="px-4 py-3 text-zinc-400 font-mono text-xs">{e.user_id}</td>
                      <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 text-xs">
                        {new Date(e.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
