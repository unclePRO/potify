'use client'
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import usePlayerStore from '@/store/usePlayerStore'
import Image from 'next/image'
import React from 'react'

const SongList = ({ listName, listAuthor, listCover, songsList }) => {
    const { playSong, likedSongs, toggleLike, fetchSongs } = usePlayerStore();
    const { data: session } = useSession();
    const [showAlert, setShowAlert] = useState(false);

    const handleLike = async(song) => {
        if (!session) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
            return;
        }

        await toggleLike(song);
    }

    return (
        <div>
            {showAlert && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-black/60 backdrop-blur-md border border-red-500/50 bg-red-300 text-black rounded-full shadow-lg transition-all duration-300">
                    <p className="text-sm font-medium tracking-wide">You must be logged in to save tracks.</p>
                </div>
            )}
            <div className='flex w-full p-4 md:p-6 items-center gap-10 bg-potify-surface'>
                <div className='shrink-0 w-32 h-32 md:w-48 md:h-48'>
                    <Image
                    src={listCover}
                    alt='ok'
                    width={100}
                    height={100}
                    className='h-full w-full rounded-md object-cover'
                    />
                </div>
                <div className='flex-1 flex flex-col justify-end overflow-hidden'>
                    <p className='text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-70 mb-1'>playlist</p>
                    <p className='text-[20px] md:text-[40px] truncate font-bold'>{listName}</p>
                    <p className='text-sm md:text-xl truncate'>{listAuthor}</p>
                    <p className='text-[10px] md:text-xs'>{songsList.length} songs</p>
                </div>
            </div>


            <div className='mt-4 grid grid-cols-[minmax(0,0.5fr)_minmax(0,3fr)_minmax(0,1fr)_minmax(0,0.5fr)_] md:grid-cols-[50px_minmax(0,2fr)_minmax(0,2fr)_1fr_50px_50px] opacity-30'>
                <p className='truncate'>#</p>
                <p className='truncate'>Title</p>
                <p className='truncate hidden md:flex'>Artist</p>
                <p className='truncate hidden md:flex'>Duration</p>
                <p className='truncate'>cover</p>
            </div>
            <div className='w-full h-[1px] bg-gray-500 opacity-30'></div>

            {songsList.map((song, index) => {
                return (
                    <div key={song.vidId} className='group grid grid-cols-[minmax(0,0.5fr)_minmax(0,3fr)_minmax(0,1fr)_minmax(0,0.5fr)_] md:grid-cols-[50px_minmax(0,2fr)_minmax(0,2fr)_1fr_50px_50px] py-2'>
                        <div className='grid items-center'>
                            <button onClick={() => playSong(song)} className='z-10 col-start-1 row-start-1 opacity-100 md:group-hover:opacity-100 md:opacity-0 hover:scale-110 transition-all duration-300 active:scale-95'>
                                <Image
                                    src='/play-button.png'
                                    alt="prev button"
                                    width={16}
                                    height={16}
                                    className='h-auto'/>
                            </button>
                            <p className='hidden md:flex col-start-1 row-start-1 truncate group-hover:opacity-0 transition-all duration-300'>{index + 1}.</p>
                        </div>
                        <p className='truncate'>{song.title}</p>
                        <p className='truncate hidden md:flex'>{song.artist}</p>
                        <p className='truncate hidden md:flex'>{song.duration}</p>
                        <Image
                            src={song.coverArt || '/song-cover.png'}
                            alt=''
                            width={20}
                            height={20}
                            className='h-auto w-auto rounded object-cover'
                            onError={(e) => e.target.src = '/song-cover.png'}
                            />
                        <button onClick={() => handleLike(song)} className='hover:opacity-100 opacity-80 hover:scale-110 transition-all duration-300 active:scale-95'>
                            { !likedSongs[song.vidId] ?
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
                    </div>
            )})}
        </div>
    )
}

export default SongList