import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { createServiceClient } from '@/utils/supabase/service'
import { checkInvite, consumeInvite } from '@/utils/supabase/invites'

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url)
  const code = searchParams.get('code')
  const inviteCode = searchParams.get('invite')
  const next = searchParams.get('next') ?? '/dashboard'

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent('Could not sign in with Google. Please try again.')}`)
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent('Could not sign in with Google. Please try again.')}`)
  }

  const service = createServiceClient()
  const { data: existingProfile } = await service
    .from('profiles')
    .select('id')
    .eq('id', data.user.id)
    .single()

  if (existingProfile) {
    // Returning user — already provisioned, let them straight in.
    return NextResponse.redirect(`${origin}${next}`)
  }

  // First-time sign-in for this account: require a valid, matching invite.
  const email = data.user.email ?? ''
  const invite = inviteCode ? await checkInvite(inviteCode, email) : { valid: false as const, reason: 'An invite link is required to sign up.' }

  if (!invite.valid) {
    await supabase.auth.signOut()
    await service.auth.admin.deleteUser(data.user.id)
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(invite.reason)}`)
  }

  await consumeInvite(invite.inviteId, data.user.id)
  await service.from('profiles').upsert({ id: data.user.id, role: invite.role })

  return NextResponse.redirect(`${origin}${next}`)
}
