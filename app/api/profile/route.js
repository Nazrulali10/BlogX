import cloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/mongoose";
import Users from "@/models/User";

import { NextResponse } from "next/server";

export async function POST(Request) {
    try {
        await connectDB()
        const formData = await Request.formData();
    const id = formData.get("id");
    const profilepic = formData.get("profilepic");

        let result = null;
            if (profilepic) {
              const arrayBuffer = await profilepic.arrayBuffer();
              const buffer = Buffer.from(arrayBuffer);
        
              result = await new Promise((resolve, reject) => {
                cloudinary.uploader
                  .upload_stream({ folder: "profile_imgs" }, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                  })
                  .end(buffer);
              });
            }
        const updateProfile = await Users.findByIdAndUpdate(id,{$set:{profilepic:result?.secure_url}})
        if(updateProfile){
            return NextResponse.json({success:true})
        }
        return NextResponse.json({success:false,message:'error in uploading'})
    } catch (error) {
        return NextResponse.json({success:false,message:error.message})
    }
}