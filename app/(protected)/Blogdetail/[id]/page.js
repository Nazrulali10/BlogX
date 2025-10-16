
import Image from "next/image";
import LikeButton from "@/components/LikeButton";
import AuthProfBox from "@/components/AuthProfBox";

export const dynamic = "force-dynamic";

export default async function BlogDetail({ params }) {



  let blog = null;
  let Author = {
    name: "Unknown Author",
    profilepic: "/avatar.png",
  };
  let date = new Date();

  try {
    const { id } = params; 

 

    const apiURL = `${process.env.API_BASE_URL}/api/singleblog/${id}`;
    

    const res = await fetch(apiURL, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();



    if (!data.success) {
      
      return <div>Blog not found</div>;
    }

    blog = data.blog;
    Author = blog.author || Author;
    date = new Date(blog.createdAt || Date.now());
    console.log(Author)

  } catch (error) {
    console.error("❌ Error during fetch:", error);
    return <div>Error loading blog</div>;
  }

  return (
    <div className="flex flex-col bg-gray-50 dark:bg-gray-900 mb-20">
      <AuthProfBox Author={Author} />

      <div className="flex flex-col mt-8 gap-4 mb-10">
        <div className="w-full px-2 md:px-30 gap-4 flex flex-col items-center">
          <h1 className="text-3xl text-black dark:text-white">
            {blog.blogTitle || "Untitled Blog"}
          </h1>
          <p className="flex text-gray-600 dark:text-gray-300 text-base">
            {blog.blogDescription || "No description available."}
          </p>
        </div>

        {blog.blogImage && (
          <div className="flex flex-col justify-center items-center object-contain w-full gap-4 mt-5">
            <Image
              className="flex"
              src={blog.blogImage}
              width={600}
              height={250}
              alt={Author.name}
            />
          </div>
        )}

        <LikeButton blogId={blog._id} initialLikes={blog.likes || 0} />

        <div className="w-full flex justify-end px-10">
          <p className="text-sm text-gray-400">
            {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
