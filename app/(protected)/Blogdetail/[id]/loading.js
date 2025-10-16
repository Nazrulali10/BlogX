'use client'

import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const Loading = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="flex flex-col bg-gray-50 dark:bg-gray-900 min-h-screen">
      
        <div className="flex flex-col w-full h-40 bg-indigo-100 dark:bg-blue-950 items-center relative" />
        
        <div className="flex flex-col justify-center items-center -mt-22">
          <div className="relative h-40 w-40 flex justify-center items-center">
            <Skeleton circle height={180} width={180} />
          </div>

          <div className="flex flex-col items-center mt-5">
            <div className="flex items-center gap-2">
              <Skeleton height={15} width={100} />
              <Skeleton circle height={15} width={15} />
            </div>
            <Skeleton height={15} width={100} className="mt-2" />
          </div>
        </div>

       
        <div className="flex flex-col mt-8 gap-4 mb-10 items-center w-full px-4">
          <div className="w-full max-w-[800px]">
            <Skeleton height={50} width="100%" />
          </div>
          <div className="w-full max-w-[800px]">
            <Skeleton height={450} width="100%" />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  )
}

export default Loading
