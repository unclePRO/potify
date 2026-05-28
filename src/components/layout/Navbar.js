import React from 'react'
import Image from 'next/image';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 z-50 flex items-center px-6 bg-potify-void border-b border-potify-hover">
        <Image 
          src="/potifywithtext.png"
          alt="Potify Logo"
          width={120}
          height={80}
          priority
          className="flex rounded-full pt-0.5 w-auto justify-start"
        />
        <div className="absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-32 px-4 py-2 rounded-full w-96 text-center bg-potify-surface border border-potify-hover text-potify-text">
                <Image
                  src="/searchIcon.png"
                  alt="Search Icon"
                  width={20}
                  height={20}
                  />
                Search
          </div>
        </div>
        <button className='flex-1 flex justify-end'>
          Login
        </button>
    </header>
  )
}

export default Navbar