
'use client';
import { CirclePlus, House, UserRoundPen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const BottomNav = () => {
  const router = useRouter();

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden flex items-center justify-around h-14 bg-white dark:bg-gray-950 border-t border-gray-300 dark:border-gray-800`}
    >
      <div
        onClick={() => router.push('/AddBlog')}
        className="hover:text-blue-700 text-gray-400 transition-all duration-300"
      >
        <CirclePlus size={24} absoluteStrokeWidth />
      </div>
      <div
        onClick={() => router.push('/')}
        className="hover:text-blue-700 text-gray-400 transition-all duration-300"
      >
        <House strokeWidth={3} absoluteStrokeWidth  size={24} />
      </div>
      <div
        onClick={() => router.push('/MyProfile')}
        className="hover:text-blue-700 text-gray-400 transition-all duration-300"
      >
        <UserRoundPen size={24} absoluteStrokeWidth />
      </div>
    </div>
  );
};

export default BottomNav;
