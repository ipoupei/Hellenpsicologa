import { supabaseServer } from './supabase/server'
import { Database } from '@/types/database'

type Author = Database['public']['Tables']['authors']['Row']

export async function getUser() {
  const supabase = supabaseServer()

  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return null
    }

    return user
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

export async function getOrCreateAuthor(): Promise<Author | null> {
  const supabase = supabaseServer()
  const user = await getUser()

  if (!user) {
    return null
  }

  try {
    // First try to get existing author
    const { data: existingAuthor, error: fetchError } = await supabase
      .from('authors')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (existingAuthor && !fetchError) {
      return existingAuthor
    }

    // Create new author if doesn't exist
    const { data: newAuthor, error: createError } = await supabase
      .from('authors')
      .insert({
        user_id: user.id,
        email: user.email || '',
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Author',
        bio: null,
        avatar_url: user.user_metadata?.avatar_url || null,
      })
      .select()
      .single()

    if (createError) {
      console.error('Error creating author:', createError)
      return null
    }

    return newAuthor
  } catch (error) {
    console.error('Error in getOrCreateAuthor:', error)
    return null
  }
}

export async function requireAuth() {
  const user = await getUser()
  if (!user) {
    throw new Error('Authentication required')
  }
  return user
}