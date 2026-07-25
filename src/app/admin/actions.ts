'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
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

export async function createInvite(formData: FormData) {
  if (!(await isAdmin())) throw new Error('Unauthorized')

  const email = (formData.get('email') as string)?.trim()
  const role = formData.get('role') === 'admin' ? 'admin' : 'user'
  if (!email) throw new Error('Email is required')

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const service = createServiceClient()
  const { data, error } = await service
    .from('invites')
    .insert({ email, role, created_by: user.id })
    .select('code')
    .single()

  if (error) throw new Error(error.message)

  revalidatePath('/admin')
  return data.code as string
}

export async function listInvites() {
  if (!(await isAdmin())) throw new Error('Unauthorized')

  const supabase = createServiceClient()
  const { data } = await supabase
    .from('invites')
    .select('id, code, email, role, used_by, used_at, created_at')
    .order('created_at', { ascending: false })

  return data ?? []
}

export async function revokeInvite(inviteId: string) {
  if (!(await isAdmin())) throw new Error('Unauthorized')

  const supabase = createServiceClient()
  await supabase.from('invites').delete().eq('id', inviteId).is('used_by', null)
  revalidatePath('/admin')
}
