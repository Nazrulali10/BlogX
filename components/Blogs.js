
'use client'

import React, { useEffect } from 'react'
import BlogCard from './BlogCard'
import { UseAppContext } from '@/context/AppContext'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const Blogs = ({ mainFilter, categoryFilter }) => {
  const { blogs, getBlogs, authUser } = UseAppContext()

  useEffect(() => {
    getBlogs()
  }, [])

  const FollowingBlog =
    authUser?.following?.length > 0
      ? blogs.filter((b) => authUser.following.includes(b.author))
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
         
          <SkeletonTheme>
            <div className='flex flex-col'>
              <div className='flex gap-2'>
                <Skeleton circle height={15} width={15}/>
                 <Skeleton height={15} width={100}/>
              </div>
              <Skeleton width={300} height={300}/>
            </div>
          </SkeletonTheme>
         
        )
      ) : (
        <div>
          {FollowingBlog.length > 0 ? (
            FollowingBlog.map((blog, i) => (
              <BlogCard key={i} blog={blog} />
            ))
          ) : (
            <p className='flex justify-center text-black dark:text-white'>
              No blogs from people you follow yet.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default Blogs

