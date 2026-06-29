'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    let message = 'Invalid email or password.'
    if (error.message.toLowerCase().includes('email not confirmed')) {
      message = 'Please confirm your email address before signing in. Check your inbox for a confirmation link.'
    } else if (error.message.toLowerCase().includes('invalid')) {
      message = 'Invalid email or password.'
    } else {
      message = error.message
    }
    redirect('/login?error=' + encodeURIComponent(message))
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
