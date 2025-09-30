import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPostBySlug, listPosts } from '@/lib/blog'
import { generatePostJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function generateStaticParams() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return []
    }
    const { data: posts } = await listPosts({ pageSize: 100 })
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.warn('Failed to generate static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post não encontrado',
    }
  }

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.summary || undefined,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.summary || undefined,
      type: 'article',
      publishedTime: post.published_at || undefined,
      images: post.cover_path ? [{ url: post.cover_path }] : undefined,
    },
    alternates: {
      canonical: post.canonical_url || `${SITE_URL}/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const postJsonLd = generatePostJsonLd(post, SITE_URL)
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Início', url: SITE_URL },
    { name: 'Blog', url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="hp_section">
        <div className="hp_container">
          {/* Breadcrumb */}
          <nav className="hp_breadcrumb hp_mb-6">
            <Link href="/" className="hp_link">Início</Link>
            <span className="hp_mx-2">→</span>
            <Link href="/blog" className="hp_link">Blog</Link>
            <span className="hp_mx-2">→</span>
            <span className="hp_text">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="hp_mb-8">
            <div className="hp_mb-4">
              {post.post_tags?.map((postTag: any) => (
                <Link
                  key={postTag.tags.slug}
                  href={`/tag/${postTag.tags.slug}`}
                  className="hp_badge hp_badge--primary hp_mr-2"
                >
                  {postTag.tags.name}
                </Link>
              ))}
            </div>

            <h1 className="hp_heading hp_mb-4">
              {post.title}
            </h1>

            {post.summary && (
              <p className="hp_lead hp_muted hp_mb-6">{post.summary}</p>
            )}

            <div className="hp_meta hp_mb-6">
              {post.published_at && (
                <time dateTime={post.published_at} className="hp_text hp_small hp_muted">
                  {formatDate(post.published_at)}
                </time>
              )}
              {post.reading_time_mins && (
                <span className="hp_text hp_small hp_muted">{post.reading_time_mins} min de leitura</span>
              )}
            </div>

            {post.cover_path && (
              <div className="hp_image-container hp_mb-8">
                <Image
                  src={post.cover_path}
                  alt={post.title}
                  fill
                  className="object-cover"
                  style={{borderRadius: 'var(--hp-radius-lg)'}}
                />
              </div>
            )}
          </header>

          {/* Content */}
          <div className="hp_prose hp_mb-8">
            <div
              className="hp_content"
              dangerouslySetInnerHTML={{ __html: post.content_html }}
            />
          </div>

          {/* CTA */}
          <div className="hp_cta_bar">
            <div className="hp_center">
              <h3 className="hp_subheading hp_mb-4">
                Pronto para começar seu processo?
              </h3>
              <p className="hp_text hp_muted hp_mb-6">
                Se este artigo ressoou com você, que tal darmos o próximo passo juntos?
              </p>
              <Link
                href="/contact"
                className="hp_btn hp_btn--primary hp_btn--lg"
              >
                Agendar primeira conversa
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}