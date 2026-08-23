import { getTranslations } from 'next-intl/server'

import { BreadcrumbJsonLd } from '@/app/components/navigation/BreadcrumbJsonLd'
import { createPageMetadata } from '@/app/config/metadata'

import Garanti from './Garanti'

export async function generateMetadata() {
  const t = await getTranslations('garanti.page.metadata')

  return createPageMetadata({
    title: t('title'),
    description: t('description'),
    path: '/garanti'
  })
}

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd path="/garanti" />
      <Garanti />
    </>
  )
}
