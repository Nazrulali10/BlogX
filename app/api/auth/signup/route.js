import Users from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import connectDB from "@/lib/mongoose";

export async function POST(Request) {
  try {
    await connectDB();
    const formData = await Request.formData();
    const UserDetail = formData.get("UserData");
    const UserData = JSON.parse(UserDetail);
    const { name, username, email, password, badgecolor } = UserData;
    const checkUserName = await Users.findOne({username})
    if(checkUserName){
        return NextResponse.json({message:'this username is already taken'})
    }
    const checkMailId = await Users.findOne({email})
    if(checkMailId){
         return NextResponse.json({message:'User already exists'})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await Users.create({
      name,
      username,
      email,
      password: hashedPassword,
      badgecolor,
      followers: [],
      following: [],
      blogs: [],
      profilepic: "",
    });
    if (user) {
      console.log(user)
      return NextResponse.json({success:true , message:'Signed in Successfully',user})
    }
    else{
      return NextResponse.json({success:false , message:'Signin failed'})
    }
  } catch (error) {
    return NextResponse.json({success:false,message:error.message});
  }
}
