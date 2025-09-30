import { NextResponse } from 'next/server'
import { listPosts } from '@/lib/blog'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function GET() {
  try {
    const { data: posts } = await listPosts({ pageSize: 50 }) // Last 50 posts

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hellen Psicóloga - Blog</title>
    <description>Insights, dicas e reflexões sobre saúde mental, relacionamentos e crescimento pessoal</description>
    <link>${SITE_URL}/blog</link>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>

    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.summary || ''}]]></description>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${post.published_at ? new Date(post.published_at).toUTCString() : new Date().toUTCString()}</pubDate>
      <author>noreply@hellenpsicologa.com (Hellen Psicóloga)</author>
      ${post.post_tags?.map((pt: any) => `<category>${pt.tags.name}</category>`).join('') || ''}
    </item>`
      )
      .join('')}
  </channel>
</rss>`

    return new NextResponse(rss, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error generating RSS:', error)
    return new NextResponse('Error generating RSS', { status: 500 })
  }
}