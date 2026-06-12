import Image from 'next/image'
import React from 'react'

const SongList = ({ listName, listAuthor, listCover, songsList }) => {
  return (
    <div className='mr-4'>
        <div className='flex w-full h-40 gap-10'>
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


        <div className='mt-4 grid grid-cols-[50px_minmax(0,2fr)_minmax(0,2fr)_1fr_50px]'>
            <p>S.no</p>
            <p className='truncate'>Title</p>
            <p className='truncate'>Album</p>
            <p>Duration</p>
        </div>
        <div className='w-full h-[1px] bg-white'></div>

        {songsList.map((song) => (
            <div key={song.id}>

            </div>
        ))}
    </div>
  )
}

export default SongList