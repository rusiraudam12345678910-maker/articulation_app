import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { createServiceClient } from '@/utils/supabase/service'
import { isAdmin } from '@/utils/supabase/admin'
import UsersTable from './users-table'
import EntriesTable from './entries-table'
import InvitesTable from './invites-table'
import { listInvites } from './actions'

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

  const users = profiles?.map((p) => {
    const authUser = authUsers?.users.find((u) => u.id === p.id)
    return {
      ...p,
      email: authUser?.email ?? 'Unknown',
      lastSignInAt: authUser?.last_sign_in_at ?? null,
    }
  })

  const { data: entries } = await serviceClient
    .from('entries')
    .select('id, content, type, user_id, created_at')
    .order('created_at', { ascending: false })

  const invites = await listInvites()
  const headersList = await headers()
  const host = headersList.get('x-forwarded-host') ?? headersList.get('host') ?? ''
  const protocol = headersList.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https')
  const appUrl = host ? `${protocol}://${host}` : ''

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

          {/* Invites */}
          <div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
              Invites ({invites.length})
            </h2>
            <InvitesTable invites={invites} appUrl={appUrl} />
          </div>

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
            <EntriesTable entries={entries ?? []} users={users ?? []} />
          </div>

        </div>
      </main>
    </div>
  )
}
