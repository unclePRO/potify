import usePlayerStore from '@/store/usePlayerStore'
import Image from 'next/image'
import React from 'react'

const SongCard = ({ song }) => {
  const { playSong } = usePlayerStore();

  return (
    <div 
      className='group w-30 h-54 rounded object-cover shrink-0'>
          <div className='grid place-items-center mb-1'>
              <Image
                  src={song.coverArt || '/song-cover.png'}
                  alt='thumbnail'
                  width={120}
                  height={120}
                  priority
                  className='col-start-1 row-start-1 w-30 h-30 group-hover:opacity-50 opacity-100 object-cover transition transition-all duration-300 rounded'
              />
              <button onClick={() => playSong(song)}
                  className='z-10 col-start-1 row-start-1'>
                  <Image
                      src={'/play-button.png'}
                      alt='play'
                      width={10}
                      height={10}
                      className='h-10 w-10 group-hover:opacity-100 opacity-0 transition transition-all duration-300'/>
              </button>
          </div>
          <p className='truncate text-[15px]'>{song.title}</p>
          <p className='truncate text-[13px] opacity-50'>{song.artist}</p>
    </div>
  )
}

export default SongCard