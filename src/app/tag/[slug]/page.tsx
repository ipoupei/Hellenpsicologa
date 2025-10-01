import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { listPosts, getTagBySlug, listTags } from '@/lib/blog'
import PostCard from '@/components/blog/PostCard'
import Pagination from '@/components/blog/Pagination'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function generateStaticParams() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return []
    }
    const tags = await listTags()
    return tags.map((tag) => ({
      slug: tag.slug,
    }))
  } catch (error) {
    console.warn('Failed to generate static params for tags:', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tag = await getTagBySlug(params.slug)

  if (!tag) {
    return {
      title: 'Tag não encontrada',
    }
  }

  return {
    title: `Posts sobre ${tag.name} - Hellen Psicóloga`,
    description: tag.description || `Todos os posts sobre ${tag.name}`,
  }
}

interface TagPageProps {
  params: { slug: string }
  searchParams: { page?: string }
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const tag = await getTagBySlug(params.slug)

  if (!tag) {
    notFound()
  }

  const page = parseInt(searchParams.page || '1')
  const pageSize = 12

  const { data: posts, count } = await listPosts({
    page,
    pageSize,
    tagSlug: params.slug,
  })

  const totalPages = Math.ceil((count || 0) / pageSize)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary-600">Início</Link>
          <span className="mx-2">→</span>
          <Link href="/blog" className="hover:text-primary-600">Blog</Link>
          <span className="mx-2">→</span>
          <span className="text-gray-900">{tag.name}</span>
        </nav>

        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Posts sobre{' '}
            <span className="text-primary-600">{tag.name}</span>
          </h1>
          {tag.description && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              {tag.description}
            </p>
          )}
          <p className="text-gray-500">
            {count} {count === 1 ? 'post encontrado' : 'posts encontrados'}
          </p>
        </header>

        {/* Posts */}
        {posts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath={`/tag/${params.slug}`}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              Nenhum post encontrado para esta tag.
            </p>
            <Link
              href="/blog"
              className="text-primary-600 hover:text-primary-700"
            >
              Ver todos os posts
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}