import React from 'react'
import Image from 'next/image';

const Navbar = () => {
  return (
    <header className="flex items-center gap-6 px-6 fixed w-full h-16 bg-gray-500 z-50 top-0 left-0 rounded">
        <Image
          src="/potifywithtext.png"
          alt="Potify Logo"
          width={120}
          height={80}
          priority
          className="rounded-full pt-0.5 w-auto"
        />
        <div>
          Search
        </div>
    </header>
  )
}

export default Navbar