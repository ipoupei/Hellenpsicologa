import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'

export async function POST() {
  const supabase = supabaseServer()

  try {
    await supabase.auth.signOut()
  } catch (error) {
    console.error('Error signing out:', error)
  }

  redirect('/studio/login')
}