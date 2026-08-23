import { getTranslations } from 'next-intl/server'

import { canonicalUrl } from '@/app/config/site'

import { breadcrumbRouteKey, formatBreadcrumbFallback } from './breadcrumbLabels'

export async function createBreadcrumbList(pathname: string) {
  if (!pathname || pathname === '/') {
    return null
  }

  const t = await getTranslations('site-breadcrumbs')
  const segments = pathname.split('/').filter(Boolean)

  const crumbs = [
    { name: t('breadcrumbNav.homeLabel'), path: '/' },
    ...segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`
      const routeKey = breadcrumbRouteKey(segment)
      const name = t.has(routeKey)
        ? t(routeKey)
        : formatBreadcrumbFallback(segment)

      return { name, path }
    })
  ]

  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl(pathname)}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: canonicalUrl(crumb.path)
    }))
  }
}
