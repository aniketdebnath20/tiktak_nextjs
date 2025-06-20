'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Logo from '../../public/ChatGPT Image May 18, 2025, 01_53_52 PM.png';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineLogout } from 'react-icons/ai';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { IUser } from '@/types';
import useAuthStore from '@/store/authStore';
import { createOrGetUser } from '@/utils';

const Navbar = () => {
    const [user, setUser] = useState<IUser | null>();
    const [searchValue, setSearchValue] = useState('');
    const { userProfile, addUser, removeUser } = useAuthStore();
    const router = useRouter()

    useEffect(() => {
        setUser(userProfile);
    }, [userProfile]);

    const handleSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (searchValue) router.push(`/search/${searchValue}`);
    };


    return (

        <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
            <Link href='/'>
                <div className='w-[100px] md:w-[129px] md:h-[66px] h-[60px]'>
                    <Image
                        className='cursor-pointer h-full w-full object-cover'
                        src={Logo}
                        alt='logo'
                    />
                </div>
            </Link>

            <div className='relative hidden md:block'>
                <form
                    onSubmit={handleSearch}
                    className='absolute md:static top-10 -left-20 bg-white'
                >
                    <input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0'
                        placeholder='Search accounts and videos'
                    />
                    <button
                        aria-label='button'
                        onClick={handleSearch}
                        className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'
                    >
                        <BiSearch />
                    </button>
                </form>
            </div>
            <div>
                {user ? (
                    <div className='flex gap-5 md:gap-10'>
                        <Link href='/pages/uploads'>
                            <button aria-label='button'
                                className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                                <IoMdAdd className='text-xl' />{' '}
                                <span className='hidden md:block'>Upload </span>
                            </button>
                        </Link>
                        {user.image && (
                            <Link href={`/profile/${user._id}`}>
                                <div>
                                    <Image
                                        className='rounded-full cursor-pointer'
                                        src={user.image}
                                        alt='user'
                                        width={40}
                                        height={40}
                                    />
                                </div>
                            </Link>
                        )}
                        <button
                            aria-label='button'
                            type='button'
                            className=' border-2 p-2 rounded-full cursor-pointer outline-none shadow-md'
                            onClick={() => {
                                googleLogout();
                                removeUser();
                            }}
                        >
                            <AiOutlineLogout color='red' fontSize={21} />
                        </button>
                    </div>
                ) : (
                    <GoogleLogin
                        onSuccess={(response) => createOrGetUser(response, addUser)}
                        onError={() => console.log('Login Failed')}
                    />
                )}
            </div>
        </div>

    )
}

export default Navbar



