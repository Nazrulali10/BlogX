
import BlogCard from '@/components/BlogCard'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import FollowButton from '@/components/FollowButton'


async function getUserData(id) {
  const res = await fetch(`${process.env.API_BASE_URL}/api/singleuser/${id}`, {
    cache: 'no-store',
  })
  if (!res.ok) return null
  return res.json()
}

async function getAllBlogs() {
  const res = await fetch(`${process.env.API_BASE_URL}/api/blog`, {
    cache: 'no-store',
  })
  const data =await res.json()

  return data.blog
}

export default async function ProfilePage({ params }) {
  
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const authUser = session.user

  const Author = await getUserData(params.id)
  const allBlogs = await getAllBlogs()

  if (!Author) {
    return <p>User not found.</p>
  }

  const authorBlogs = Author.blogs
    ?.map(blogId => allBlogs.find(blog => blog._id === blogId))
    .filter(Boolean)

  return (
    <div className="min-h-screen w-full mb-20">
      <div className="flex flex-col md:flex-row w-full h-auto p-10 gap-5 md:gap-30 justify-center bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        <div className="flex items-center flex-col">
          <Image
            className="rounded-full h-40 w-40 object-cover"
            src={Author.profilepic || '/avatar.png'}
            width={80}
            height={80}
            alt={Author.name}
          />
          <div className="flex items-center gap-1">
            <p className="text-base">{Author.name}</p>
            <div className={`${Author.badgecolor} rounded-full h-4 w-4`}></div>
          </div>
          <p className="text-sm text-gray-500">@{Author.username}</p>

          {authUser._id !== Author._id && (
            <FollowButton
              myId={authUser._id}
              authorId={Author._id}
              isFollowing={Author.followers.includes(authUser._id)}
            />
          )}
        </div>

        <div className="flex gap-15 items-center">
          <div>
            <p className="text-2xl">Following</p>
            <p>{Author.following.length}</p>
          </div>
          <div>
            <p className="text-2xl">Followers</p>
            <p>{Author.followers.length}</p>
          </div>
        </div>
      </div>

      <div className="flex w-full py-2 justify-center items-center bg-blue-700 mb-5">
        <p className="font-medium text-base text-white">All Blogs</p>
      </div>

      <div className="flex flex-col gap-4">
        {authorBlogs.length > 0 ? (
          authorBlogs.map((blog, i) => (
            <BlogCard key={i} blog={blog} />
          ))
        ) : (
          <p className="text-center text-gray-500">No blogs available.</p>
        )}
      </div>
    </div>
  )
}


