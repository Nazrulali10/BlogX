'use client'
import { UseAppContext } from '@/context/AppContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const SearchList = ({allUsers}) => {
  const router = useRouter()
  const {showSearch} = UseAppContext()
  const [searchUser,setsearchUser] = useState([])
  const [filteredUsers,setFilteredUsers] = useState([])

  const handleChange = (e) =>{
    setsearchUser(e.target.value)
    setFilteredUsers(allUsers.filter((user)=>user.username.includes(searchUser)))
  }

  return (
    <div className={`w-full  flex rounded-lg justify-center overflow-hidden p-5  transition-all duration-500 ease-in-out ${showSearch ? 'max-h-[300px] opacity-100 mt-4 mb-2 md:mb-10' : 'max-h-0 opacity-0'}`}>
    <div className='w-full md:w-[60%] flex flex-col gap-5'>
      <div className='w-full flex flex-col justify-center px-2 md:px-30'>
         <input onChange={handleChange} className='w-full bg-gray-50 dark:bg-gray-900   caret-blue-700  px-5 py-3 outline-none border text-sm border-gray-500 dark:border-white text-black dark:text-white' type='text' placeholder='Search Authors' required/>
        
         <div className={`flex flex-col w-full mt-2 overflow-y-auto ${searchUser && filteredUsers.length > 0 ? 'max-h-48' : ''}`}>

          {(searchUser)?
          filteredUsers.map((author,i)=>(
            <div onClick={()=>router.push(`/Profile/${author._id}`)} className='flex w-full bg-gray-50 dark:bg-gray-900  gap-2 border border-gray-300 items-center px-4 py-1 text-black dark:text-white' key={i}>
              <Image className='rounded-full w-12 h-12 object-cover' src={author.profilepic ||'/avatar.png'} alt={author.name} width={25} height={25}/>
              <div className='flex flex-col'>
                <p className='text-sm'>{author.name}</p>
              <p className='text-sm text-gray-400'>@{author.username}</p>
                </div>
              
              
            </div>
          ))
          :null
          }
        </div>
      </div>
       
        
    </div>
    </div>
  )
}

export default SearchList