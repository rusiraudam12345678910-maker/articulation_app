import { createClient } from '@/utils/supabase/server'
import { getUsers } from '@/utils/supabase/users'
import EntriesList from '../entries-list'
import Flashcard from '../flashcard'

export default async function SentencesPage() {
  const supabase = await createClient()

  const [{ data: entries }, { data: categories }, users] = await Promise.all([
    supabase.from('entries').select('*').eq('type', 'sentence').order('created_at', { ascending: false }),
    supabase.from('categories').select('*').order('name', { ascending: true }),
    getUsers(),
  ])

  return (
    <>
      {(entries?.length ?? 0) > 0 && <Flashcard entries={entries ?? []} />}
      <EntriesList entries={entries ?? []} categories={categories ?? []} users={users} />
    </>
  )
}
