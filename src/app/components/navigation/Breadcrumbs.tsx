'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Fragment } from 'react'

import { determineActiveLinkColor } from '@/utils/determineActiveLinkColor'

import { breadcrumbRouteKey, formatBreadcrumbFallback } from './breadcrumbLabels'

export const Breadcrumbs = () => {
  const t = useTranslations('site-breadcrumbs')
  const paths = usePathname()
  const pathNames = paths.split('/').filter((path) => path)
  const separator = <span>{' / '}</span>
  const lastPartOfPath = pathNames[pathNames.length - 1]
  const activeLinkColor = determineActiveLinkColor(lastPartOfPath)
  const activeClass = `mx-2 ${activeLinkColor}`
  const listClasses = 'hover:underline hover:text-gold mx-2'

  /* Don't show breadcrumbs on the home page */
  if (paths === '/') {
    return null
  }

  const getBreadcrumbLabel = (link: string) => {
    const routeKey = breadcrumbRouteKey(link)

    if (t.has(routeKey)) {
      return t(routeKey)
    }

    return formatBreadcrumbFallback(link)
  }

  return (
    <div className="px-gapSpace lg:bg-beige w-full font-light">
      <nav className="py-2">
        <ul className="flex">
          <li className={listClasses}>
            <Link href={'/'}>{t('breadcrumbNav.homeLabel')}</Link>
          </li>
          {pathNames.length > 0 && separator}
          {pathNames.map((link, index) => {
            const href = `/${pathNames.slice(0, index + 1).join('/')}`
            const itemClasses =
              paths === href ? `${activeClass}` : `${listClasses}`

            return (
              <Fragment key={index}>
                <li className={itemClasses}>
                  {paths === href ? (
                    <span>{getBreadcrumbLabel(link)}</span>
                  ) : (
                    <Link href={href}>{getBreadcrumbLabel(link)}</Link>
                  )}
                </li>
                {pathNames.length !== index + 1 && separator}
              </Fragment>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
