import SongList from '@/components/ui/SongList';
import React from 'react'

const SearchPage = async ({ searchParams }) => {
  const params = await searchParams;
  const searchQuery = params.q;

  const response = await fetch(`http://localhost:3000/api/search?q=${searchQuery}`);
  const searchResults = await response.json();

  if (!Array.isArray(searchResults)) {
    return <div className="p-4 text-gray-400">No songs found or search failed.</div>;
  }

  return (
    <div>
      <SongList
        listName={'Search Results'}
        listAuthor={''}
        listCover={'/song-cover.png'}
        songsList={searchResults}
        />
        {/* {JSON.stringify(searchResults, null, 2)} */}
    </div>
  )
}

export default SearchPage