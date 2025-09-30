'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'
import { requireAuth, getOrCreateAuthor } from '@/lib/auth'
import { markdownToHtml, generateSlug } from '@/lib/markdown'
import { moveDraftToPublic } from '@/lib/storage'

export async function savePost(formData: FormData) {
  try {
    await requireAuth()
    const author = await getOrCreateAuthor()

    if (!author) {
      throw new Error('Unable to get author information')
    }

    const supabase = supabaseServer()

    const title = formData.get('title') as string
    const summary = formData.get('summary') as string
    const content_html = formData.get('content_html') as string
    const seo_title = formData.get('seo_title') as string
    const seo_description = formData.get('seo_description') as string
    const canonical_url = formData.get('canonical_url') as string
    const status = formData.get('status') as string
    const published_at = formData.get('published_at') as string
    const cover_path = formData.get('cover_path') as string
    const tags = formData.get('tags') as string
    const postId = formData.get('post_id') as string

    // Generate slug from title if creating new post
    let slug = formData.get('slug') as string
    if (!slug && title) {
      slug = generateSlug(title)
    }

    // Calculate reading time from HTML content (remove HTML tags for word count)
    const textContent = content_html.replace(/<[^>]*>/g, '')
    const reading_time_mins = Math.ceil(textContent.split(/\s+/).length / 200)

    // Se status é 'published' e não tem published_at, usar data atual
    const finalPublishedAt = status === 'published'
      ? (published_at || new Date().toISOString())
      : (published_at || null)

    // Prepare post data
    const postData = {
      title,
      slug,
      summary: summary || null,
      content_md: '', // Temporário: campo vazio para manter compatibilidade
      content_html,
      seo_title: seo_title || null,
      seo_description: seo_description || null,
      canonical_url: canonical_url || null,
      status,
      published_at: finalPublishedAt,
      cover_path: cover_path || null,
      reading_time_mins,
      author_id: author.id,
    }

    let savedPost

    if (postId) {
      // Update existing post
      const { data, error } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', postId)
        .eq('author_id', author.id) // Ensure user can only update their own posts
        .select()
        .single()

      if (error) throw error
      savedPost = data
    } else {
      // Create new post
      const { data, error } = await supabase
        .from('posts')
        .insert(postData)
        .select()
        .single()

      if (error) throw error
      savedPost = data
    }

    // Handle tags
    if (tags && savedPost) {
      const tagSlugs = tags.split(',').map(tag => tag.trim()).filter(Boolean)

      if (tagSlugs.length > 0) {
        // First, delete existing post_tags
        await supabase
          .from('post_tags')
          .delete()
          .eq('post_id', savedPost.id)

        // Create tags if they don't exist and get their IDs
        for (const tagSlug of tagSlugs) {
          const tagName = tagSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

          // Upsert tag
          const { data: tag, error: tagError } = await supabase
            .from('tags')
            .upsert(
              { slug: tagSlug, name: tagName },
              { onConflict: 'slug' }
            )
            .select()
            .single()

          if (tagError) {
            console.error('Error upserting tag:', tagError)
            continue
          }

          // Create post_tag relationship
          await supabase
            .from('post_tags')
            .insert({
              post_id: savedPost.id,
              tag_id: tag.id,
            })
        }
      }
    }

    // If publishing, move images from drafts to public
    if (status === 'published' && savedPost.cover_path) {
      const newCoverPath = await moveDraftToPublic(savedPost.cover_path)
      if (newCoverPath !== savedPost.cover_path) {
        await supabase
          .from('posts')
          .update({ cover_path: newCoverPath })
          .eq('id', savedPost.id)
      }
    }

    // Revalidate pages
    if (status === 'published') {
      revalidateTag('blog')
      revalidatePath('/blog')
      revalidatePath(`/blog/${savedPost.slug}`)
    }

    revalidatePath('/studio')

    return { success: true, post: savedPost }
  } catch (error: any) {
    console.error('Error saving post:', error)
    return { error: error.message || 'Erro ao salvar post' }
  }
}

export async function deletePost(postId: string) {
  try {
    await requireAuth()
    const author = await getOrCreateAuthor()

    if (!author) {
      throw new Error('Unable to get author information')
    }

    const supabase = supabaseServer()

    // Delete post (this will cascade delete post_tags due to foreign key constraints)
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId)
      .eq('author_id', author.id) // Ensure user can only delete their own posts

    if (error) throw error

    revalidateTag('blog')
    revalidatePath('/blog')
    revalidatePath('/studio')

    return { success: true }
  } catch (error: any) {
    console.error('Error deleting post:', error)
    return { error: error.message || 'Erro ao deletar post' }
  }
}