'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function addCategory(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const name = (formData.get('name') as string).trim()
  if (!name) return

  await supabase.from('categories').insert({ name, user_id: user.id })
  revalidatePath('/dashboard')
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()
  await supabase.from('categories').delete().eq('id', id)
  revalidatePath('/dashboard')
}

export async function updateEntryCategory(entryId: string, categoryId: string | null) {
  const supabase = await createClient()
  await supabase.from('entries').update({ category_id: categoryId }).eq('id', entryId)
  revalidatePath('/dashboard')
}
