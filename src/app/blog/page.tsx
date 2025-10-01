import { Suspense } from 'react'
import { listPosts, listTags } from '@/lib/blog'
import PostCard from '@/components/blog/PostCard'
import SearchBar from '@/components/blog/SearchBar'
import TagFilter from '@/components/blog/TagFilter'
import Pagination from '@/components/blog/Pagination'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidate every hour

interface BlogPageProps {
  searchParams: {
    page?: string
    q?: string
    tag?: string
  }
}

function LoadingSpinner() {
  return (
    <div className="hp_center hp_py-6">
      <div className="hp_spinner"></div>
    </div>
  )
}

async function BlogContent({ searchParams }: BlogPageProps) {
  const page = parseInt(searchParams.page || '1')
  const pageSize = 12
  const query = searchParams.q || ''
  const tagSlug = searchParams.tag || ''

  const [{ data: posts, count }, tags] = await Promise.all([
    listPosts({ page, pageSize, q: query, tagSlug }),
    listTags(),
  ])

  const totalPages = Math.ceil((count || 0) / pageSize)

  return (
    <>
      {/* Filters */}
      <div className="hp_mb-6 hp_stack">
        <SearchBar />
        <TagFilter tags={tags} />
      </div>

      {/* Results */}
      {posts.length > 0 ? (
        <>
          <div className="hp_grid hp_grid-3 hp_mb-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
          />
        </>
      ) : (
        <div className="hp_center hp_py-6">
          <p className="hp_text hp_muted hp_text-lg">
            {query || tagSlug
              ? 'Nenhum post encontrado com os filtros aplicados.'
              : 'Nenhum post encontrado.'}
          </p>
          {(query || tagSlug) && (
            <a
              href="/blog"
              className="hp_btn hp_btn--ghost hp_mt-4"
            >
              Ver todos os posts
            </a>
          )}
        </div>
      )}
    </>
  )
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  return (
    <div className="hp_section">
      <div className="hp_container">
        {/* Header */}
        <div className="hp_center hp_mb-8">
          <span className="hp_eyebrow">Blog</span>
          <h1 className="hp_heading">
            Blog de Psicologia
          </h1>
          <p className="hp_lead hp_muted">
            Insights, dicas e reflexões sobre saúde mental, relacionamentos e crescimento pessoal
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <BlogContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  )
}