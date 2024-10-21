'use client'
import React from 'react'
import DropdownMenu from './DropdownMenu'
import Image from 'next/image'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full bg-white py-4">
      <div className="relative mx-auto flex max-w-screen-lg items-center justify-center">
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/images/DaliaLogo_GoldONWHITE.jpg"
            alt="DahliaKliniken Logo"
            width={2000}
            height={500}
            className="h-auto w-[200px] object-contain"
          />
        </Link>

        <DropdownMenu />
      </div>
    </footer>
  )
}

export default Footer
