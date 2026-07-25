import { createServiceClient } from './service'

type InviteCheckResult =
  | { valid: true; inviteId: string; role: 'user' | 'admin' }
  | { valid: false; reason: string }

export async function checkInvite(code: string, email: string): Promise<InviteCheckResult> {
  const supabase = createServiceClient()

  const { data: invite } = await supabase
    .from('invites')
    .select('id, email, role, used_by')
    .eq('code', code)
    .single()

  if (!invite) return { valid: false, reason: 'This invite link is invalid.' }
  if (invite.used_by) return { valid: false, reason: 'This invite link has already been used.' }
  if (invite.email.toLowerCase() !== email.toLowerCase()) {
    return { valid: false, reason: 'This invite was issued for a different email address.' }
  }

  return { valid: true, inviteId: invite.id as string, role: invite.role === 'admin' ? 'admin' : 'user' }
}

export async function consumeInvite(inviteId: string, userId: string) {
  const supabase = createServiceClient()
  await supabase.from('invites').update({ used_by: userId, used_at: new Date().toISOString() }).eq('id', inviteId)
}
