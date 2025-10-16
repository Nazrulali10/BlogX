'use client'

import { Lock, Mail, ShieldUser, UserRound } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'


const SignupPage = () => {
    const router = useRouter()
   
    const [name,setName] = useState('')
    const [username,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [badgecolor, setbadgecolor] = useState('bg-blue-800'); 

    const UserData = {
        name,
        username,
        email,
        password,
        badgecolor
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!name || !username || !email || !password || !confirmPassword || !badgecolor){
            return toast.error('FIll all the fields')
        }
        if(password!==confirmPassword){
            return toast.error('Password MIsmatch')
        }
        const formData = new FormData()
        formData.append('UserData',JSON.stringify(UserData))
        const response = await fetch('/api/auth/signup',{
            method:'POST',
            body:formData
        })
        const data = await response.json()
        if(data.success){
            toast.success(data.message)
            await signIn('credentials', {
  email,
  password,
  redirect: false,
});
router.push('/');

            return
        }else{
            return toast.error(data.message)        
        }
        
    }
  return (
    <div className='w-full flex justify-center items-center py-10'>
        <form onSubmit={handleSubmit} className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8  bg-white  dark:bg-gray-900 text-black dark:text-white">
            <h1 className="text-gray-900 dark:text-white text-3xl mt-10 font-medium">Signup</h1>
            <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
            <div className='flex flex-col gap-4 mt-5'>
                <div className="flex items-center w-full  bg-white dark:bg-gray-900 border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <UserRound size={18} className='text-gray-400 text-xs' />
                <input onChange={(e)=>setName(e.target.value)} type="text" placeholder="Name" className="bg-transparent text-gray-500 dark:text-white placeholder-gray-500 outline-none text-sm w-full h-full" required />                 
            </div>
            <div className="flex items-center w-full  bg-white dark:bg-gray-900 border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <ShieldUser size={21} className='text-gray-400 text-xs' />
                <input onChange={(e)=>setUserName(e.target.value)} type="text" placeholder="Username" className="bg-transparent text-gray-500 dark:text-white placeholder-gray-500 outline-none text-sm w-full h-full" required />                 
            </div>
            <div className="flex items-center w-full  bg-white dark:bg-gray-900 border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <Mail size={18} className='text-gray-400 text-xs'/>
                <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email id" className="bg-transparent text-gray-500 dark:text-white placeholder-gray-500 outline-none text-sm w-full h-full" required />                 
            </div>
            <div className="flex items-center w-full  bg-white dark:bg-gray-900 border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <Lock size={18} className='text-gray-400 text-xs' />
                <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password" className="bg-transparent text-gray-500 dark:text-white placeholder-gray-500 outline-none text-sm w-full h-full" required />                 
            </div>
        
            <div className="flex items-center  w-full bg-white dark:bg-gray-900 border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                 <Lock size={18} className='text-gray-400 text-xs' />
                <input onChange={(e)=>setConfirmPassword(e.target.value)} type="password" placeholder="confirm password" className="bg-transparent text-gray-500 dark:text-white placeholder-gray-500 outline-none text-sm w-full h-full" required />                 
            </div>
            
  
  <div className="flex items-center gap-3 text-black dark:text-white">
    <p >Choose your Badge</p>
    <select
      value={badgecolor}
      onChange={(e) => setbadgecolor(e.target.value)}
      className="border border-gray-300 text-sm rounded-md px-3 py-2 text-gray-700 dark:text-white"
    >
      <option className='bg-gray-900' value="bg-blue-800">Blue</option>
      <option className='bg-gray-900' value="bg-red-600">Red</option>
      <option className='bg-gray-900' value="bg-green-600">Green</option>
      <option className='bg-gray-900' value="bg-yellow-500">Yellow</option>
      <option className='bg-gray-900' value="bg-purple-500">Purple</option>
    </select>
    
    <span className={`w-4 h-4 rounded-full ${badgecolor} border border-gray-400`} />
  </div>


            </div>
            
            
        
            <button className="mt-4 w-full h-11 rounded-full text-white bg-blue-700 hover:opacity-90 transition-opacity">
                Sign up
            </button>
            <p className="text-gray-500 text-sm mt-3 mb-11">Already have an Account? <Link className="text-blue-700 dark:text-blue-600 hover:bg-blue-800" href="/LoginPage">Log in</Link></p>
        </form>
    </div>
  )
}

export default SignupPage