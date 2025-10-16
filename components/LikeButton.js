'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { toast } from 'react-toastify'

const LikeButton = ({blogId,initialLikes}) => {
    const [likes, setLikes] = useState(initialLikes);
    const handlelike = async()=>{
      try {
        const response = await fetch('/api/like',{method:'POST',body:JSON.stringify({id:blogId})})
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
    
        <div className="flex w-full justify-center">
          <button onClick={(e)=>{e.stopPropagation(); handlelike()}} className="flex w-64 text-sm gap-1 border border-red-400 text-red-400 py-2 justify-center hover:bg-red-400 hover:text-white transition-colors duration-300 cursor-pointer">
            <Heart size={20} /> {likes}
          </button>
        </div>
    
  )
}

export default LikeButton