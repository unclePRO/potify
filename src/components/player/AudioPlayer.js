'use client';
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import ProgressBar from './ProgressBar';

const dummyTrack = {
  title: "Bohemian Rhapsody",
  artist: "Queen",
  thumbnail: "https://i.ytimg.com/vi/bR-gZQLO26w/hqdefault.jpg",
  duration: 180,
  streamUrl: "",
}
const AudioPlayer = () => {
  const [imageError, setImageError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(355);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || !isFinite(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleScrub = (e) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
    
  };

  return (
    <footer className="fixed flex bottom-0 left-0 w-full h-20 bg-potify-void border-t border-potify-hover z-50 justify-between">

      <audio 
        ref={audioRef} 
        src="/api/stream?id=fJ9rUzIMcZQ" 
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
      />
        
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
          
          <ProgressBar
            PBcurrentTime={currentTime}
            PBduration={duration}
            onScrub={handleScrub}
          />
          
          <div className='flex w-full items-center justify-between gap-3 text-[10px] text-potify-muted'>
              <div className='justify-start text-[10px]'>{formatTime(currentTime)}</div>

              <div className='flex gap-5'>
                  <button className='opacity-70 hover:opacity-100 hover:scale-110 transition transform active:scale-95'>
                    <Image
                    src='/shuffle-button.png'
                    alt="prev button"
                    width={15}
                    height={15}
                    className='h-auto'/>
                  </button>
                  <button className='opacity-70 hover:opacity-100 hover:scale-110 transition transform active:scale-95'>
                    <Image
                    src='/prev-button.png'
                    alt="prev button"
                    width={15}
                    height={15}
                    className='h-auto'/>
                  </button>

                  <button onClick={togglePlay} className='opacity-70 hover:opacity-100 hover:scale-110 transition transform active:scale-95'>
                    {!isPlaying ?
                    <Image
                      src='/play-button.png'
                      alt="prev button"
                      width={15}
                      height={15}
                      className='h-auto'/> :
                      
                    <Image
                      src='/pause-button.png'
                      alt="pause button button"
                      width={15}
                      height={15}
                      className='h-auto'/>
                    }
                    
                  </button>
                  <button className='opacity-70 hover:opacity-100 hover:scale-110 transition transform active:scale-95'>
                    <Image
                    src='/next-button.png'
                    alt="prev button"
                    width={15}
                    height={15}
                    className='h-auto'/>
                  </button>
                  <button className='opacity-70 hover:opacity-100 hover:scale-110 transition transform active:scale-95'>
                    <Image
                    src='/loop-button.png'
                    alt="prev button"
                    width={15}
                    height={15}
                    className='h-auto'/>
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