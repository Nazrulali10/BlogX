import cloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/mongoose";
import Blogs from "@/models/Blog";
import Users from "@/models/User";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    console.log("API /api/blog GET called");
    await connectDB();
    const blog = await Blogs.find({});
    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(error.message);
  }
}


export async function POST(Request) {
  try {
    const formData = await Request.formData();
    const blogDetail = formData.get("BlogData");
    const BlogData = JSON.parse(blogDetail);

    const file = formData.get("BlogImage");
    let result = null;
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "blog_images" }, (err, result) => {
            if (err) return reject(err);
            resolve(result);
          })
          .end(buffer);
      });
    }

    const newBlog = await Blogs.create({
      ...BlogData,
      blogImage: result?.secure_url || null,
    });
    if (newBlog) {
      const updateUser = await Users.findByIdAndUpdate(
        newBlog.author, // 1. user id
        { $push: { blogs: newBlog._id } }, // 2. update operation
        { new: true } // 3. return updated doc (optional)
      );
      console.log(updateUser)

      console.log(newBlog);
      return NextResponse.json({ success: true, message: "Blog posted" });
    } else {
      return NextResponse.json({ success: false, message: "failed to post" });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
