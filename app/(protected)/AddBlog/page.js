'use client'
import { Category } from '@/assets/Assets'
import { UseAppContext } from '@/context/AppContext'

import { CirclePlus } from 'lucide-react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'


const AddPost = () => {
  const {authUser} = UseAppContext()
  const [blogTitle,setBlogTitle] = useState('')
  const [category,setCategory] = useState('')
  const [blogDescription,setBlogDescription] = useState('')
  const [blogImage,setBlogImage] = useState('')
  const [imagePreview,setImagePreview] = useState('')
  const [isPosting,setIsPosting] = useState(false)
  const router = useRouter()
  const onImageChange = (e)=>{
    const file = e.target.files[0];
  if (file) {
    setBlogImage(file); 
    setImagePreview(URL.createObjectURL(file)); 
  }
  }

  
  const handleSubmit = async(e) =>{
    try {
      e.preventDefault()

      console.log(blogImage)
      if(!blogTitle || !category || !blogDescription || !blogImage ){
        return toast.error('Fill All Fields')
      }
      setIsPosting(true)
      const formData = new FormData()
      const BlogData = {
        blogTitle,
        category,
        blogDescription,
        author:authUser.id
      }
      formData.append('BlogData',JSON.stringify(BlogData))
      formData.append('BlogImage',blogImage)
      const response = await fetch('/api/blog',{
        method:'POST',
        body:formData
      })
      const data = await response.json()
      if(data.success){
        setIsPosting(false)
        router.push('/')
        toast.success(data.message)
          return
        
        
      }
      else{
        setIsPosting(false)
         return toast.error(data.message)
         
      }
    } catch (error) {
      setIsPosting(false)
      return toast.error(error.message)
    }
    finally{
      setIsPosting(false)
    }
  }

  return (
    <div className='flex w-full justify-start md:justify-center bg-gray-50 dark:bg-gray-950 min-h-screen mb-10'>
      <div className='flex flex-col w-90 md:w-150 gap-4 py-10 items-center'>
        <div className='w-full flex justify-center font-bold mb-5'>
          <h1 className='text-blue-700 dark:text-blue-600 text-3xl'>Add New Blog</h1>
        </div>
      <label className='flex w-full justify-center' htmlFor='addpic'>
        <input onChange={onImageChange } id='addpic' className='hidden' type='file' accept='image/*'/>
        <div className='relative border-2 border-blue-700  rounded-md px-5 py-5 w-60 h-60 md:w-30 md:h-30 flex flex-col items-center justify-center' >
          {
            blogImage?
            <Image src={imagePreview} alt='preview' fill  />:
            <div className='flex flex-col items-center'>
            <CirclePlus className='text-blue-700'/>
            <p className='text-sm text-black dark:text-white'>Add picture</p>
            </div>
          }
          
          
          
        </div>
      </label>
      <div className='w-80 md:w-120 flex flex-col gap-4 dark:text-white text-black'>
        <input onChange={(e)=>setBlogTitle(e.target.value)} className='border caret-blue-700 px-4 py-2 w-full outline-none text-semibold' placeholder='Blog Title' type='text'/>
        <textarea onChange={(e)=>setBlogDescription(e.target.value)} className='border w-full p-5 outline-none caret-blue-700' placeholder='Type here...' rows={6}/>
        <select onChange={(e)=>setCategory(e.target.value)} className='border w-full px-2 py-2' >
          <option className='dark:bg-gray-900'  value=''>Select Category</option>
            {Category.map((c,i)=>(
                <option className='dark:bg-gray-900'  value={c.name} key={i}>{c.name}</option>
            ))}
            
        </select>
      </div>
      
        <div className='w-full flex justify-center'>
          <button disabled={isPosting} onClick={handleSubmit} className={`${isPosting?'bg-blue-800':'bg-blue-700'} rounded-xl  text-white px-3 py-1 w-24`}>{isPosting?'Posting':'Post'}</button>
        </div>
    </div>
    </div>
    
  )
}

export default AddPost