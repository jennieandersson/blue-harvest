'use client'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="absolute right-4 inline-block text-left">
      <div>
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span className="text-3xl font-thin">X</span>
        </button>
      </div>

      {isOpen && (
        <div className="absolute bottom-full right-0 z-10 mb-2 h-auto max-h-[500px] w-64 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="py-4"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link
              href="/"
              className="block px-6 py-4 text-xl text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              {t('breadcrumbs.home')}
            </Link>
            <Link
              href="/about"
              className="block px-6 py-4 text-xl text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              {'Kliniken'}
            </Link>
            <a
              href="#"
              className="block px-6 py-4 text-xl text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              {t('dropdown.breast_surgeries')}
            </a>
            <a
              href="#"
              className="block px-6 py-4 text-xl text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              {t('dropdown.the_implants')}
            </a>
            <a
              href="#"
              className="block px-6 py-4 text-xl text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              {t('dropdown.skin_injections')}
            </a>
            <a
              href="#"
              className="block px-6 py-4 text-xl text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              {t('dropdown.price')}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default DropdownMenu
