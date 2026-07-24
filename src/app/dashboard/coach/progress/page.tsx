import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ProgressView from './progress-view'

export default async function CoachProgressPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return <ProgressView />
}
