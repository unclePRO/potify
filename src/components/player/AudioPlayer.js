'use client';
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import ProgressBar from './ProgressBar';
import usePlayerStore from '@/store/usePlayerStore';
import { useSession } from 'next-auth/react';

const AudioPlayer = () => {
  const { data: session } = useSession();
  const [imageError, setImageError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);


  const { currentSong, isPlaying, playSong, togglePlay, likedSongs, toggleLike  } = usePlayerStore();
  const [showAlert, setShowAlert] = useState(false);

  const audioRef = useRef(null);
  React.useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(() => {
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  if (!currentSong) return null;

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
  const handleTogglePlay = () => {
    togglePlay(); 
  };

  const handleLike = async(song) => {
    if (!session) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    await toggleLike(song);
  }

  return (
    <footer>

      <audio 
        ref={audioRef} 
        src={`/api/stream?id=${currentSong.vidId}`}
        onEnded={() => togglePlay()}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
      />

       {showAlert && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-black/60 backdrop-blur-md border border-red-500/50 bg-red-300 text-black rounded-full shadow-lg transition-all duration-300">
            <p className="text-sm font-medium tracking-wide">You must be logged in to save tracks.</p>
          </div>
        )}
      

      {/* ###### DESKTOP AUDIO PLAYER ###### */}
      <div className='hidden md:flex w-screen h-20 bg-potify-void border-t border-potify-hover justify-between'>
          {/* LEFT PART */}
        <div className='flex items-center h-full pl-4 w-1/3 justify-start min-w-0'> 
            <Image
              src={currentSong.coverArt || '/song-cover.png'}
              alt='song cover'
              width={64}
              height={64}
              className='shrink-0 w-16 h-16 mr-4 rounded-md object-cover shadow-lg bg-potify-surface'
              onError={(e) => e.target.src = '/song-cover.png'}  
            />
            
            <div className='flex-1 min-w-0'>
                <h2 className='truncate font-bold text-base'>{currentSong.title}</h2>
                <p className='truncate text-xs'>{currentSong.artist}</p>
            </div>
        </div>

        {/* MIDDLE PART */}
        <div className="w-1/3 flex flex-col items-center justify-center">
          
          <div className='w-full mb-[20px]'>
            <ProgressBar
              PBcurrentTime={currentTime}
              PBduration={duration}
              onScrub={handleScrub}
            />
          </div>
          
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

                  <button onClick={handleTogglePlay} className='opacity-70 hover:opacity-100 hover:scale-110 transition transform active:scale-95'>
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
              
              <div className='justify-end text-[10px]'>{formatTime(duration)}</div>
            </div>
        </div>

        {/* RIGHT PART */}
        <div className="w-1/3 flex items-center justify-end">
        
        </div>
      </div>
      

      {/* ###### MOBILE AUDIO PLAYER ###### */}

      <div className='flex md:hidden flex-col w-screen bg-potify-void'>
        <div className=''>
          <ProgressBar
            PBcurrentTime={currentTime}
            PBduration={duration}
            onScrub={handleScrub}
            />
        </div>

        <div className='flex w-full h-16 justify-between'>
          {/* Cover and song details */}
          <div className='flex w-3/4 items-center h-full pl-1 justify-start min-w-0'>
            <Image
              src={currentSong.coverArt || '/song-cover.png'}
              alt='song cover'
              width={56}
              height={56}
              className='shrink-0 w-14 h-14 mr-4 rounded object-cover shadow-lg bg-potify-surface'
              onError={(e) => e.target.src = '/song-cover.png'}  
              />

              <div className='flex-1 min-w-0'>
                <h2 className='truncate font-bold text-[11px]'>{currentSong.title}</h2>
                <p className='truncate text-[9px]'>{currentSong.artist}</p>
              </div>
          </div>

          {/* BUTTONS */}
          <div className='flex-1 flex items-center gap-6 justify-center'>
            <button onClick={() => handleLike(currentSong)} className='hover:opacity-100 opacity-80 hover:scale-110 transition-all duration-300 active:scale-95'>
              { !likedSongs[currentSong.vidId] ?
                <Image
                  src={'/like-empty.png'}
                  alt='not liked'
                  width={18}
                  height={18}
                  className='h-auto'
                  /> :
                <Image
                  src={'/like-full.png'}
                  alt='not liked'
                  width={18}
                  height={18}
                  className='h-auto'
                  />
              }
            </button>

            <button 
              onClick={handleTogglePlay}
              className='opacity-70 hover:opacity-100 hover:scale-110 transition transform active:scale-95'
            >
              {!isPlaying ?
              <Image
                src='/play-button.png'
                alt="prev button"
                width={15}
                height={15}
                className='h-auto'/>
              :
              <Image
                src='/pause-button.png'
                alt="pause button button"
                width={15}
                height={15}
                className='h-auto'/>
              }
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default AudioPlayer