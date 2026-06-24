'use client'
import Image from 'next/image';
import React from 'react'
import Button from '../ui/Button';
import usePlayerStore from '@/store/usePlayerStore';
import SongCard from '../ui/SongCard';

export const favoriteSongs = [
  {
    vidId: "ijAws2rsr7o",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    coverArt: "https://tse2.mm.bing.net/th?q=Queen+Bohemian+Rhapsody+album+cover&w=500&h=500&c=7",
  },
  {
    vidId: "akApFi2drr0",
    title: "Fukashigi no Carte",
    artist: "Seishun Buta Yarou Cast",
    coverArt: "https://tse2.mm.bing.net/th?q=Rascal+Does+Not+Dream+of+Bunny+Girl+Senpai+Fukashigi+no+Carte+album+cover&w=500&h=500&c=7",
  },
  {
    vidId: "Cb0JZhdmjtg",
    title: "IRIS OUT",
    artist: "Kenshi Yonezu",
    coverArt: "https://tse2.mm.bing.net/th?q=Kenshi+Yonezu+album+cover&w=500&h=500&c=7",
  },
  {
    vidId: "tEXYfT_G0W0",
    title: "New Person, Same Old Mistakes",
    artist: "Tame Impala",
    coverArt: "https://tse2.mm.bing.net/th?q=Tame+Impala+Currents+album+cover&w=500&h=500&c=7",
  },
  {
    vidId: "njoBMZD_jP0",
    title: "The Wonder of You",
    artist: "Elvis Presley",
    coverArt: "https://tse2.mm.bing.net/th?q=Elvis+Presley+The+Wonder+of+You+album+cover&w=500&h=500&c=7",
  },
  {
    vidId: "i3MKTm-49uI",
    title: "Bring Me To Life",
    artist: "Evanescence",
    coverArt: "https://tse2.mm.bing.net/th?q=Evanescence+Fallen+album+cover&w=500&h=500&c=7",
  }
];
const LandingPage = () => {
    const { playSong, likedSongs, toggleLike, fetchSongs } = usePlayerStore();

    return (
        <div className='flex-1 h-full mt-5 ml-5 mr-5'>
            <div className='flex-col w-full h-1/3'>
                <h1 className='text-[25px] font-bold mb-3'>Favorites</h1>
                <div className='flex gap-10 overflow overflow-x-auto'>
                    {favoriteSongs.map(song => (
                        <SongCard
                          key={song.vidId}
                          song={song}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LandingPage