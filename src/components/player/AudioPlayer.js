'use client';
import Image from 'next/image'
import React, { useState } from 'react'

const dummyTrack = {
  title: "Killer Queen - Remastered 2011",
  artist: "Queen",
  thumbnail: "https://i.ytimg.com/vi/bR-gZQLO26w/hqdefault.jpg",
  duration: 180,
  streamUrl: "",
}
const AudioPlayer = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <footer className="fixed flex bottom-0 left-0 w-full h-20 bg-potify-void border-t border-potify-hover z-50 justify-between">
        
        {/* LEFT PART */}
        <div className='flex items-center h-full pl-4 w-1/3 justify-start'> 
            <Image
              src={imageError ? '/song-cover.png' : dummyTrack.thumbnail}
              alt='song cover'
              width={64}
              height={64}
              className='w-16 h-16 mr-4 rounded-md object-cover shadow-lg bg-potify-surface'
              onError={() => setImageError(true)}  
            />
            
            <div className='flex-1'>
                <h2 className='truncate font-bold text-base'>{dummyTrack.title.slice(0,50)}</h2>
                <p className='truncate text-xs'>{dummyTrack.artist.slice(0,50)}</p>
            </div>
        </div>

        {/* MIDDLE PART */}
        <div className="w-1/3 flex flex-col items-center justify-center">
          <div className='bg-neutral-600 h-0.5 w-full rounded-full mb-[20px]'>
            <div className='h-full bg-stone-200 w-[34%]'></div>
          </div>
          
          <div className='flex w-full items-center justify-between gap-3 text-[10px] text-potify-muted'>
              <div className='justify-start text-[10px]'>00:00</div>

              <div className='flex gap-5'>
                  <button className='opacity-70 hover:opacity-100 hover:scale-110 transition transform active:scale-95'>
                    <Image
                    src='/shuffle-button.png'
                    alt="prev button"
                    width={15}
                    height={15}/>
                  </button>
                  <button className='opacity-70 hover:opacity-100 hover:scale-110 transition transform active:scale-95'>
                    <Image
                    src='/prev-button.png'
                    alt="prev button"
                    width={15}
                    height={15}/>
                  </button>
                  <button className='opacity-70 hover:opacity-100 hover:scale-110 transition transform active:scale-95'>
                    <Image
                    src='/play-button.png'
                    alt="prev button"
                    width={15}
                    height={15}/>
                  </button>
                  <button className='opacity-70 hover:opacity-100 hover:scale-110 transition transform active:scale-95'>
                    <Image
                    src='/next-button.png'
                    alt="prev button"
                    width={15}
                    height={15}/>
                  </button>
                  <button className='opacity-70 hover:opacity-100 hover:scale-110 transition transform active:scale-95'>
                    <Image
                    src='/loop-button.png'
                    alt="prev button"
                    width={15}
                    height={15}/>
                  </button>
                  </div>
              
              <div className='justify-end text-[10px]'>00:00</div>
            </div>
        </div>

        {/* RIGHT PART */}
        <div className="w-1/3 flex items-center justify-end">
        
        </div>
        
    </footer>
  )
}

export default AudioPlayer