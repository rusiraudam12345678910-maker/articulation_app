import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import PracticeHub from './practice-hub'
import { getPracticeStats, getSlowDrillWords } from './actions'

export default async function PracticePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: entries } = await supabase
    .from('entries')
    .select('id, content, type, word_family, practice_count, last_practiced_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const [stats, slowDrillWords] = await Promise.all([getPracticeStats(), getSlowDrillWords()])

  return (
    <PracticeHub
      entries={entries ?? []}
      stats={stats ?? { streak: 0, total: 0, todayCount: 0, recentSessions: [] }}
      slowDrillWords={slowDrillWords}
    />
  )
}
