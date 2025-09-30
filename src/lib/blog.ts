import { supabaseServer } from './supabase/server'
import { Database } from '@/types/database'

type Post = Database['public']['Tables']['posts']['Row']
type Tag = Database['public']['Tables']['tags']['Row']

export interface PostWithTags extends Post {
  post_tags: {
    tags: Pick<Tag, 'name' | 'slug'>
  }[]
}

export interface PostListItem {
  id: string
  title: string
  slug: string
  summary: string | null
  cover_path: string | null
  published_at: string | null
  reading_time_mins: number | null
  post_tags: any[]
}

export interface ListPostsParams {
  page?: number
  pageSize?: number
  q?: string
  tagSlug?: string
}

export interface ListPostsResult {
  data: any[]
  count: number | null
}

export async function listPosts({
  page = 1,
  pageSize = 10,
  q = '',
  tagSlug = ''
}: ListPostsParams = {}): Promise<ListPostsResult> {
  const supabase = supabaseServer()

  let query = supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      summary,
      cover_path,
      published_at,
      reading_time_mins,
      post_tags(
        tags(
          name,
          slug
        )
      )
    `, { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1)

  if (q) {
    query = query.textSearch('tsv', q, { type: 'plain' })
  }

  if (tagSlug) {
    // Para filtrar por tag específica, precisamos usar inner join
    query = supabase
      .from('posts')
      .select(`
        id,
        title,
        slug,
        summary,
        cover_path,
        published_at,
        reading_time_mins,
        post_tags!inner(
          tags!inner(
            name,
            slug
          )
        )
      `, { count: 'exact' })
      .eq('status', 'published')
      .eq('post_tags.tags.slug', tagSlug)
      .order('published_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1)
  }

  const { data, count, error } = await query

  if (error) {
    console.error('Error fetching posts:', error)
    throw error
  }

  return { data: data as any[], count }
}

export async function getPostBySlug(slug: string): Promise<any | null> {
  const supabase = supabaseServer()

  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      summary,
      content_html,
      cover_path,
      published_at,
      seo_title,
      seo_description,
      canonical_url,
      reading_time_mins,
      post_tags(
        tags(
          name,
          slug
        )
      )
    `)
    .eq('status', 'published')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }
    console.error('Error fetching post:', error)
    throw error
  }

  return data as any
}

export async function listTags(): Promise<any[]> {
  const supabase = supabaseServer()

  const { data, error } = await supabase
    .from('tags')
    .select('id, name, slug, description')
    .order('name')

  if (error) {
    console.error('Error fetching tags:', error)
    throw error
  }

  return data ?? []
}

export async function getTagBySlug(slug: string): Promise<any | null> {
  const supabase = supabaseServer()

  const { data, error } = await supabase
    .from('tags')
    .select('id, name, slug, description')
    .eq('slug', slug)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    }
    console.error('Error fetching tag:', error)
    throw error
  }

  return data
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}