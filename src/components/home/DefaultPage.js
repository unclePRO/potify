'use client'
import SongCard from '@/components/ui/SongCard'
import usePlayerStore from '@/store/usePlayerStore'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const recentSongs = [
  {
    vidId: 1,
    title: 'song 1',
    coverArt: '/song-cover.png',
    artist: 'AR rehman',
  },
  {
    vidId: 2,
    title: 'song 2',
    coverArt: '/song-cover.png',
    artist: 'Arnav',
  },
  {
    vidId: 3,
    title: 'song 3',
    coverArt: '/song-cover.png',
    artist: 'aviral',
  }
]

const recentPlaylists = [
  {
    id: 1,
    title: 'playlist1',
    coverArt: '',
    author: '',
    link: '',
  },
  {
    id: 2,
    title: 'playlist2',
    coverArt: '',
    author: '',
    link: '',
  },
  {
    id: 3,
    title: 'playlist3',
    coverArt: '',
    author: '',
    link: '',
  },
]

const HomePage = () => {
  const { status } = useSession();
  const { likedSongs, fetchSongs } = usePlayerStore();

  useEffect(() => {
    if (status === "authenticated") fetchSongs();
  }, [fetchSongs, status]);

  return (
    <div className='flex-1 h-full mt-5 ml-5 mr-5'>
      <div className='flex-col w-full h-1/3'>
        <Link href={"/liked"}>
          <h1 className='font-sans antialiased text-xl font-bold tracking-wide'>Liked Songs</h1>
        </Link>

        <div className='flex h-50 gap-4 overflow overflow-x-auto no-scrollbar'>
          {Object.values(likedSongs).slice(0, 5).map((song) => (
            <SongCard
            key={song.vidId}
            song={song}
            />
          ))}
        </div>
      </div>

      <div className='flex-col w-full h-1/3'>
        <h1 className='font-sans antialiased text-xl font-bold tracking-wide'>Recents</h1>

        <div className='flex h-40 gap-4'>
          {recentSongs.map((song) => (
            <SongCard
              key={song.vidId}
              song={song}
            />
          ))}
        </div>
      </div>

      <div className='flex-col w-full h-1/3'>
        <h1 className='font-sans antialiased text-xl font-bold tracking-wide'>Recent Playlists</h1>

        <div className='flex h-40 gap-4'>
          {recentPlaylists.map((playlist) => (
            <SongCard
              key={playlist.id}
              song={playlist}
            />
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default HomePage