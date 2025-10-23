
// 'use client'

// import React, { useEffect } from 'react'
// import BlogCard from './BlogCard'
// import { UseAppContext } from '@/context/AppContext'
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

// const Blogs = ({ mainFilter, categoryFilter }) => {
//   const { blogs, getBlogs, authUser } = UseAppContext()

//   useEffect(() => {
//     getBlogs()
//   }, [])

//   const FollowingBlog =
//     authUser?.following?.length > 0
//       ? blogs.filter((b) => authUser.following.includes(b.author))
//       : []

//   return (
//     <div className='flex flex-col gap-5 min-h-screen'>
//       {mainFilter === 'All' ? (
//         blogs.length > 0 ? (
//           blogs
//             .filter(
//               (b) => categoryFilter === 'All' || b.category === categoryFilter
//             )
//             .map((blog, i) => <BlogCard key={i} blog={blog} />)
//         ) : (
         
//           <SkeletonTheme>
//             <div className='flex flex-col'>
//               <div className='flex gap-2'>
//                 <Skeleton circle height={15} width={15}/>
//                  <Skeleton height={15} width={100}/>
//               </div>
//               <Skeleton width={300} height={300}/>
//             </div>
//           </SkeletonTheme>
         
//         )
//       ) : (
//         <div>
//           {FollowingBlog.length > 0 ? (
//             FollowingBlog.map((blog, i) => (
//               <BlogCard key={i} blog={blog} />
//             ))
//           ) : (
//             <p className='flex justify-center text-black dark:text-white'>
//               No blogs from people you follow yet.
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// export default Blogs

'use client'

import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import { UseAppContext } from '@/context/AppContext'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Blogs = ({ mainFilter, categoryFilter }) => {
  const { blogs, getBlogs, authUser } = UseAppContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await getBlogs()
      setLoading(false)
    }
    fetchData()
  }, [])

  const FollowingBlog =
    authUser?.following?.length > 0
      ? blogs.filter((b) => authUser.following.includes(b.author))
      : []

  return (
    <div className='flex flex-col gap-5 min-h-screen'>
      {loading ? (
        // 👇 Skeleton placeholder while loading
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          {[...Array(3)].map((_, i) => (
            <div key={i} className='flex flex-col gap-3 p-4 border-b'>
              <div className='flex gap-3 items-center'>
                <Skeleton circle height={40} width={40} />
                <Skeleton height={20} width={120} />
              </div>
              <Skeleton height={200} width={'100%'} />
              <Skeleton height={20} width={'80%'} />
            </div>
          ))}
        </SkeletonTheme>
      ) : mainFilter === 'All' ? (
        blogs.length > 0 ? (
          blogs
            .filter(
              (b) => categoryFilter === 'All' || b.category === categoryFilter
            )
            .map((blog, i) => <BlogCard key={i} blog={blog} />)
        ) : (
          <p className='flex justify-center text-black dark:text-white'>
            No blogs posted yet.
          </p>
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
