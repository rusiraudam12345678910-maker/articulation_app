import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getListenItems } from './actions'
import ListenRepeat from './listen-repeat'

export default async function ListenPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const items = await getListenItems()

  return <ListenRepeat initialItems={items} />
}
