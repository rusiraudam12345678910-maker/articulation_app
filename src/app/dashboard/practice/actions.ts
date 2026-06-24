'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function addSlowDrillWord(word: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !word.trim()) return
  await supabase.from('slow_drill_words').upsert({ user_id: user.id, word: word.trim().toLowerCase() }, { onConflict: 'user_id,word' })
  revalidatePath('/dashboard/practice')
}

export async function deleteSlowDrillWord(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  await supabase.from('slow_drill_words').delete().eq('id', id).eq('user_id', user.id)
  revalidatePath('/dashboard/practice')
}

export async function getSlowDrillWords() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []
  const { data } = await supabase
    .from('slow_drill_words')
    .select('id, word')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })
  return (data ?? []) as { id: string; word: string }[]
}

export async function logPractice(entryId: string | null, mode: string, drillText: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('practice_sessions').insert({
    user_id: user.id,
    entry_id: entryId,
    mode,
    drill_text: drillText,
  })

  if (entryId) {
    const { data: entry } = await supabase
      .from('entries')
      .select('practice_count')
      .eq('id', entryId)
      .single()

    await supabase
      .from('entries')
      .update({
        practice_count: (entry?.practice_count ?? 0) + 1,
        last_practiced_at: new Date().toISOString(),
      })
      .eq('id', entryId)
  }

  revalidatePath('/dashboard/practice')
}

export async function getPracticeStats() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { streak: 0, total: 0, todayCount: 0, recentSessions: [] }

  const { data: rawSessions } = await supabase
    .from('practice_sessions')
    .select('practiced_at, mode, drill_text')
    .eq('user_id', user.id)
    .order('practiced_at', { ascending: false })
    .limit(100)

  const sessions = (rawSessions ?? []) as { practiced_at: string; mode: string; drill_text: string }[]

  if (sessions.length === 0) {
    return { streak: 0, total: 0, todayCount: 0, recentSessions: [] }
  }

  const todayStr = new Date().toISOString().slice(0, 10)
  const todayCount = sessions.filter(s => s.practiced_at.slice(0, 10) === todayStr).length

  // compute streak from unique practice days
  const days = [...new Set(sessions.map(s => s.practiced_at.slice(0, 10)))].sort().reverse()
  let streak = 0
  let cursor = new Date(todayStr)
  for (const day of days) {
    const d = new Date(day as string)
    const diff = Math.round((cursor.getTime() - d.getTime()) / 86400000)
    if (diff === 0 || diff === 1) {
      streak++
      cursor = d
    } else {
      break
    }
  }

  return {
    streak,
    total: sessions.length,
    todayCount,
    recentSessions: sessions.slice(0, 15),
  }
}
