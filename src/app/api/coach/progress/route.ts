import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: sessions, error: sessionsError } = await supabase
    .from('coach_sessions')
    .select('id')
    .eq('user_id', user.id)

  if (sessionsError) return NextResponse.json({ error: sessionsError.message }, { status: 500 })

  const sessionIds = (sessions ?? []).map((s) => s.id)
  if (sessionIds.length === 0) {
    return NextResponse.json({ total: 0, byType: {}, recent: [] })
  }

  const { data: turns, error: turnsError } = await supabase
    .from('coach_turns')
    .select('id')
    .in('session_id', sessionIds)

  if (turnsError) return NextResponse.json({ error: turnsError.message }, { status: 500 })

  const turnIds = (turns ?? []).map((t) => t.id)
  if (turnIds.length === 0) {
    return NextResponse.json({ total: 0, byType: {}, recent: [] })
  }

  const { data: corrections, error: correctionsError } = await supabase
    .from('coach_corrections')
    .select('type, created_at')
    .in('turn_id', turnIds)
    .order('created_at', { ascending: false })

  if (correctionsError) return NextResponse.json({ error: correctionsError.message }, { status: 500 })

  const byType: Record<string, number> = {}
  for (const c of corrections ?? []) {
    byType[c.type] = (byType[c.type] ?? 0) + 1
  }

  return NextResponse.json({
    total: corrections?.length ?? 0,
    byType,
    recent: (corrections ?? []).slice(0, 20),
  })
}
