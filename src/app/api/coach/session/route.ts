import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const mode = body.mode === 'scenario' ? 'scenario' : 'free'
  const scenarioType = mode === 'scenario' ? (body.scenarioType ?? null) : null

  const { data, error } = await supabase
    .from('coach_sessions')
    .insert({ user_id: user.id, mode, scenario_type: scenarioType })
    .select('id')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ sessionId: data.id })
}
