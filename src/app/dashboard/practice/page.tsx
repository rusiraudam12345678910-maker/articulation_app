import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import PracticeHub from './practice-hub'

export default async function PracticePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: entries } = await supabase
    .from('entries')
    .select('id, content, type')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return <PracticeHub entries={entries ?? []} />
}
