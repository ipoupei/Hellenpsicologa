'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabaseBrowser } from '@/lib/supabase/browser'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const supabase = supabaseBrowser()

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/studio`,
        },
      })

      if (error) {
        setMessage(`Erro: ${error.message}`)
      } else {
        setMessage('Link de acesso enviado para seu email!')
      }
    } catch (error) {
      setMessage('Erro inesperado. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Acesso ao Studio
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Área restrita para administração do blog
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Seu email"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Enviando...' : 'Enviar link de acesso'}
            </button>
          </div>

          {message && (
            <div className={`text-center text-sm ${
              message.includes('Erro') ? 'text-red-600' : 'text-green-600'
            }`}>
              {message}
            </div>
          )}
        </form>

        <div className="text-center">
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-500 text-sm"
          >
            ← Voltar ao site
          </Link>
        </div>
      </div>
    </div>
  )
}