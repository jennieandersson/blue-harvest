'use client'

import classNames from 'classnames'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { A } from '@/app/components/typography/A'
import { P } from '@/app/components/typography/P'
import { getLastModified } from '@/utils/getLastModified'

export function LastUpdated() {
  const t = useTranslations('common')
  const tContact = useTranslations('contact')
  const pathname = usePathname() || '/'
  const isHomePage = pathname === '/'
  const dateModified = getLastModified(pathname)

  const formatted = dateModified
    ? new Intl.DateTimeFormat('sv-SE', {
      dateStyle: 'long'
    }).format(new Date(dateModified))
    : null

  return (
    <footer
      className={classNames(
        'border-beige mb-52 flex items-center justify-between gap-4 border-t p-4 lg:mb-0',
        { 'bg-beige': isHomePage }
      )}
    >
      <A href="/personuppgiftspolicy" small>
        {tContact('privacyPolicy')}
      </A>
      {dateModified ? (
        <P className="text-sm">
          <span>{t('lastUpdatedLabel')}</span>{' '}
          <time
            dateTime={dateModified}
            itemProp="dateModified"
            title={dateModified}
          >
            {formatted}
          </time>
        </P>
      ) : null}
    </footer>
  )
}
