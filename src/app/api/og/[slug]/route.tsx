import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { getPostBySlug } from '@/lib/blog'

export const runtime = 'edge'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await getPostBySlug(params.slug)

    if (!post) {
      return new Response('Post not found', { status: 404 })
    }

    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #0ea5e9 0%, #d946ef 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui',
            position: 'relative',
          }}
        >
          {/* Butterfly decoration */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              right: '40px',
              fontSize: '60px',
            }}
          >
            🦋
          </div>

          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              maxWidth: '900px',
              padding: '0 40px',
            }}
          >
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '20px',
                lineHeight: '1.1',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              {post.title}
            </h1>

            {post.summary && (
              <p
                style={{
                  fontSize: '24px',
                  color: 'rgba(255,255,255,0.9)',
                  marginBottom: '40px',
                  lineHeight: '1.3',
                  maxWidth: '700px',
                }}
              >
                {post.summary.length > 120
                  ? post.summary.substring(0, 120) + '...'
                  : post.summary}
              </p>
            )}

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '20px',
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              <span>Hellen Psicóloga</span>
              {post.reading_time_mins && (
                <>
                  <span style={{ margin: '0 15px' }}>•</span>
                  <span>{post.reading_time_mins} min de leitura</span>
                </>
              )}
            </div>
          </div>

          {/* Bottom decoration */}
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              left: '40px',
              fontSize: '16px',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            hellenpsicologa.com
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    return new Response('Error generating image', { status: 500 })
  }
}