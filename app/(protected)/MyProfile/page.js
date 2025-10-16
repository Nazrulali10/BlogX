"use client";

import BlogCard from "@/components/BlogCard";


import { UseAppContext } from "@/context/AppContext";
import useCheckAuth from "@/lib/checkAuth";


import { Pencil } from "lucide-react";
import { signOut } from "next-auth/react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyProfile = () => {
  useCheckAuth()
  const { authUser, blogs, allUsers, setauthUser } = UseAppContext();
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(authUser?.name || "");
  const [isEditingBadge, setIsEditingBadge] = useState(false);
const [badgeColor, setBadgeColor] = useState(authUser?.badgecolor || "");

  const router = useRouter()
  useEffect(() => {
    if (authUser?.name) {
      setNameInput(authUser.name);
    }
  }, [authUser?.name]);


  const logout = async()=>{
      
       const result = await signOut('credentials', {
            redirect: false
          })
          setauthUser(false)
      
          if (result) {
            toast.success('Logged out successfully')
            router.push('/LoginPage') 
          } else {
            toast.error('error')
          }
    }

    const handleUpdateBadgeColor = async () => {
  

  try {
    const response = await fetch("/api/updateBadgeColor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: authUser._id,
        badgecolor: badgeColor,
      }),
    });

    const data = await response.json();
    if (data.success) {
      const updated = allUsers.find((u) => u._id === authUser._id);
      if (updated) setauthUser(updated);
      toast.success("Badge updated!");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setIsEditingBadge(false);
  }
};


  const handleUpdateName = async () => {
    if (!nameInput || nameInput === authUser.name) return;

    try {
      const response = await fetch("/api/updateName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: authUser._id,
          name: nameInput,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Name updated successfully");

     
        const updated = allUsers.find((u) => u._id === authUser._id);
        if (updated) setauthUser(updated);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const uploadProfile = async (e) => {
    try {
      const file = e.target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("id", authUser._id);
        formData.append("profilepic", file);

        const response = await fetch("/api/profile", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (data.success) {
          const updated = allUsers.find((u) => u._id === authUser._id);
          if (updated) setauthUser(updated);
          return toast.success("Profile pic updated");
        }
        return toast.error(data.message);
      }
    } catch (error) {
      return toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!authUser || !allUsers.length) return;
    const updated = allUsers.find((u) => u._id === authUser._id);
    if (updated) {
      setauthUser(updated);
    }
  }, [allUsers]);
  console.log(authUser);

  const authUserBlogData =
    authUser?.blogs?.length > 0
      ? authUser.blogs.map((blogid) =>
          blogs.find((blog) => blog._id === blogid)
        )
      : false;
  const user = allUsers.find((u) => u._id === authUser._id);
  return (
    <div className="flex flex-col bg-gray-50 dark:bg-gray-900 min-h-screen p-2 md:p-10 text-black dark:text-white mb-20">
      <div>
        <div className="flex w-full justify-center">
          <h1 className="text-3xl">My Profile</h1>
        </div>

        <div className="flex md:flex-row flex-col px-4 md:px-40 mt-10 gap-8 md:gap-48">
          <div className="flex flex-col items-center">
            <div className="relative">
              <Image
                className="rounded-full w-50 h-50 object-cover"
                src={authUser?.profilepic || "/avatar.png"}
                alt="."
                width={200}
                height={200}
              />

              <label className="absolute bottom-4 right-4 cursor-pointer">
                <input
                  id="ii"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={uploadProfile}
                />
                <div className="flex items-center justify-center rounded-full border border-blue-600 bg-gray-50 text-blue-700 w-8 h-8 hover:bg-blue-700 hover:text-white transition-colors duration-300">
                  <Pencil size={22} className="p-1" />
                </div>
              </label>
            </div>
            <div className="flex flex-col gap-2">
               <p className="text-gray-600 dark:text-white">@{authUser.username}</p>
            {authUser && 
      <button onClick={logout} className="px-3 py-2 bg-blue-700 text-white rounded-lg text-xs">
          Logout
        </button>
        }
            </div>
           
          </div>

          <div className="flex flex-col gap-3 justify-center">
            <div className="flex gap-15 items-center justify-center">
          <div>
            <p className="text-2xl">Following</p>
            <p>{authUser.following.length}</p>
          </div>
          <div>
            <p className="text-2xl">Followers</p>
            <p>{authUser.followers.length}</p>
          </div>
        </div>
            <div className="flex gap-2 items-center mt-5">
              <p className="text-sm">Name</p>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 text-xs outline-none"
                disabled={!isEditingName}
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onBlur={() => {
                  setIsEditingName(false);
                  handleUpdateName();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setIsEditingName(false);
                    handleUpdateName();
                  }
                }}
              />
              <button
                className="flex items-center justify-center rounded-full border border-blue-600 text-blue-700 w-8 h-8 hover:bg-blue-700 hover:text-white transition-colors duration-300"
                onClick={() => setIsEditingName(true)}
              >
                <Pencil size={22} className="p-1" />
              </button>
            </div>

            <div className="flex gap-2 items-center">
              <p className="text-sm">Account</p>
              <input
                className="border rounded-lg px-3 py-2 text-xs outline-none"
                disabled
                value={authUser.email || ""}
              />
            </div>

           
            <div className="flex flex-col gap-2">
  <div className="flex gap-2 items-center">
    <p className="text-sm">Badge</p>
    <span className={`rounded-full h-4 w-4 border border-gray-400 ${badgeColor}`} />
    
    <button
      onClick={() => setIsEditingBadge(!isEditingBadge)}
      className="flex items-center justify-center rounded-full border border-blue-600 text-blue-700 w-6 h-6 hover:bg-blue-700 hover:text-white transition-colors duration-300"
    >
      <Pencil size={19} className="p-1" />
    </button>
  </div>

  {isEditingBadge && (
    <div className="flex items-center gap-2 mt-1">
      <select
        value={badgeColor}
        onChange={(e) => setBadgeColor(e.target.value)}
        className="border border-gray-300 text-sm rounded-md px-3 py-2 text-gray-700 dark:text-white"
      >
        <option className='bg-gray-900' value="bg-blue-800">Blue</option>
        <option className='bg-gray-900' value="bg-red-600">Red</option>
        <option className='bg-gray-900' value="bg-green-600">Green</option>
        <option className='bg-gray-900' value="bg-yellow-500">Yellow</option>
        <option className='bg-gray-900' value="bg-purple-500">Purple</option>
      </select>

      <button
        onClick={handleUpdateBadgeColor}
        className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
      >
        Save
      </button>
    </div>
  )}
</div>

            
          </div>
        </div>

        <div className="flex w-full py-2 justify-center items-center bg-blue-700 mt-5 mb-5">
          <p className="font-medium text-base text-white">All Blogs</p>
        </div>

        {authUserBlogData.length > 0 ? (
          <div className="flex flex-col gap-4">
            {authUserBlogData.map((blog, i) => (
              <BlogCard key={i} blog={blog} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
