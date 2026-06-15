import { createClient } from '@/utils/supabase/server'
import { getUsers } from '@/utils/supabase/users'
import EntriesList from '../entries-list'
import Flashcard from '../flashcard'

export default async function PhrasesPage() {
  const supabase = await createClient()

  const [{ data: entries }, { data: categories }, users, { data: definitions }, { data: phraseExamplesRows }] = await Promise.all([
    supabase.from('entries').select('*').eq('type', 'phrase').order('created_at', { ascending: false }),
    supabase.from('categories').select('*').order('name', { ascending: true }),
    getUsers(),
    supabase.from('definitions').select('word, part_of_speech, definition, example'),
    supabase.from('phrase_examples').select('phrase, examples'),
  ])

  const definitionsByWord = Object.fromEntries((definitions ?? []).map((d) => [d.word, d]))
  const examplesByPhrase = Object.fromEntries(
    (phraseExamplesRows ?? []).map((r) => [r.phrase, r.examples as string[]])
  )

  return (
    <>
      {(entries?.length ?? 0) > 0 && <Flashcard entries={entries ?? []} />}
      <EntriesList entries={entries ?? []} categories={categories ?? []} users={users} definitionsByWord={definitionsByWord} examplesByPhrase={examplesByPhrase} />
    </>
  )
}
