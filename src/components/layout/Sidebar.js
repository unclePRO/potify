'use client'
import { useSession } from 'next-auth/react'
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
]

const Sidebar = () => {
  const { data: session } = useSession();

  const [ imageError, setImageError ] = useState(false);

  if (session)
    return (
      <aside className='hidden md:flex pt-4 w-16 rounded bg-potify-surface'>
        <div className='flex-1 '>
          {playlists.map((playlist) => {
            return (
              <div key={playlist.id} className='ml-1 mb-3'>
                <button className='rounded-md object-cover shadow-lg bg-potify-surface hover:scale-110 transition transform active:scale-95'>
                  <Image
                    src={imageError ? playlist.thumbnail : '/song-cover.png'}
                    alt='playlist cover'
                    width={28}
                    height={28}
                    className='h-14 w-auto rounded'
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

  else 
    return (
      <aside className='hidden md:flex left-0 top-16 bottom-20 w-16 h-screen rounded bg-potify-surface'>
        <div className='flex-1 '>
          <p style={{ writingMode: 'vertical-lr', textOrientation: 'mixed' }} className='text-[40px] font-bold tracking-widest uppercase bg-gradient-to-t from-gray-500 via-white-500 bg-[length:auto_200%] bg-clip-text text-transparent animate-shimmer whitespace-nowrap -rotate-180'>.......Log in to see playlists</p>
        </div>
      </aside>
  )
}

export default Sidebar