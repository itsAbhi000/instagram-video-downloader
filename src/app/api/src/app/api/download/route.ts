// /src/app/api/download/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getInfo } from '@/lib/fetch'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { url } = body

    if (!url || !url.includes('instagram.com')) {
      return NextResponse.json({ error: 'Invalid Instagram URL' }, { status: 400 })
    }

    const data = await getInfo(url)

    if (!data || !data.videoUrl) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }

    return NextResponse.json({ videoUrl: data.videoUrl })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

