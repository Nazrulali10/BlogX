'use client'
import { useSession } from 'next-auth/react'
import React, { createContext, useContext, useEffect, useState } from 'react'

export const AppContext = createContext()
const AppContextProvider = ({children}) => {
  const [showSearch,setShowSearch] = useState(false)
  const [blogs,setBlogs] = useState([])
  const [allUsers,setAllUsers] = useState([])
  const [loading,setLoading] = useState(false)
  const {data:session,status} = useSession()
  const [authUser,setauthUser] = useState(false)

  
  const getBlogs = async()=>{
        try {
          const response = await fetch('/api/blog',{
        method:'GET',
        headers:{ 'Content-Type':'application/json'},
      })
      const data = await response.json()
      
       setBlogs(data.blog)
        } catch (error) {
          console.log(error.message)
        }
      }
      const getUsers = async()=>{
        try {
          const response = await fetch('/api/user',{
        method:'GET',
        headers:{ 'Content-Type':'application/json'},
      })
      const data = await response.json()
      
       setAllUsers(data.users)
        } catch (error) {
          console.log(error.message)
        }
      }


      useEffect(() => {
  if (!authUser || allUsers.length === 0) return;

  const freshUser = allUsers.find(user => user._id === authUser.id || user._id === authUser._id);

  if (freshUser) {
    setauthUser(freshUser); 
  }
}, [allUsers]); 

  useEffect(()=>{
      
      getBlogs()
      getUsers()
  
    },[])
  
      useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
    } else {
      setauthUser(session?.user || null);
      setLoading(false);
    }
  }, [status, session]);

  const value = {showSearch,setShowSearch,blogs,getBlogs,getUsers,allUsers,authUser,setauthUser,loading}
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
export const UseAppContext = ()=>{
  return useContext(AppContext)
}

export default AppContextProvider