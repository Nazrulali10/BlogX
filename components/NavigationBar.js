'use client'
import { UseAppContext } from "@/context/AppContext";
import { lexend } from "@/fonts/Font";
import { CirclePlus, Search, UserRoundPen } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";


const NavigationBar = () => {
  const {setShowSearch,showSearch,authUser,setauthUser} = UseAppContext()
  const router = useRouter()
  const logout = async()=>{
    
     const result = await signOut('credentials', {
          redirect: false
        })
        setauthUser(false)
    
        if (result.ok) {
          toast.success('Logged out successfully')
          router.push('/LoginPage') 
        } else {
          toast.error('error')
        }
  }
  const handleSearch = ()=>{
    router.push('/')
    setShowSearch(!showSearch)
  }
  if(authUser){
    return (
    <>
    <div
      className={`${lexend.className}  relative md:flex hidden items-center justify-between w-full h-16 bg-white dark:bg-gray-950 border-b border-b-gray-400 dark:border-b-gray-800 px-25 py-4`}
    >
      <Link href={'/'} ><h1 className="font-bold text-blue-700 dark:text-blue-500 text-2xl">BlogX</h1></Link>
      <div className="flex gap-4 ">{authUser && 
      <button onClick={logout} className="px-4 py-2 bg-blue-700 text-white rounded-full text-xs hover:bg-blue-800 transition-colors duration-300">
          Logout
        </button>
        }
        
        
         <div onClick={()=>router.push('/AddBlog')} className=" hover:text-blue-700 text-gray-400 transition-all duration-300">
        <CirclePlus />
       </div>
        <div onClick={handleSearch} className={`${showSearch?'text-blue-700':'text-gray-400'} hover:text-blue-700 transition-all duration-300`}>
           <Search />
        </div>
       <div onClick={()=>router.push('/MyProfile')} className=" hover:text-blue-700 text-gray-400 transition-all duration-300">
        <UserRoundPen />
       </div>
        
      </div>
    </div>
    {authUser &&
    <div className="flex md:hidden justify-between w-full h-16 bg-white dark:bg-gray-950 border-b border-b-gray-400 dark:border-b-gray-800 px-8 py-4">
      <Link href={'/'} ><h1 className="font-bold text-blue-700 dark:text-blue-600 text-2xl">BlogX</h1></Link>
      <div>
        <div onClick={handleSearch} className={`${showSearch?'text-blue-700':'text-gray-400'} hover:text-blue-700 transition-all duration-300`}>
           <Search />
        </div>
      </div>
    </div>}
    </>
  );
  }
  
};

export default NavigationBar;
