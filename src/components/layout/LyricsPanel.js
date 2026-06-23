'use client'
import usePlayerStore from '@/store/usePlayerStore'
import React from 'react'

const LyricsPanel = ({ session }) => {
  const { currentSong, isPlaying } = usePlayerStore();

  if(true) return null;
  //replace true with !currentSong

  return (
    <div className='w-96 shrink-0 mt-16 mb-20 rounded bg-potify-surface overflow-y-auto'>
        <div className='p-4'>
          <h2>Now Playing: Artist Details</h2>
          <p>Lyrics go here...</p>
        </div>
    </div>
  )
}

export default LyricsPanel