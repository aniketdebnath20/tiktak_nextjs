'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Video } from '@/types';
import { useSearchParams } from 'next/navigation';
import { BASE_URL } from '@/utils';
import NoResults from '@/components/noResult';
import VideoCard from '@/components/VideoCard';


export default function HomePage() {
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic');

  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        let response;
        if (topic) {
          response = await axios.get(`${BASE_URL}/pages/api/discover/${topic}`);
        } else {
          response = await axios.get(`${BASE_URL}/pages/api/post`);
          console.log(response)
        }
        setVideos(response.data.videos);
      } catch (error) {
        console.error('API fetch error: ', error);
        setError('Could not fetch videos.');
      }
    };

    fetchVideos();
  }, [topic]);

  if (error) {
    return <NoResults text={error} />;
  }

  return (
    <div className="flex flex-col gap-10 h-full">
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard post={video} isShowingOnHome key={video._id} />
        ))
      ) : (
        <NoResults text="No Videos" />
      )}
    </div>
  );
}
