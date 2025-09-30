import { supabaseServer } from './supabase/server'

export async function moveDraftToPublic(path: string): Promise<string> {
  if (!path?.startsWith('drafts/')) return path

  const supabase = supabaseServer()
  const dest = path.replace(/^drafts\//, 'public/')

  try {
    const { data: file, error: copyError } = await supabase.storage
      .from('hb-blog')
      .copy(path, dest)

    if (copyError) {
      console.error('Error copying file:', copyError)
      return path
    }

    if (file) {
      const { error: removeError } = await supabase.storage
        .from('hb-blog')
        .remove([path])

      if (removeError) {
        console.error('Error removing draft file:', removeError)
      }
    }

    return dest
  } catch (error) {
    console.error('Error moving file from draft to public:', error)
    return path
  }
}

export async function uploadFile(
  bucket: string,
  file: File,
  path: string
): Promise<{ data: any; error: any }> {
  const supabase = supabaseServer()

  return await supabase.storage
    .from(bucket)
    .upload(path, file, {
      upsert: true,
    })
}

export function getPublicUrl(bucket: string, path: string): string {
  const supabase = supabaseServer()
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}