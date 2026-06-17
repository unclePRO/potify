import SongList from '@/components/ui/SongList'
import React from 'react'

const LikedPage = () => {

  const likedSongs = [];

  return (
    <SongList
      listName="Liked Page"
      listAuthor="Aviral"
      listCover="/song-cover.png"
      songsList={likedSongs}/>
  )
}

export default LikedPage