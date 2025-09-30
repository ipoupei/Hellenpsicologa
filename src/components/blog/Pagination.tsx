'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath?: string
}

export default function Pagination({ currentPage, totalPages, basePath = '/blog' }: PaginationProps) {
  const searchParams = useSearchParams()

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams)
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }
    const query = params.toString()
    return `${basePath}${query ? `?${query}` : ''}`
  }

  if (totalPages <= 1) return null

  const showPages = []
  const delta = 2

  for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
    showPages.push(i)
  }

  return (
    <nav className="flex justify-center items-center gap-2 mt-8">
      {currentPage > 1 && (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Anterior
        </Link>
      )}

      {showPages[0] > 1 && (
        <>
          <Link
            href={createPageUrl(1)}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            1
          </Link>
          {showPages[0] > 2 && <span className="px-2">...</span>}
        </>
      )}

      {showPages.map((page) => (
        <Link
          key={page}
          href={createPageUrl(page)}
          className={`px-3 py-2 border rounded-lg transition-colors ${
            page === currentPage
              ? 'bg-primary-500 text-white border-primary-500'
              : 'bg-white border-gray-300 hover:bg-gray-50'
          }`}
        >
          {page}
        </Link>
      ))}

      {showPages[showPages.length - 1] < totalPages && (
        <>
          {showPages[showPages.length - 1] < totalPages - 1 && <span className="px-2">...</span>}
          <Link
            href={createPageUrl(totalPages)}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Próxima
        </Link>
      )}
    </nav>
  )
}