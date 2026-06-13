import SongList from '@/components/ui/SongList'
import React from 'react'

const likedSongs = [
  {
    id: 1,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    duration: 355, // in seconds
    thumbnail: '',
  },
  {
    id: 2,
    title: 'Are we still friends',
    artist: 'Tyler the creator',
    duration: 355,
    thumbnail: '',
  },
  {
    id: 3,
    title: 'Ye shaam mastani',
    artist: 'Kishore kumar',
    duration: 355,
    thumbnail: '',
  },
]

const LikedPage = () => {
  return (
    <SongList
     listName="Liked Page"
     listAuthor="Aviral"
     listCover="/song-cover.png"
     songsList={likedSongs}/>
  )
}

export default LikedPage