"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const AuthProfBox = ({ Author }) => {
  const router = useRouter();

  return (
    <div>
      {!Author ? (
        <p>nooooo</p>
      ) : (
        <div onClick={() => router.push(`/Profile/${Author._id}`)}>
        
        <div
          
          className="flex flex-col w-full h-40 bg-indigo-100 dark:bg-blue-950 items-center relative"
        ></div>
        <div className="flex flex-col justify-center items-center -mt-22">
          <div className='relative h-40 w-40  cursor-pointer flex '>
        <Image className=' rounded-full object-cover' fill src={Author.profilepic ||'/avatar.png'} alt={Author.name} />
        </div>
        <div className='flex items-center gap-2 cursor-pointer text-black dark:text-white'><p className='text-xl font-medium'>{Author.name}</p> <div className={`${Author.badgecolor} rounded-full h-4 w-4 pt-1`}></div></div>
        <p className='text-gray-500 text-sm cursor-pointer'>@{Author.username}</p>
        </div>
        </div>

      )}
    </div>
  );
};

export default AuthProfBox;
