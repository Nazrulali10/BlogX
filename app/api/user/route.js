
import connectDB from "@/lib/mongoose";
import Users from "@/models/User";


import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    console.log("API /api/users GET called"); 
    await connectDB();
    const users = await Users.find({});
    return NextResponse.json({success:true , users});
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(error.message);
  }
}