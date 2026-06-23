'use client'
import SongCard from '@/components/ui/SongCard'
import usePlayerStore from '@/store/usePlayerStore'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const recentSongs = [
  {
    id: 1,
    name: 'song 1',
    thumbnail: '/song-cover.png',
    artist: 'AR rehman',
  },
  {
    id: 2,
    name: 'song 2',
    thumbnail: '/song-cover.png',
    artist: 'Arnav',
  },
  {
    id: 3,
    name: 'song 3',
    thumbnail: '/song-cover.png',
    artist: 'aviral',
  }
]

const recentPlaylists = [
  {
    id: 1,
    name: 'playlist1',
    thumbnail: '',
    author: '',
    link: '',
  },
  {
    id: 2,
    name: 'playlist2',
    thumbnail: '',
    author: '',
    link: '',
  },
  {
    id: 3,
    name: 'playlist3',
    thumbnail: '',
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
            cardTitle={song.title}
            cardArtist={song.artist}
            cardThumbnail={song.coverArt}
            />
          ))}
        </div>
      </div>

      <div className='flex-col w-full h-1/3'>
        <h1 className='font-sans antialiased text-xl font-bold tracking-wide'>Recents</h1>

        <div className='flex h-40 gap-4'>
          {recentSongs.map((song) => (
            <SongCard
            key={song.id}
            cardTitle={song.name}
            cardArtist={song.author}
            cardThumbnail={song.thumbnail}
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
            cardTitle={playlist.name}
            cardArtist={playlist.artist}
            cardThumbnail={playlist.thumbnail}
            />
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default HomePage