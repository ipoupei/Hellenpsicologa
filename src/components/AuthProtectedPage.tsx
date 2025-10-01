'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabase/browser'
import type { User } from '@supabase/supabase-js'

export default function AuthProtectedPage({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = supabaseBrowser()
        const { data: { user }, error } = await supabase.auth.getUser()

        if (error || !user) {
          router.push('/studio/login')
          return
        }

        setUser(user)
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/studio/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect
  }

  return <>{children}</>
}