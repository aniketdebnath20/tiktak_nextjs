'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { GoVerified } from 'react-icons/go';
import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';
import useAuthStore from '@/store/authStore';
import { BASE_URL } from '@/utils';
import Comments from '@/components/comment';
import LikeButton from '@/components/likeButton';

export default function Detail() {
  const [post, setPost] = useState<any | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [comment, setComment] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // getting id from URL query param
  console.log(id)
  console.log(searchParams)
  const router = useRouter();
  const { userProfile } = useAuthStore();

  const fetchPostDetails = async () => {
    if (id) {
      const res = await fetch(`${BASE_URL}/pages/api/post/${id}`);
      const data = await res.json();
      setPost(data);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [id]);

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      });
      setPost({ ...post, likes: res.data.likes });
    }
  };

  const addComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userProfile && comment) {
      setIsPostingComment(true);
      const res = await axios.put(`${BASE_URL}/pages/api/post/${post._id}`, {
        userId: userProfile._id,
        comment
      });
      setPost({ ...post, comments: res.data.comments });
      setComment('');
      setIsPostingComment(false);
    }
  };

  if (!post) return null;

  return (
    <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center'>
        <div className='opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
          <p className='cursor-pointer' onClick={() => router.back()}>
            <MdOutlineCancel className='text-white text-[35px] hover:opacity-90' />
          </p>
        </div>

        <div className='relative'>
          <div className='lg:h-[100vh] h-[60vh]'>
            <video
              ref={videoRef}
              onClick={onVideoClick}
              loop
              src={post.video.asset.url}
              className='h-full cursor-pointer'
            />
          </div>

          {!isPlaying && (
            <div className='absolute top-[45%] left-[40%] cursor-pointer'>
              <button aria-label='play' onClick={onVideoClick}>
                <BsFillPlayFill className='text-white text-6xl lg:text-8xl' />
              </button>
            </div>
          )}
        </div>

        <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
          <button
            aria-label='mute-toggle'
            onClick={() => setIsVideoMuted(!isVideoMuted)}
          >
            {isVideoMuted ? (
              <HiVolumeOff className='text-white text-3xl lg:text-4xl' />
            ) : (
              <HiVolumeUp className='text-white text-3xl lg:text-4xl' />
            )}
          </button>
        </div>
      </div>

      <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
        <div className='lg:mt-20 mt-10'>
          <Link href={`/profile/${post.postedBy._id}`}>
            <div className='flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer'>
              <Image
                width={60}
                height={60}
                alt='user-profile'
                className='rounded-full'
                src={post.postedBy.image}
              />
              <div>
                <div className='text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center'>
                  {post.postedBy.userName.replace(/\s+/g, '')}
                  <GoVerified className='text-blue-400 text-xl' />
                </div>
                <p className='text-md'>{post.postedBy.userName}</p>
              </div>
            </div>
          </Link>

          <div className='px-10'>
            <p className='text-md text-gray-600'>{post.caption}</p>
          </div>

          <div className='mt-10 px-10'>
            {userProfile && (
              <LikeButton
                likes={post.likes}
                flex='flex'
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>

          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment}
          />
        </div>
      </div>
    </div>
  );
}

