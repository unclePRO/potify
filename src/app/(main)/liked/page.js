import SongList from '@/components/ui/SongList'
import React from 'react'

const LikedPage = () => {
  return (
    <SongList
     listName="Liked Page"
     listAuthor="Aviral"
     listCover="/song-cover.png"
     songsList={[]}/>
  )
}

export default LikedPage