import Skeleton, { SkeletonTheme } from "react-loading-skeleton";


export default async function loading() {
 

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <div className="min-h-screen w-full mb-20">
      <div className="flex flex-col md:flex-row w-full h-auto p-10 gap-5 md:gap-30 justify-center bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        <div className="flex items-center flex-col">
          <Skeleton circle height={100} width={100}/>
          <div className="flex items-center gap-1">
            <Skeleton height={15} width={100} />
            <Skeleton circle height={15} width={15} />
          </div>
         

           <Skeleton height={15} width={150} />
                      
        </div>

        <div className="flex gap-15 items-center">
          <div>
            <Skeleton height={70} width={180}/>
          </div>
          <div>
            <Skeleton height={70} width={180}/>
          </div>
        </div>
      </div>

      <div className="flex w-full py-2 justify-center items-center bg-blue-700 mb-5">
        <p className="font-medium text-base text-white">All Blogs</p>
      </div>

      <div className="flex flex-col justify-center w-full items-center">
       <Skeleton height={500} width={900}/>
      </div>
    </div>
    </SkeletonTheme>
  )
}


