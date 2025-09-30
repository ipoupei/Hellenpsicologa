'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabaseBrowser } from '@/lib/supabase/browser'
import AuthProtectedPage from '@/components/AuthProtectedPage'

export default function StudioDashboard() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const supabase = supabaseBrowser()

      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Get or create author
      let { data: author } = await supabase
        .from('authors')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (!author) {
        const { data: newAuthor } = await supabase
          .from('authors')
          .insert({
            user_id: user.id,
            email: user.email,
            name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Author'
          })
          .select()
          .single()

        author = newAuthor
      }

      if (author) {
        // Load posts
        const { data: postsData } = await supabase
          .from('posts')
          .select('id, title, slug, status, published_at, created_at, updated_at')
          .eq('author_id', author.id)
          .order('updated_at', { ascending: false })

        setPosts(postsData || [])
      }
    } catch (error) {
      console.error('Error loading posts:', error)
    } finally {
      setLoading(false)
    }
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthProtectedPage>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link href="/studio" className="text-xl font-bold text-gray-900">
                  Studio
                </Link>
                <div className="flex space-x-4">
                  <Link
                    href="/studio"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Posts
                  </Link>
                  <Link
                    href="/studio/new"
                    className="bg-primary-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
                  >
                    Novo Post
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver Site
                </Link>
                <button
                  onClick={async () => {
                    const supabase = supabaseBrowser()
                    await supabase.auth.signOut()
                    window.location.href = '/studio/login'
                  }}
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Studio de Blog</h1>
              <p className="text-xl text-gray-600 mb-8">
                Crie e publique artigos para seu blog de psicologia
              </p>
            </div>

            <Link
              href="/studio/new"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
            >
              ✍️ Criar Novo Post
            </Link>

            {posts.length > 0 && (
              <div className="mt-8">
                <p className="text-gray-500 mb-4">Posts recentes:</p>
                <div className="space-y-2">
                  {posts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex items-center justify-between bg-white px-4 py-2 rounded border">
                      <span className="text-gray-700">{post.title}</span>
                      <div className="flex space-x-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-primary-600 hover:text-primary-900 text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver
                        </Link>
                        <Link
                          href={`/studio/${post.id}`}
                          className="text-primary-600 hover:text-primary-900 text-sm"
                        >
                          Editar
                        </Link>
                      </div>
                    </div>
                  ))}
                  {posts.length > 3 && (
                    <p className="text-gray-400 text-sm">e mais {posts.length - 3} posts...</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </AuthProtectedPage>
  )
}