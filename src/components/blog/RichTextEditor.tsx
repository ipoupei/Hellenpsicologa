'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

// Importação dinâmica para evitar problemas de SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Digite o conteúdo do post...'
}: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Configuração avançada do toolbar
  const modules = {
    toolbar: [
      // Formatação de texto
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],

      // Estilos de texto
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],

      // Alinhamento e listas
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],

      // Inserções
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],

      // Outros
      ['clean']
    ],
    clipboard: {
      // Permitir colar com formatação
      matchVisual: false,
    }
  }

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'align',
    'list', 'bullet', 'indent',
    'blockquote', 'code-block',
    'link', 'image', 'video'
  ]

  if (!mounted) {
    return (
      <div className="h-96 border border-gray-300 rounded-lg bg-gray-50 animate-pulse flex items-center justify-center">
        <span className="text-gray-500">Carregando editor...</span>
      </div>
    )
  }

  return (
    <div className="rich-text-editor">
      <style jsx global>{`
        .rich-text-editor .ql-toolbar {
          border-top: 1px solid #d1d5db;
          border-left: 1px solid #d1d5db;
          border-right: 1px solid #d1d5db;
          border-radius: 0.5rem 0.5rem 0 0;
          background: #f9fafb;
        }

        .rich-text-editor .ql-container {
          border-bottom: 1px solid #d1d5db;
          border-left: 1px solid #d1d5db;
          border-right: 1px solid #d1d5db;
          border-radius: 0 0 0.5rem 0.5rem;
          font-family: inherit;
          font-size: 16px;
          height: 400px;
        }

        .rich-text-editor .ql-editor {
          min-height: 300px;
          line-height: 1.6;
        }

        .rich-text-editor .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }

        /* Customização das cores */
        .rich-text-editor .ql-picker-options {
          z-index: 1000;
        }

        /* Estilos para o conteúdo */
        .rich-text-editor .ql-editor h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #1f2937;
        }

        .rich-text-editor .ql-editor h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #1f2937;
        }

        .rich-text-editor .ql-editor h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #1f2937;
        }

        .rich-text-editor .ql-editor p {
          margin-bottom: 1rem;
          line-height: 1.7;
        }

        .rich-text-editor .ql-editor blockquote {
          border-left: 4px solid #9C7FC9;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b5b7b;
          background: rgba(156, 127, 201, 0.05);
          padding: 1rem;
          border-radius: 0.5rem;
        }

        .rich-text-editor .ql-editor code {
          background: #f3f4f6;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 0.875rem;
        }

        .rich-text-editor .ql-editor pre {
          background: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .rich-text-editor .ql-editor ul,
        .rich-text-editor .ql-editor ol {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }

        .rich-text-editor .ql-editor li {
          margin-bottom: 0.5rem;
        }

        .rich-text-editor .ql-editor a {
          color: #9C7FC9;
          text-decoration: underline;
        }

        .rich-text-editor .ql-editor a:hover {
          color: #6A4BA3;
        }

        .rich-text-editor .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
      `}</style>

      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  )
}