'use client'

import { useState } from 'react'

interface AIAssistantProps {
  content: string
  onTitleGenerated: (title: string) => void
  onSummaryGenerated: (summary: string) => void
  onTagsGenerated: (tags: string) => void
  onArticleGenerated: (article: string) => void
}

export default function AIAssistant({
  content,
  onTitleGenerated,
  onSummaryGenerated,
  onTagsGenerated,
  onArticleGenerated
}: AIAssistantProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const [showTitleOptions, setShowTitleOptions] = useState<string[]>([])

  const generateContent = async (type: 'title' | 'summary' | 'tags' | 'article') => {
    if (!content || content.replace(/<[^>]*>/g, '').trim().length < 50) {
      alert('Por favor, escreva pelo menos um parágrafo no conteúdo antes de usar a IA.')
      return
    }

    setLoading(type)

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          type,
        }),
      })

      // Check if response is JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Erro interno do servidor. Verifique se a API Key da OpenAI está configurada.')
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao gerar conteúdo')
      }

      switch (type) {
        case 'title':
          const titleOptions = data.content.split('\n').filter((t: string) => t.trim())
          setShowTitleOptions(titleOptions)
          break
        case 'summary':
          onSummaryGenerated(data.content)
          break
        case 'tags':
          onTagsGenerated(data.content)
          break
        case 'article':
          onArticleGenerated(data.content)
          break
      }
    } catch (error: any) {
      console.error('Erro:', error)
      const typeText = type === 'title' ? 'título' : type === 'summary' ? 'resumo' : type === 'tags' ? 'tags' : 'artigo'
      alert(`Erro ao gerar ${typeText}: ${error.message}`)
    } finally {
      setLoading(null)
    }
  }

  const selectTitle = (title: string) => {
    onTitleGenerated(title)
    setShowTitleOptions([])
  }

  const isContentReady = content && content.replace(/<[^>]*>/g, '').trim().length >= 50

  return (
    <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
      <div className="flex items-center mb-3">
        <span className="text-lg mr-2">🤖</span>
        <h3 className="font-medium text-purple-800">Assistente IA</h3>
      </div>

      <p className="text-sm text-purple-600 mb-4">
        {isContentReady
          ? 'Use a IA para gerar sugestões baseadas no seu conteúdo:'
          : 'Escreva pelo menos um parágrafo no conteúdo para usar a IA.'
        }
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => generateContent('title')}
          disabled={!isContentReady || loading === 'title'}
          className="flex items-center px-3 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'title' ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Gerando...
            </>
          ) : (
            <>
              ✨ Gerar Títulos
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => generateContent('summary')}
          disabled={!isContentReady || loading === 'summary'}
          className="flex items-center px-3 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'summary' ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Gerando...
            </>
          ) : (
            <>
              📝 Gerar Resumo
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => generateContent('tags')}
          disabled={!isContentReady || loading === 'tags'}
          className="flex items-center px-3 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'tags' ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Gerando...
            </>
          ) : (
            <>
              🏷️ Gerar Tags
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => generateContent('article')}
          disabled={!isContentReady || loading === 'article'}
          className="flex items-center px-3 py-2 text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'article' ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Gerando artigo...
            </>
          ) : (
            <>
              📝 Gerar Artigo Completo
            </>
          )}
        </button>
      </div>

      {/* Title Options Modal */}
      {showTitleOptions.length > 0 && (
        <div className="mt-4 p-4 bg-white border border-purple-200 rounded-md">
          <h4 className="font-medium text-purple-800 mb-3">Escolha um título:</h4>
          <div className="space-y-2">
            {showTitleOptions.map((title, index) => (
              <button
                key={index}
                type="button"
                onClick={() => selectTitle(title)}
                className="w-full text-left p-3 border border-gray-200 rounded-md hover:bg-purple-50 hover:border-purple-300 transition-colors"
              >
                {title}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowTitleOptions([])}
            className="mt-3 text-sm text-gray-500 hover:text-gray-700"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  )
}