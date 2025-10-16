import connectDB from "@/lib/mongoose";
import Users from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { id, name } = body;

    if (!id || !name) {
      return NextResponse.json({ success: false, message: "Missing id or name" }, { status: 400 });
    }

    const user = await Users.findByIdAndUpdate(id, { name }, { new: true });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
