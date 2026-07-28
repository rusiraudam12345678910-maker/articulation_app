import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import VoiceRecorder from './voice-recorder'

export default async function VoicePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-xl font-semibold text-zinc-100 mb-1">Voice Notes</h1>
      <p className="text-sm text-zinc-400 mb-6">Record yourself, see the transcript, and play it back.</p>
      <VoiceRecorder />
    </div>
  )
}
