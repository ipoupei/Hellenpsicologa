import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

// This should be called by Supabase webhooks or server actions
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')
    const tag = searchParams.get('tag')
    const secret = searchParams.get('secret')

    // Verify secret (optional security measure)
    if (secret && secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    if (path) {
      revalidatePath(path)
      return NextResponse.json({
        revalidated: true,
        path,
        now: Date.now()
      })
    }

    if (tag) {
      revalidateTag(tag)
      return NextResponse.json({
        revalidated: true,
        tag,
        now: Date.now()
      })
    }

    return NextResponse.json({
      message: 'Missing path or tag parameter'
    }, { status: 400 })

  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({
      message: 'Error revalidating',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Optional: Allow GET requests for manual revalidation during development
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ message: 'Not allowed in production' }, { status: 405 })
  }

  return POST(request)
}