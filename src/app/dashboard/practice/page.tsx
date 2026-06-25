import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import PracticeHub from './practice-hub'
import { getPracticeItems } from './actions'

export default async function PracticePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const items = await getPracticeItems()

  return <PracticeHub initialItems={items} />
}
