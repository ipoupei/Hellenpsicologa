import Link from 'next/link'
import Image from 'next/image'

interface PostCardProps {
  post: any
}

export default function PostCard({ post }: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <article className="hp_card">
      {post.cover_path && (
        <div className="hp_card__image">
          <Image
            src={post.cover_path}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="hp_card__body">
        <div className="hp_mb-3">
          {post.post_tags?.slice(0, 2).map((postTag: any) => (
            <Link
              key={postTag.tags.slug}
              href={`/tag/${postTag.tags.slug}`}
              className="hp_badge hp_badge--primary hp_mr-2"
            >
              {postTag.tags.name}
            </Link>
          ))}
        </div>

        <h3 className="hp_card__title hp_mb-3">
          <Link
            href={`/blog/${post.slug}`}
            className="hp_link"
          >
            {post.title}
          </Link>
        </h3>

        {post.summary && (
          <p className="hp_text hp_muted hp_mb-4">{post.summary}</p>
        )}

        <div className="hp_card__meta">
          <time dateTime={post.published_at || ''} className="hp_text hp_small hp_muted">
            {post.published_at && formatDate(post.published_at)}
          </time>
          {post.reading_time_mins && (
            <span className="hp_text hp_small hp_muted">{post.reading_time_mins} min de leitura</span>
          )}
        </div>
      </div>
    </article>
  )
}