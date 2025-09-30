'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState(searchParams.get('q') || '')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(() => {
      const params = new URLSearchParams(searchParams)
      if (query) {
        params.set('q', query)
      } else {
        params.delete('q')
      }
      params.delete('page') // Reset to first page

      router.push(`/blog?${params.toString()}`)
    })
  }

  return (
    <form onSubmit={handleSearch} className="relative max-w-md">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar posts..."
        className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        disabled={isPending}
      />
      <button
        type="submit"
        disabled={isPending}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
      >
        {isPending ? (
          <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full" />
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      </button>
    </form>
  )
}