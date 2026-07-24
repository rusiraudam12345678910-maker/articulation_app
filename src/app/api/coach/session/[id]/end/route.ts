import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: sessionId } = await params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: session, error: sessionError } = await supabase
    .from('coach_sessions')
    .select('id, user_id')
    .eq('id', sessionId)
    .single()

  if (sessionError || !session || session.user_id !== user.id) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }

  await supabase.from('coach_sessions').update({ ended_at: new Date().toISOString() }).eq('id', sessionId)

  const { data: turns, error: turnsError } = await supabase
    .from('coach_turns')
    .select('id')
    .eq('session_id', sessionId)

  if (turnsError) return NextResponse.json({ error: turnsError.message }, { status: 500 })

  const turnIds = (turns ?? []).map((t) => t.id)
  if (turnIds.length === 0) {
    return NextResponse.json({ summary: { total: 0, byType: {} } })
  }

  const { data: corrections, error: correctionsError } = await supabase
    .from('coach_corrections')
    .select('type')
    .in('turn_id', turnIds)

  if (correctionsError) return NextResponse.json({ error: correctionsError.message }, { status: 500 })

  const byType: Record<string, number> = {}
  for (const c of corrections ?? []) {
    byType[c.type] = (byType[c.type] ?? 0) + 1
  }

  return NextResponse.json({ summary: { total: corrections?.length ?? 0, byType } })
}
