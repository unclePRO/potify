'use client'
import Image from 'next/image'
import React from 'react'

const SongList = ({ listName, listAuthor, listCover, songsList }) => {
  return (
    <div className='mr-4'>
        <div className='flex w-full h-40 gap-10 bg-potify-surface'>
            <Image
             src={listCover}
             alt='ok'
             width={100}
             height={100}
             className='h-auto w-auto rounded-md object-cover'/>
            <div className='flex-1'>
                <p className='text-[40px] mt-4'>{listName}</p>
                <p className='text-xl'>{listAuthor}</p>
                <p className='text-xs'>{songsList.length} songs</p>
            </div>
        </div>


        <div className='mt-4 grid grid-cols-[50px_minmax(0,2fr)_minmax(0,2fr)_1fr_50px_10px] opacity-30'>
            <p className='truncate'>S.no</p>
            <p className='truncate'>Title</p>
            <p className='truncate'>Artist</p>
            <p className='truncate'>Duration</p>
            <p className='truncate'>cover</p>
        </div>
        <div className='w-full h-[1px] bg-gray-500 opacity-30'></div>

        {songsList.map((song, index) => {
            return (
                <div key={song.id} className='grid grid-cols-[50px_minmax(0,2fr)_minmax(0,2fr)_1fr_50px] py-2'>
                    <p className='truncate'>{index + 1}.</p>
                    <p className='truncate'>{song.title}</p>
                    <p className='truncate'>{song.artist}</p>
                    <p className='truncate'>{song.duration}</p>
                    <Image
                        src={song.coverArt || '/song-cover.png'}
                        alt=''
                        width={20}
                        height={20}
                        className='h-auto w-auto rounded object-cover'
                        onError={(e) => e.target.src = '/song-cover.png'}
                        />
                </div>
        )})}
    </div>
  )
}

export default SongList