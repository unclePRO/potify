'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, signOut } from "next-auth/react";

const Navbar = ({ session }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  //debouncing 
  useEffect(() => {
    if (searchQuery.trim() === '') return;
    
    const delayBounce = setTimeout(() => {
      router.push(`/search?q=${searchQuery}`);
    }, 600);

    return () => clearTimeout(delayBounce);
  }, [searchQuery, router]);

  return (
    <header className="w-full h-16 z-50 flex items-center px-6 bg-potify-void border-b border-potify-hover">
        
        {/* LOGO */}
        <Link
        href={"/"}
        className='flex-1 flex justify-start'
         >
          <Image 
            src="/potifywithtext.png"
            alt="Potify Logo"
            width={80}
            height={12}
            priority
            className="h-12 hidden md:flex rounded-full pt-0.5 w-auto justify-start"
          />
          <Image 
            src="/potifylogo.png"
            alt="Potify Logo"
            width={80}
            height={12}
            priority
            className="h-12 md:hidden rounded-full pt-0.5 w-auto justify-start"
          />
        </Link>

        {/* SEARCH */}

        <div className="flex flex-1 w-full max-w-md items-center px-4 py-2 rounded-full text-center bg-potify-surface border border-potify-hover text-potify-text">
          <Image
            src="/searchIcon.png"
            alt="Search Icon"
            width={20}
            height={20}
            className='h-auto'
            />
          <input 
            type='text'
            placeholder='Search'
            className='bg-transparent outline-none w-full text-center'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (searchQuery.trim() !== '') {
                  router.push(`/search?q=${searchQuery}`);
                }
              }
            }}
            />
        </div>

        {/* LOGIN */}
        <div className='flex-1 flex justify-end'>
          {session ? (
            <div className="flex items-center gap-3">
              <Image 
                src={session.user.image} 
                alt="Profile" 
                width={20}
                height={20}
                className="w-8 h-8 rounded-full hidden md:flex" />
              <button 
                onClick={() => signOut()} 
                className='text-xs md:text-base bg-white text-black px-3 py-2 rounded-full cursor-pointer'
                >Log out</button>
            </div>
          ) : (
            <button onClick={() => signIn('google')} className="text-xs md:text-base bg-white text-black px-4 py-2 rounded-full cursor-pointer">
              Log in
            </button>
          )}
        </div>
    </header>
  )
}

export default Navbar