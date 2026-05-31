'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function addEntry(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const content = (formData.get('content') as string).trim()
  const type = formData.get('type') as string

  if (!content) return

  await supabase.from('entries').insert({ content, type, user_id: user.id })
  revalidatePath('/dashboard')
}

export async function deleteEntry(id: string) {
  const supabase = await createClient()
  await supabase.from('entries').delete().eq('id', id)
  revalidatePath('/dashboard')
}

export async function updateEntry(id: string, content: string, type: string) {
  const supabase = await createClient()
  await supabase.from('entries').update({ content, type }).eq('id', id)
  revalidatePath('/dashboard')
}

export async function toggleFavorite(id: string, current: boolean) {
  const supabase = await createClient()
  await supabase.from('entries').update({ is_favorite: !current }).eq('id', id)
  revalidatePath('/dashboard')
}

export async function toggleMastered(id: string, current: boolean) {
  const supabase = await createClient()
  await supabase.from('entries').update({ is_mastered: !current }).eq('id', id)
  revalidatePath('/dashboard')
}

export async function incrementPractice(id: string, current: number) {
  const supabase = await createClient()
  await supabase.from('entries').update({ practice_count: current + 1 }).eq('id', id)
  revalidatePath('/dashboard')
}
