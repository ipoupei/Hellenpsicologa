import { notFound } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'
import { requireAuth, getOrCreateAuthor } from '@/lib/auth'
import EditPostForm from './EditPostForm'

async function getPost(id: string, authorId: string) {
  const supabase = supabaseServer()

  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      post_tags(
        tags(
          name,
          slug
        )
      )
    `)
    .eq('id', id)
    .eq('author_id', authorId) // Ensure user can only edit their own posts
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }

  return data
}

export default async function EditPostPage({ params }: { params: { id: string } }) {
  await requireAuth()
  const author = await getOrCreateAuthor()

  if (!author) {
    throw new Error('Unable to get author information')
  }

  const post = await getPost(params.id, author.id)

  if (!post) {
    notFound()
  }

  // Extract tags
  const tags = post.post_tags?.map((pt: any) => pt.tags.slug).join(', ') || ''

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Editar Post</h1>
        <p className="text-gray-600 mt-2">
          Editando: <strong>{post.title}</strong>
        </p>
      </div>

      <EditPostForm post={post} tags={tags} />
    </div>
  )
}