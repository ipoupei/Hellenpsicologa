'use client'

import { useState } from 'react'
import { markdownToHtml } from '@/lib/markdown'
import ImageUploader from './ImageUploader'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = 'Digite o conteúdo do post em Markdown...'
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')

  const insertImage = (url: string) => {
    const imageMarkdown = `\n![Imagem](${url})\n`
    const textarea = document.getElementById('markdown-content') as HTMLTextAreaElement

    if (textarea) {
      const cursorPos = textarea.selectionStart
      const textBefore = value.substring(0, cursorPos)
      const textAfter = value.substring(cursorPos)
      const newValue = textBefore + imageMarkdown + textAfter

      onChange(newValue)

      // Set cursor position after inserted image
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(
          cursorPos + imageMarkdown.length,
          cursorPos + imageMarkdown.length
        )
      }, 0)
    } else {
      onChange(value + imageMarkdown)
    }
  }

  const insertMarkdown = (syntax: string, placeholder: string = '') => {
    const textarea = document.getElementById('markdown-content') as HTMLTextAreaElement

    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = value.substring(start, end)
      const replacement = selectedText || placeholder

      let newValue = value
      let newCursorPos = start

      if (syntax === '**') {
        newValue = value.substring(0, start) + `**${replacement}**` + value.substring(end)
        newCursorPos = start + 2 + replacement.length + 2
      } else if (syntax === '*') {
        newValue = value.substring(0, start) + `*${replacement}*` + value.substring(end)
        newCursorPos = start + 1 + replacement.length + 1
      } else if (syntax === '`') {
        newValue = value.substring(0, start) + `\`${replacement}\`` + value.substring(end)
        newCursorPos = start + 1 + replacement.length + 1
      } else if (syntax.startsWith('#')) {
        const lineStart = value.lastIndexOf('\n', start - 1) + 1
        newValue = value.substring(0, lineStart) + syntax + ' ' + replacement + value.substring(end)
        newCursorPos = lineStart + syntax.length + 1 + replacement.length
      }

      onChange(newValue)

      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(newCursorPos, newCursorPos)
      }, 0)
    }
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Tab buttons */}
            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1 text-sm rounded ${
                activeTab === 'edit'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Editar
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1 text-sm rounded ${
                activeTab === 'preview'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Visualizar
            </button>
          </div>

          {activeTab === 'edit' && (
            <div className="flex items-center space-x-2">
              {/* Formatting buttons */}
              <button
                type="button"
                onClick={() => insertMarkdown('**', 'texto em negrito')}
                className="p-1 text-gray-600 hover:text-gray-900"
                title="Negrito"
              >
                <strong>B</strong>
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('*', 'texto em itálico')}
                className="p-1 text-gray-600 hover:text-gray-900"
                title="Itálico"
              >
                <em>I</em>
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('`', 'código')}
                className="p-1 text-gray-600 hover:text-gray-900 font-mono text-sm"
                title="Código"
              >
                &lt;&gt;
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('#', 'Título')}
                className="p-1 text-gray-600 hover:text-gray-900"
                title="Título"
              >
                H1
              </button>
              <button
                type="button"
                onClick={() => insertMarkdown('##', 'Subtítulo')}
                className="p-1 text-gray-600 hover:text-gray-900"
                title="Subtítulo"
              >
                H2
              </button>

              <div className="border-l border-gray-300 h-6 mx-2" />

              <ImageUploader onUpload={insertImage} />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {activeTab === 'edit' ? (
          <textarea
            id="markdown-content"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-96 p-4 resize-none border-0 focus:ring-0 focus:outline-none font-mono text-sm"
          />
        ) : (
          <div className="h-96 p-4 overflow-y-auto bg-white">
            {value ? (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(value) }}
              />
            ) : (
              <p className="text-gray-500 italic">Nada para visualizar ainda...</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}