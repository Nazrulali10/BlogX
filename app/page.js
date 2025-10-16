'use client'
import Blogs from '@/components/Blogs';
import CategoryFilter from '@/components/CategoryFilter';
import MostLiked from '@/components/MostLiked';

import PageSwitch from '@/components/PageSwitch';
import SearchList from '@/components/SearchList';
import { useState } from 'react';


import { outfit } from '@/fonts/Font';



import LoginPage from './LoginPage/page';
import { UseAppContext } from '@/context/AppContext';


export default function Home() {
  
  const [mainFilter,setMainFilter] = useState('All')
  const [categoryFilter,setCategoryFilter] = useState('All')
  const { allUsers,authUser } = UseAppContext()
  

  return (
    <div className={`${outfit.className} min-h-screen w-full bg-white dark:bg-gray-950 mb-20`}>
      {!authUser ?<LoginPage/>:
      <div>
      <SearchList allUsers={allUsers}/>
      <PageSwitch mainFilter={mainFilter} setMainFilter={setMainFilter} />
      {mainFilter==='All' &&
      <div>
        <MostLiked/>
      <CategoryFilter categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}/>
      </div>
      }
      
       <Blogs categoryFilter={categoryFilter} mainFilter={mainFilter}/>
       </div>
      }
    </div>
  );
}
