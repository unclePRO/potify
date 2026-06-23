'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const { data: session } = useSession();

  //debouncing 
  useEffect(() => {
    if (searchQuery.trim() === '') return;
    
    const delayBounce = setTimeout(() => {
      router.push(`/search?q=${searchQuery}`);
    }, 600);

    return () => clearTimeout(delayBounce);
  }, [searchQuery, router]);

  return (
    <header className="fixed top-0 left-0 w-full h-16 z-50 flex items-center px-6 bg-potify-void border-b border-potify-hover">
        <Link
        href={"/"}
         >
          <Image 
            src="/potifywithtext.png"
            alt="Potify Logo"
            width={80}
            height={12}
            priority
            className="h-12 flex rounded-full pt-0.5 w-auto justify-start"
          />
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-32 px-4 py-2 rounded-full w-96 text-center bg-potify-surface border border-potify-hover text-potify-text">
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
                  className='bg-transparent outline-none'
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
        </div>
        <div className='flex-1 flex justify-end'>
          {session ? (
            <div className="flex items-center gap-3">
              <Image 
                src={session.user.image} 
                alt="Profile" 
                width={20}
                height={20}
                className="w-8 h-8 rounded-full" />
              <button onClick={() => signOut()}>Log out</button>
            </div>
          ) : (
            <button onClick={() => signIn('google')} className="bg-white text-black px-4 py-2 rounded-full">
              Log in
            </button>
          )}
        </div>
    </header>
  )
}

export default Navbar