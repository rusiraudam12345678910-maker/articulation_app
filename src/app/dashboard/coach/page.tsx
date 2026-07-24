import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import CoachHub from './coach-hub'

export default async function CoachPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return <CoachHub />
}
