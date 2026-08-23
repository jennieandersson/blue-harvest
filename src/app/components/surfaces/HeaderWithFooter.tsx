'use client'

import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { Button } from '../inputs/Button'
import { DropdownMenu } from '../navigation/DropdownMenu'
import { Logo } from '../navigation/Logo'
import { SocialMediaLinks } from './SocialMediaLinks'

export const HeaderWithFooter = () => {
  const t = useTranslations('contact')
  const pathname = usePathname()

  const [isAtBottom, setIsAtBottom] = useState(false)
  const [bottomOffset, setBottomOffset] = useState(0)

  useEffect(() => {
    const updateBottomOffset = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        setBottomOffset(0)
        return
      }

      const visualViewport = window.visualViewport

      if (!visualViewport) {
        setBottomOffset(0)
        return
      }

      const offset =
        window.innerHeight - visualViewport.height - visualViewport.offsetTop

      setBottomOffset(Math.max(0, offset))
    }

    updateBottomOffset()

    window.addEventListener('scroll', updateBottomOffset, { passive: true })
    window.addEventListener('resize', updateBottomOffset)
    window.visualViewport?.addEventListener('resize', updateBottomOffset)
    window.visualViewport?.addEventListener('scroll', updateBottomOffset)

    return () => {
      window.removeEventListener('scroll', updateBottomOffset)
      window.removeEventListener('resize', updateBottomOffset)
      window.visualViewport?.removeEventListener('resize', updateBottomOffset)
      window.visualViewport?.removeEventListener('scroll', updateBottomOffset)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollingElement =
        document.scrollingElement ?? document.documentElement

      const scrollTop = scrollingElement.scrollTop
      const pageHeight = scrollingElement.scrollHeight
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight

      const threshold = 8
      const isScrollable = pageHeight > viewportHeight + threshold
      const hasReachedBottom =
        scrollTop + viewportHeight >= pageHeight - threshold

      setIsAtBottom(isScrollable && hasReachedBottom)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)
    window.visualViewport?.addEventListener('resize', handleScroll)
    window.visualViewport?.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      window.visualViewport?.removeEventListener('resize', handleScroll)
      window.visualViewport?.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  return (
    <header
      style={{ bottom: bottomOffset }}
      className={`fixed right-0 left-0 z-50 w-full bg-beige transition-[height] duration-300 lg:top-0 ${isAtBottom ? 'h-52' : 'h-20'
        }`}
    >
      <div className="p-gapSpace flex items-center md:p-4">
        <Logo />
        <DropdownMenu />
      </div>

      {isAtBottom && (
        <div className="bg-beige mx-auto flex flex-col items-center justify-center pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:pr-16">
          <div className="flex flex-col text-center text-sm">
            <span>{t('contactUs')}</span>
            <span>
              {t.rich('email', {
                email: (chunks) => (
                  <a href="mailto:info@dahliakliniken.se">{chunks}</a>
                )
              })}
            </span>
            <span>{t('phone')}</span>
            <Button
              className="justify-center text-sm underline"
              inverted
              textButton
              onClick={() => window.CookieScript?.instance?.show()}
            >
              {t('handleCookies')}
            </Button>
            <SocialMediaLinks className="justify-center pt-2" />
          </div>
        </div>
      )}
    </header>
  )
}