import { createClient } from '@/utils/supabase/server'
import EntriesList from '../entries-list'
import Flashcard from '../flashcard'

export default async function WordsPage() {
  const supabase = await createClient()

  const { data: entries } = await supabase
    .from('entries')
    .select('*')
    .eq('type', 'word')
    .order('created_at', { ascending: false })

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  return (
    <>
      {(entries?.length ?? 0) > 0 && <Flashcard entries={entries ?? []} />}
      <EntriesList entries={entries ?? []} categories={categories ?? []} />
    </>
  )
}
