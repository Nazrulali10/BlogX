'use client'
import React from 'react'
import LikeBlogCard from './LikeBlogCard'
import { UseAppContext } from '@/context/AppContext'


const MostLiked = () => {
    const {blogs} = UseAppContext()
  return (
    <div className='mb-4 '>
        <h1 className='text-xl md:text-2xl dark:text-white text-black'>Most Liked</h1>
        <div className='flex gap-4 mt-3 
          
          flex-row 
          
          overflow-x-auto 
          scrollbar-hide 
          md:overflow-visible 
          px-1'>
            {blogs.sort((a,b)=>b.likes-a.likes).slice(0,3).map((likedBlog,i)=>(
        <LikeBlogCard likedBlog={likedBlog} key={i}/>
        
       ))
       }
        </div>
       

    </div>
  )
}

export default MostLiked