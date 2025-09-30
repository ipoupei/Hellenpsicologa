'use client'

import { useState, useRef } from 'react'
import { supabaseBrowser } from '@/lib/supabase/browser'

interface ImageUploaderProps {
  onUpload: (url: string) => void
  bucket?: string
  folder?: string
}

export default function ImageUploader({
  onUpload,
  bucket = 'hb-blog',
  folder = 'drafts'
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione apenas arquivos de imagem')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Arquivo muito grande. Tamanho máximo: 5MB')
      return
    }

    setIsUploading(true)
    setError('')

    try {
      const supabase = supabaseBrowser()

      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          upsert: true,
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      onUpload(publicUrl)

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error: any) {
      console.error('Upload error:', error)
      setError(error.message || 'Erro ao fazer upload da imagem')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={isUploading}
        className="hidden"
        id="image-upload"
      />

      <label
        htmlFor="image-upload"
        className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer ${
          isUploading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isUploading ? (
          <>
            <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full" />
            Enviando...
          </>
        ) : (
          <>
            <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Selecionar Imagem
          </>
        )}
      </label>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}