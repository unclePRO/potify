import React from 'react'
import Image from 'next/image';

const Navbar = () => {
  return (
    <header className="fixed w-full h-16 bg-gray-500">
        <Image
          src="/potifywithtext.png"
          alt="Potify Logo"
          width={130} 
          height={80} 
          className="rounded-full pt-1"
        />
    </header>
  )
}

export default Navbar