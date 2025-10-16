import { NextResponse } from 'next/server'
import Blogs from '@/models/Blog'
import connectDB from '@/lib/mongoose'


export async function GET(Request,{ params }) {
  const { id } = await params
  console.log('📥 Incoming GET /api/blog/[id] with ID:', id)

  try {
    await connectDB()

    const blog = await Blogs.findById(id).populate('author');

    if (!blog) {
      console.warn('❌ Blog not found for ID:', id)
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, blog }, { status: 200 })
  } catch (error) {
    console.error('❌ Error fetching blog by ID:', error)
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
