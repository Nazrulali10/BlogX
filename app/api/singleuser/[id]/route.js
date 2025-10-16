

import connectDB from '@/lib/mongoose'
import User from '@/models/User'
import { NextResponse } from 'next/server'

export async function GET(Request, {params}) {
  const { id } = params
  connectDB()
  

  try {
    const user = await User.findById(id)
    if (!user) return NextResponse.json({ message: 'User not found' })
    return NextResponse.json(user)
  } catch (error) {
    NextResponse.json({ message: error.message })
  }
}
