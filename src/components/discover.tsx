import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { topics } from '../utils/constant';
import { useSearchParams } from 'next/navigation';

const Discover: NextPage = () => {
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic');

  const activeTopicStyle = 'xl:border-2 hover:bg-primary xl:border-[#3B82F6] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#3B82F6]';
  const topicStyle = 'xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black';

  return (
    <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Popular Topics
      </p>
      <div className='flex justify-center xl:justify-normal gap-3 flex-wrap'>
        {topics?.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div className={topic === item.name ? activeTopicStyle : topicStyle}>
              <span className='font-bold text-2xl xl:text-md '>
                {item.icon}
              </span>
              <span className={`font-medium text-md hidden xl:block capitalize`}>
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div> 
    </div>
  );
};

export default Discover;