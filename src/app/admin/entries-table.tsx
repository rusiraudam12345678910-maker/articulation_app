'use client'

import { useState } from 'react'

type Entry = {
  id: string
  content: string
  type: string
  user_id: string
  created_at: string
}

type User = {
  id: string
  email: string
}

export default function EntriesTable({ entries, users }: { entries: Entry[], users: User[] }) {
  const [selectedUser, setSelectedUser] = useState('all')

  const filtered = selectedUser === 'all'
    ? entries
    : entries.filter((e) => e.user_id === selectedUser)

  function emailForUser(userId: string) {
    return users.find((u) => u.id === userId)?.email ?? userId.slice(0, 8) + '...'
  }

  return (
    <div className="flex flex-col gap-4">
      {/* User filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedUser('all')}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            selectedUser === 'all'
              ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
              : 'border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          All users ({entries.length})
        </button>
        {users.map((u) => {
          const count = entries.filter((e) => e.user_id === u.id).length
          return (
            <button
              key={u.id}
              onClick={() => setSelectedUser(u.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedUser === u.id
                  ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                  : 'border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {u.email} ({count})
            </button>
          )
        })}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 text-left">
              <th className="px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Content</th>
              <th className="px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Type</th>
              <th className="px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">User</th>
              <th className="px-4 py-3 font-medium text-zinc-500 dark:text-zinc-400">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-sm text-zinc-400">No entries found.</td>
              </tr>
            ) : (
              filtered.map((e) => (
                <tr key={e.id} className="border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                  <td className="px-4 py-3 text-zinc-900 dark:text-zinc-50">{e.content}</td>
                  <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 capitalize">{e.type}</td>
                  <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 text-xs">{emailForUser(e.user_id)}</td>
                  <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400 text-xs">
                    {new Date(e.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
