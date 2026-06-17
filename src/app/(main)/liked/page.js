'use client'
import SongList from '@/components/ui/SongList'
import React, { useEffect } from 'react'
import usePlayerStore from '@/store/usePlayerStore';
import { useSession } from 'next-auth/react';

const LikedPage = () => {
  const { likedSongs, toggleLike, fetchSongs } = usePlayerStore();

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") fetchSongs();
  }, [fetchSongs, status]);

  return (
    <SongList
      listName="Liked Page"
      listAuthor="Aviral"
      listCover="/song-cover.png"
      songsList={Object.values(likedSongs)}/>
  )
}

export default LikedPage