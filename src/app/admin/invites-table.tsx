'use client'

import { useState } from 'react'
import { createInvite, revokeInvite } from './actions'

type Invite = {
  id: string
  code: string
  email: string
  role: string
  used_by: string | null
  used_at: string | null
  created_at: string
}

export default function InvitesTable({ invites, appUrl }: { invites: Invite[]; appUrl: string }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [newLink, setNewLink] = useState<string | null>(null)
  const [genError, setGenError] = useState('')

  async function handleCreate(formData: FormData) {
    setGenError('')
    setNewLink(null)
    try {
      const code = await createInvite(formData)
      setNewLink(`${appUrl}/signup?invite=${code}`)
    } catch (e: unknown) {
      setGenError(e instanceof Error ? e.message : 'Failed to create invite')
    }
  }

  async function handleRevoke(id: string) {
    if (!confirm('Revoke this invite link?')) return
    setLoading(id)
    await revokeInvite(id)
    setLoading(null)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Send an invite</h3>
        <form action={handleCreate} className="flex flex-col gap-3">
          <input
            name="email"
            type="email"
            required
            placeholder="Email address to invite"
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
          />
          <select
            name="role"
            defaultValue="user"
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {genError && <p className="text-xs text-red-500">{genError}</p>}
          <button
            type="submit"
            className="self-start rounded-full bg-zinc-900 dark:bg-zinc-50 px-4 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
          >
            Generate invite link
          </button>
        </form>

        {newLink && (
          <div className="mt-4 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 px-4 py-3">
            <p className="text-xs text-emerald-700 dark:text-emerald-300 mb-1">Send this link to the invited user:</p>
            <code className="text-xs break-all text-emerald-900 dark:text-emerald-100">{newLink}</code>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 text-left">
              <th className="px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Email</th>
              <th className="px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Role</th>
              <th className="px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Status</th>
              <th className="px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Created</th>
              <th className="px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invites.map((i) => (
              <tr key={i.id} className="border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                <td className="px-4 py-3 text-zinc-900 dark:text-zinc-50">{i.email}</td>
                <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">{i.role}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    i.used_by
                      ? 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                  }`}>
                    {i.used_by ? 'Used' : 'Pending'}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 text-xs">
                  {new Date(i.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  {i.used_by ? (
                    <span className="text-xs text-zinc-400">—</span>
                  ) : loading === i.id ? (
                    <span className="text-xs text-zinc-400">Revoking...</span>
                  ) : (
                    <button
                      onClick={() => handleRevoke(i.id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {invites.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-xs text-zinc-400">No invites yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
