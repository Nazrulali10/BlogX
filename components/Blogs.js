
'use client'

import React, { useEffect } from 'react'
import BlogCard from './BlogCard'
import { UseAppContext } from '@/context/AppContext'


const Blogs = ({ mainFilter, categoryFilter }) => {

  
  const { blogs,getBlogs,authUser } = UseAppContext()


  useEffect(()=>{

    getBlogs()
  },[])

 

  


  
  const FollowingBlog =
    authUser?.following?.length > 0
      ? authUser.following
          .map((following) => blogs.find((b) => b.author === following))
          .filter(Boolean)
      : []

  return (
    <div className='flex flex-col gap-5 min-h-screen'>
      {mainFilter === 'All' ? (
        blogs.length > 0 ? (
          blogs
            .filter(
              (b) => categoryFilter === 'All' || b.category === categoryFilter
            )
            .map((blog, i) => <BlogCard key={i} blog={blog} />)
        ) : (
          <p className='flex justify-center text-black dark:text-white'>No blogs posted yet.</p>
        )
      ) : (
        <div>
          {FollowingBlog.length > 0 ? (
            FollowingBlog.map((blog, i) => (
              <BlogCard key={i} blog={blog} />
            ))
          ) : (
            <p className='flex justify-center text-black dark:text-white'>No blogs from people you follow yet.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Blogs
