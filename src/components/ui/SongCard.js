import Image from 'next/image'
import React from 'react'

const SongCard = ({ cardTitle, cardThumbnail, cardArtist }) => {
  return (
    <div className='mt-3 w-30'>
        <Image
         src={cardThumbnail || '/song-cover.png'}
         alt='ok'
         width={100}
         height={30}
         className='w-100 h-30 rounded-md object-cover'/>
         <h1 className='mt-2 text-[18px] truncate'>{cardTitle}</h1>
         <h2 className='text-[13px] truncate'>{cardArtist}</h2>
    </div>
  )
}

export default SongCard