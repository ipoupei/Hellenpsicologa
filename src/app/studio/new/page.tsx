'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import RichTextEditor from '@/components/blog/RichTextEditor'
import ImageUploader from '@/components/blog/ImageUploader'
import AIAssistant from '@/components/blog/AIAssistant'
import { savePost } from '@/lib/actions/posts'
import { generateSlug } from '@/lib/markdown'

export default function NewPostPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content_html: '',
    seo_title: '',
    seo_description: '',
    canonical_url: '',
    status: 'published',
    published_at: '',
    cover_path: '',
    tags: '',
  })

  const updateField = (field: string, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value }

      // Auto-generate slug when title changes
      if (field === 'title' && value && !prev.slug) {
        updated.slug = generateSlug(value)
      }

      return updated
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const formDataObj = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value)
    })

    startTransition(async () => {
      const result = await savePost(formDataObj)

      if (result.error) {
        setError(result.error)
      } else if (result.post) {
        router.push('/studio')
      }
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Novo Post</h1>
        <p className="text-gray-600 mt-2">Crie um novo post para o blog</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="text-red-700">{error}</div>
          </div>
        )}

        {/* Basic Information */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Informações Básicas</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Título *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                Slug (URL)
              </label>
              <input
                type="text"
                id="slug"
                value={formData.slug}
                onChange={(e) => updateField('slug', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="slug-do-post"
              />
              <p className="text-sm text-gray-500 mt-1">
                URL do post: /blog/{formData.slug || 'slug-do-post'}
              </p>
            </div>

            <div>
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
                Resumo
              </label>
              <textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => updateField('summary', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Breve descrição do post..."
              />
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                value={formData.tags}
                onChange={(e) => updateField('tags', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="ansiedade, autoestima, relacionamentos"
              />
              <p className="text-sm text-gray-500 mt-1">
                Separe as tags com vírgulas
              </p>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Imagem de Capa</h2>

          {formData.cover_path ? (
            <div className="space-y-4">
              <img
                src={formData.cover_path}
                alt="Capa do post"
                className="max-w-md h-48 object-cover rounded-lg border border-gray-200"
              />
              <div className="flex space-x-2">
                <ImageUploader
                  onUpload={(url) => updateField('cover_path', url)}
                />
                <button
                  type="button"
                  onClick={() => updateField('cover_path', '')}
                  className="px-3 py-2 text-sm text-red-600 hover:text-red-700"
                >
                  Remover
                </button>
              </div>
            </div>
          ) : (
            <ImageUploader
              onUpload={(url) => updateField('cover_path', url)}
            />
          )}
        </div>

        {/* AI Assistant */}
        <AIAssistant
          content={formData.content_html}
          onTitleGenerated={(title) => updateField('title', title)}
          onSummaryGenerated={(summary) => updateField('summary', summary)}
          onTagsGenerated={(tags) => updateField('tags', tags)}
          onArticleGenerated={(article) => updateField('content_html', article)}
        />

        {/* Content */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Conteúdo *</h2>
          <RichTextEditor
            value={formData.content_html}
            onChange={(value) => updateField('content_html', value)}
            placeholder="Digite o conteúdo do post com formatação rica..."
          />
        </div>

        {/* SEO */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">SEO (Opcional)</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="seo_title" className="block text-sm font-medium text-gray-700 mb-2">
                Título SEO
              </label>
              <input
                type="text"
                id="seo_title"
                value={formData.seo_title}
                onChange={(e) => updateField('seo_title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Deixe vazio para usar o título do post"
              />
            </div>

            <div>
              <label htmlFor="seo_description" className="block text-sm font-medium text-gray-700 mb-2">
                Descrição SEO
              </label>
              <textarea
                id="seo_description"
                value={formData.seo_description}
                onChange={(e) => updateField('seo_description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="Deixe vazio para usar o resumo do post"
              />
            </div>

            <div>
              <label htmlFor="canonical_url" className="block text-sm font-medium text-gray-700 mb-2">
                URL Canônica
              </label>
              <input
                type="url"
                id="canonical_url"
                value={formData.canonical_url}
                onChange={(e) => updateField('canonical_url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                placeholder="https://exemplo.com/post-original"
              />
            </div>
          </div>
        </div>

        {/* Publishing - Sempre publicado */}
        <input type="hidden" name="status" value="published" />

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isPending || !formData.title || !formData.content_html}
            className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Salvando...' : 'Salvar Post'}
          </button>
        </div>
      </form>
    </div>
  )
}