'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'

export default function FollowButton({ myId, authorId, isFollowing }) {
  const [localIsFollowing, setLocalIsFollowing] = useState(isFollowing)

  const handleFollow = async () => {
    try {
      const res = await fetch(`/api/follow/${authorId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ myid: myId }),
      })

      const data = await res.json()

      if (data.success) {
        toast.success(data.message)
        setLocalIsFollowing(prev => !prev)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <button
      onClick={handleFollow}
      className="text-black dark:text-white text-sm border dark:border-white px-2 py-1 rounded-lg hover:bg-gray-800 dark:hover:bg-white dark:hover:text-gray-950 hover:text-white"
    >
      {localIsFollowing ? 'Following' : 'Follow'}
    </button>
  )
}
