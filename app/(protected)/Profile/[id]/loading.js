// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";


// export default async function loading() {
 

//   return (
//     <SkeletonTheme baseColor="#202020" highlightColor="#444">
//     <div className="min-h-screen w-full mb-20">
//       <div className="flex flex-col md:flex-row w-full h-auto p-10 gap-5 md:gap-30 justify-center bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
//         <div className="flex items-center flex-col">
//           <Skeleton circle height={100} width={100}/>
//           <div className="flex items-center gap-1">
//             <Skeleton height={15} width={100} />
//             <Skeleton circle height={15} width={15} />
//           </div>
         

//            <Skeleton height={15} width={150} />
                      
//         </div>

//         <div className="flex gap-15 items-center">
//           <div>
//             <Skeleton height={70} width={180}/>
//           </div>
//           <div>
//             <Skeleton height={70} width={180}/>
//           </div>
//         </div>
//       </div>

//       <div className="flex w-full py-2 justify-center items-center bg-blue-700 mb-5">
//         <p className="font-medium text-base text-white">All Blogs</p>
//       </div>

//       <div className="flex flex-col justify-center w-full items-center">
//        <Skeleton height={500} width={900}/>
//       </div>
//     </div>
//     </SkeletonTheme>
//   )
// }


import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default async function Loading() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="min-h-screen w-full mb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row w-full h-auto p-6 md:p-10 gap-5 md:gap-20 justify-center bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
          {/* Profile Info */}
          <div className="flex items-center flex-col">
            <Skeleton circle height={120} width={120} />
            <div className="flex items-center gap-1 mt-2">
              <Skeleton height={12} width={80} />
              <Skeleton circle height={12} width={12} />
            </div>
            <Skeleton height={12} width={120} className="mt-2" />
          </div>

          {/* Stats Section */}
          <div className="flex md:flex-row gap-4 md:gap-10 items-center md:mt-0">
            <Skeleton height={50} width={150} />
            <Skeleton height={50} width={150} />
          </div>
        </div>

        {/* Section Title */}
        <div className="flex w-full py-2 justify-center items-center bg-blue-700 mb-5">
          <p className="font-medium text-base text-white">All Blogs</p>
        </div>

        {/* Blog Skeletons */}
        <div className="flex flex-col justify-center w-full items-center px-4 md:px-0">
          {/* Make width responsive */}
          <div className="w-full max-w-[900px]">
            <Skeleton height={300} className="w-full md:h-[500px]" />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
