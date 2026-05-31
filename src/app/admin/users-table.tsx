'use client'

import { useState } from 'react'
import { updateUserRole, createUser, deleteUser } from './actions'

type User = {
  id: string
  role: string
  created_at: string
  email: string
}

export default function UsersTable({ users, currentUserId }: { users: User[], currentUserId: string }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [addError, setAddError] = useState('')

  async function handleRoleChange(userId: string, newRole: 'user' | 'admin') {
    setLoading(userId)
    await updateUserRole(userId, newRole)
    setLoading(null)
  }

  async function handleDelete(userId: string) {
    if (!confirm('Delete this user? This cannot be undone.')) return
    setLoading(userId)
    await deleteUser(userId)
    setLoading(null)
  }

  async function handleCreate(formData: FormData) {
    setAddError('')
    try {
      await createUser(formData)
      setShowAddForm(false)
    } catch (e: unknown) {
      setAddError(e instanceof Error ? e.message : 'Failed to create user')
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Add user form */}
      {showAddForm ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Add new user</h3>
          <form action={handleCreate} className="flex flex-col gap-3">
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
            />
            <input
              name="password"
              type="password"
              required
              placeholder="Password"
              minLength={6}
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
            {addError && <p className="text-xs text-red-500">{addError}</p>}
            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-full bg-zinc-900 dark:bg-zinc-50 px-4 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
              >
                Create user
              </button>
              <button
                type="button"
                onClick={() => { setShowAddForm(false); setAddError('') }}
                className="rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="self-start rounded-full bg-zinc-900 dark:bg-zinc-50 px-4 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
        >
          + Add user
        </button>
      )}

      {/* Users table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 text-left">
              <th className="px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Email</th>
              <th className="px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Role</th>
              <th className="px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Joined</th>
              <th className="px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                <td className="px-4 py-3 text-zinc-900 dark:text-zinc-50 text-sm">
                  {u.email}
                  {u.id === currentUserId && (
                    <span className="ml-2 text-xs text-zinc-400">(you)</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    u.role === 'admin'
                      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                      : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 text-xs">
                  {new Date(u.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  {u.id === currentUserId ? (
                    <span className="text-xs text-zinc-400">—</span>
                  ) : loading === u.id ? (
                    <span className="text-xs text-zinc-400">Saving...</span>
                  ) : (
                    <div className="flex gap-3">
                      {u.role === 'admin' ? (
                        <button
                          onClick={() => handleRoleChange(u.id, 'user')}
                          className="text-xs text-yellow-600 hover:underline"
                        >
                          Demote
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRoleChange(u.id, 'admin')}
                          className="text-xs text-yellow-600 hover:underline"
                        >
                          Promote
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
