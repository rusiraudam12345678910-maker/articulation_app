'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { createServiceClient } from '@/utils/supabase/service'
import { checkInvite, consumeInvite } from '@/utils/supabase/invites'
import { signInWithGoogle as signInWithGoogleAction } from '@/app/login/actions'

export async function signInWithGoogle(formData: FormData) {
  await signInWithGoogleAction(formData)
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const inviteCode = (formData.get('invite') as string | null)?.trim()

  if (!inviteCode) {
    redirect('/signup?error=' + encodeURIComponent('An invite link is required to sign up.'))
  }

  const invite = await checkInvite(inviteCode, email)
  if (!invite.valid) {
    redirect('/signup?invite=' + encodeURIComponent(inviteCode) + '&error=' + encodeURIComponent(invite.reason))
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    redirect('/signup?invite=' + encodeURIComponent(inviteCode) + '&error=' + encodeURIComponent(error.message))
  }

  if (data.user) {
    await consumeInvite(invite.inviteId, data.user.id)
    const service = createServiceClient()
    await service.from('profiles').upsert({ id: data.user.id, role: invite.role })
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
