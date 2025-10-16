import connectDB from "@/lib/mongoose";
import Blogs from "@/models/Blog";
import { NextResponse } from "next/server";

export async function POST(Request) {
    try {
        await connectDB()
        const body = await Request.json()
        const {id} = body
        const like = await Blogs.findByIdAndUpdate(id,{$inc:{likes:1}})
        if(like){
            return NextResponse.json({success:true})
        }
        return NextResponse.json({success:false})
    } catch (error) {
        return NextResponse.json({success:false,message:error.message})
    }
}