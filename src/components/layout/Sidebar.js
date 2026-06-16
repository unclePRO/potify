'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const playlists = [
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

const Sidebar = () => {
  const [ imageError, setImageError ] = useState(false);

  return (
    <aside className='fixed left-0 top-16 bottom-20 w-16 h-screen rounded bg-potify-surface'>
      <div className='flex-1 '>
        {playlists.map((playlist) => {
          return (
            <div key={playlist.id} className='ml-1 mb-3'>
              <button className='rounded-md object-cover shadow-lg bg-potify-surface hover:scale-110 transition transform active:scale-95'>
                <Image
                  src={imageError ? playlist.thumbnail : '/song-cover.png'}
                  alt='playlist cover'
                  width={48}
                  height={28}
                  className='h-auto rounded'
                  onError={()=> setImageError(true)}
                />
              </button>
              {playlist.name}
            </div>
          )
        })}
      </div>
    </aside>
  )
}

export default Sidebar