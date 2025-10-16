
'use client'
import { UseAppContext } from '@/context/AppContext'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const LikeBlogCard = ({ likedBlog }) => {
    const { allUsers } = UseAppContext()
    const Author = allUsers.find((a) => a._id === likedBlog.author)
    const router = useRouter()

    return (
        <div
            onClick={() => router.push(`/Blogdetail/${likedBlog._id}`)}
            className='flex flex-col w-full rounded-xl p-3 bg-gray-50 dark:bg-gray-900 gap-3 cursor-pointer'
        >
            <div className='flex gap-1'>
                <div className='flex-1'>
                    <p className='line-clamp-3 text-sm text-left text-gray-800 dark:text-white'>
                        {likedBlog.blogDescription}
                    </p>
                </div>

                <div className='relative w-24 h-24 flex-shrink-0'>
                    <Image
                        src={likedBlog.blogImage || '/avatar.png'}
                        alt="Blog"
                       fill
                        className='object-cover rounded-md'
                    />
                </div>
            </div>

            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <div className='w-10 h-10 relative'>
                        <Image
                            src={Author?.profilepic || '/avatar.png'}
                            alt={Author?.name || "author"}
                            fill
                            className='object-cover rounded-full'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-blue-700 dark:text-blue-500 text-sm font-medium'>{Author?.name}</p>
                        <p className='text-gray-500 text-xs'>@{Author?.username}</p>
                    </div>
                </div>

                <div className='flex items-center text-red-400 text-sm gap-1'>
                    <Heart size={18} />
                    <p>{likedBlog.likes}</p>
                </div>
            </div>
        </div>
    )
}

export default LikeBlogCard
