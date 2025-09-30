'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface Tag {
  name: string
  slug: string
}

interface TagFilterProps {
  tags: Tag[]
}

export default function TagFilter({ tags }: TagFilterProps) {
  const searchParams = useSearchParams()
  const currentTag = searchParams.get('tag')

  const createTagUrl = (tagSlug?: string) => {
    const params = new URLSearchParams(searchParams)
    if (tagSlug) {
      params.set('tag', tagSlug)
    } else {
      params.delete('tag')
    }
    params.delete('page') // Reset to first page
    const query = params.toString()
    return `/blog${query ? `?${query}` : ''}`
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Link
        href={createTagUrl()}
        className={`px-3 py-1 rounded-full text-sm transition-colors ${
          !currentTag
            ? 'bg-primary-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Todos
      </Link>

      {tags.map((tag) => (
        <Link
          key={tag.slug}
          href={createTagUrl(tag.slug)}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            currentTag === tag.slug
              ? 'bg-primary-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {tag.name}
        </Link>
      ))}
    </div>
  )
}