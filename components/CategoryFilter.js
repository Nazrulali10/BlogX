// import { Category } from '@/assets/Assets'
// import React from 'react'

// const CategoryFilter = ({setCategoryFilter,categoryFilter}) => {
//   return (
//     <div className='flex flex-row md:w-full w-30 justify-center gap-4 md:gap-15 mb-5 cursor-pointer'>
//         {Category.map((category,i)=>(
//             <div className='' key={i}>
//                 <button onClick={()=>setCategoryFilter(category.name)} className={`flex text-sm md:px-4 px-2 py-1 md:py-2 rounded-sm transition duration-300 text-gray-800  hover:bg-blue-700 hover:text-white ${categoryFilter===category.name?'bg-blue-700 text-white':'bg-gray-50 text-gray-800'}`}>{category.name}</button>
//             </div>
//         ))}
//     </div>
//   )
// }

// export default CategoryFilter
import { Category } from '@/assets/Assets';
import React from 'react';

const CategoryFilter = ({ setCategoryFilter, categoryFilter }) => {
  return (
    <div className="w-full">
      {/* Mobile: scrollable */}
      <div className="flex md:hidden overflow-x-auto hide-scrollbar gap-3 px-2 py-2 mb-4">
        {Category.map((category, i) => (
          <button
            key={i}
            onClick={() => setCategoryFilter(category.name)}
            className={`flex-shrink-0 text-sm px-4 py-2 rounded-full transition duration-300 ${
              categoryFilter === category.name
                ? 'bg-blue-700 text-white'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-white hover:bg-blue-600 hover:text-white'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Desktop: full row, no scroll */}
      <div className="hidden md:flex justify-center flex-wrap gap-4 px-4 py-2">
        {Category.map((category, i) => (
          <button
            key={i}
            onClick={() => setCategoryFilter(category.name)}
            className={`text-sm px-4 py-2 rounded-full transition duration-300 ${
              categoryFilter === category.name
                ? 'bg-blue-700 text-white'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-white hover:bg-blue-600 hover:text-white'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
