export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          summary: string | null
          content_md: string
          content_html: string
          cover_path: string | null
          status: 'draft' | 'published' | 'scheduled'
          published_at: string | null
          seo_title: string | null
          seo_description: string | null
          canonical_url: string | null
          reading_time_mins: number | null
          author_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          summary?: string | null
          content_md: string
          content_html: string
          cover_path?: string | null
          status?: 'draft' | 'published' | 'scheduled'
          published_at?: string | null
          seo_title?: string | null
          seo_description?: string | null
          canonical_url?: string | null
          reading_time_mins?: number | null
          author_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          summary?: string | null
          content_md?: string
          content_html?: string
          cover_path?: string | null
          status?: 'draft' | 'published' | 'scheduled'
          published_at?: string | null
          seo_title?: string | null
          seo_description?: string | null
          canonical_url?: string | null
          reading_time_mins?: number | null
          author_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
      post_tags: {
        Row: {
          id: string
          post_id: string
          tag_id: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          tag_id: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          tag_id?: string
          created_at?: string
        }
      }
      authors: {
        Row: {
          id: string
          name: string
          email: string
          bio: string | null
          avatar_url: string | null
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          bio?: string | null
          avatar_url?: string | null
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          bio?: string | null
          avatar_url?: string | null
          user_id?: string
          created_at?: string
        }
      }
    }
  }
}