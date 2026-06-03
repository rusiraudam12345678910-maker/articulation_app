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
  const word_family = type === 'word' ? ((formData.get('word_family') as string | null)?.trim().toLowerCase() || null) : null

  if (!content) return

  await supabase.from('entries').insert({ content, type, user_id: user.id, word_family })
  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard/add')
}

export async function deleteEntry(id: string) {
  const supabase = await createClient()
  await supabase.from('entries').delete().eq('id', id)
  revalidatePath('/dashboard')
}

export async function bulkAddEntries(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const raw = formData.get('contents') as string
  const type = formData.get('type') as string
  const word_family = type === 'word' ? ((formData.get('word_family') as string | null)?.trim().toLowerCase() || null) : null

  const lines = raw
    .split(/[\s\n]+/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0)

  if (!lines.length) return

  await supabase.from('entries').insert(
    lines.map((content) => ({ content, type, user_id: user.id, word_family }))
  )

  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard/add')
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

export async function toggleStudied(id: string, current: boolean) {
  const supabase = await createClient()
  await supabase.from('entries').update({ is_studied: !current }).eq('id', id)
  revalidatePath('/dashboard')
}

export async function setTier(id: string, tier: string | null) {
  const supabase = await createClient()
  await supabase.from('entries').update({ tier }).eq('id', id)
  revalidatePath('/dashboard')
}

export async function incrementPractice(id: string, current: number) {
  const supabase = await createClient()
  await supabase.from('entries').update({ practice_count: current + 1 }).eq('id', id)
  revalidatePath('/dashboard')
}

export async function saveDefinition(word: string, part_of_speech: string, definition: string, example: string | null) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // upsert: one saved definition per word (replace if already exists)
  await supabase.from('definitions').upsert(
    { word: word.toLowerCase(), part_of_speech, definition, example, saved_by: user.id },
    { onConflict: 'word' }
  )
  revalidatePath('/dashboard')
}
