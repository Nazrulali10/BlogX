"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UseAppContext } from "@/context/AppContext";
import { toast } from "react-toastify";

const BlogCard = ({ blog }) => {
  const {allUsers} = UseAppContext()
  const [likes, setLikes] = useState(blog?.likes>0?blog.likes:0);
  const router = useRouter();
  const Author = allUsers.find((author) => author._id === blog.author);
  const date = new Date(blog.createdAt);
  const handlelike = async()=>{
    try {
      const response = await fetch('/api/like',{method:'POST',body:JSON.stringify({id:blog._id})})
      const data = await response.json()
      if(data.success){
        setLikes((prev) => prev + 1);
        return console.log('like success')
      }
      return console.log('like failed')
    } catch (error) {
      toast.error(error.message)
    }

  }
  return (
    <div>
      {!Author ? null : (
        <div
          onClick={() => router.push(`/Blogdetail/${blog._id}`)}
          className="relative flex flex-col bg-gray-50 dark:bg-gray-900 p-5 gap-5 cursor-pointer"
        >
          <div className="flex justify-between w-full">
            <div className="flex gap-2 p-2">
            <div className="relative h-15 w-15 flex">
              <Image
                className="rounded-full object-cover "
                src={Author.profilepic || '/avatar.png'}
                fill
                alt={Author.name}
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-blue-700 dark:text-blue-500 text-base font-medium ">
                {Author.name}
              </p>
              <p className="text-gray-500 text-sm ">@{Author.username}</p>
            </div>
          </div>
          <div className="p-3">
          

<p className="text-sm text-gray-400">
  {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
</p>

          
          </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 items-center">
              <h1 className="text-xl text-black dark:text-white">{blog.blogTitle}</h1>
              <p className="line-clamp-3 text-gray-600 dark:text-gray-300 text-sm">
                {blog.blogDescription}
              </p>
            </div>
            {blog.blogImage && 
            <div className="flex justify-center items-center object-contain w-full">
              <Image
                className="min-w-80 max-w-120 "
                src={blog.blogImage}
                width={380}
                height={350}
                alt={Author.name}
              />
            </div>}
            

            <div className="flex w-full justify-center ">
              <button onClick={(e)=>{e.stopPropagation(); handlelike()}} className="flex gap-1 border border-red-400 text-red-400 text-sm py-2 px-4 hover:bg-red-400 hover:text-white  transition-colors duration-300 cursor-pointer">
                <Heart size={20} /> {likes}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
