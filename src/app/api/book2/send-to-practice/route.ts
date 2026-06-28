import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { content, type, domain, sectionTitle, domainTitle } = body

  if (!content?.trim()) return NextResponse.json({ error: 'No content' }, { status: 400 })

  const { error } = await supabase.from('practice_items').insert({
    user_id: user.id,
    content: content.trim(),
    type: type ?? 'word',
    source: 'book2',
    source_meta: { domain, sectionTitle, domainTitle },
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
