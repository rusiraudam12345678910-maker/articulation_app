'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export type ListenItem = { id: string; content: string; created_at: string }

export async function getListenItems(): Promise<ListenItem[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []
  const { data } = await supabase
    .from('listen_repeat_items')
    .select('id, content, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
  return (data ?? []) as ListenItem[]
}

export async function addListenItem(content: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !content.trim()) return
  await supabase.from('listen_repeat_items').insert({ user_id: user.id, content: content.trim() })
  revalidatePath('/dashboard/listen')
}

export async function updateListenItem(id: string, content: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !content.trim()) return
  await supabase.from('listen_repeat_items').update({ content: content.trim() }).eq('id', id).eq('user_id', user.id)
  revalidatePath('/dashboard/listen')
}

export async function bulkAddListenItems(lines: string[]) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  const rows = lines
    .map(l => l.trim())
    .filter(l => l.length > 0)
    .map(l => ({ user_id: user.id, content: l }))
  if (rows.length === 0) return
  await supabase.from('listen_repeat_items').insert(rows)
  revalidatePath('/dashboard/listen')
}

export async function deleteListenItem(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  await supabase.from('listen_repeat_items').delete().eq('id', id).eq('user_id', user.id)
  revalidatePath('/dashboard/listen')
}
