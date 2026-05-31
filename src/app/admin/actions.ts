'use server'

import { revalidatePath } from 'next/cache'
import { createServiceClient } from '@/utils/supabase/service'
import { isAdmin } from '@/utils/supabase/admin'

export async function updateUserRole(userId: string, role: 'user' | 'admin') {
  if (!(await isAdmin())) throw new Error('Unauthorized')

  const supabase = createServiceClient()
  await supabase.from('profiles').update({ role }).eq('id', userId)
  revalidatePath('/admin')
}

export async function createUser(formData: FormData) {
  if (!(await isAdmin())) throw new Error('Unauthorized')

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const role = formData.get('role') as 'user' | 'admin'

  const supabase = createServiceClient()

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (error) throw new Error(error.message)

  // Set role in profiles
  await supabase.from('profiles').upsert({ id: data.user.id, role })

  revalidatePath('/admin')
}

export async function deleteUser(userId: string) {
  if (!(await isAdmin())) throw new Error('Unauthorized')

  const supabase = createServiceClient()
  await supabase.auth.admin.deleteUser(userId)
  await supabase.from('profiles').delete().eq('id', userId)
  revalidatePath('/admin')
}
