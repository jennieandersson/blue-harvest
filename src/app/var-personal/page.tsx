import { getTranslations } from 'next-intl/server'

import { BreadcrumbJsonLd } from '@/app/components/navigation/BreadcrumbJsonLd'
import { createPageMetadata } from '@/app/config/metadata'

import VarPersonal from './VarPersonal'

export async function generateMetadata() {
  const t = await getTranslations('var-personal.page.metadata')

  return createPageMetadata({
    title: t('title'),
    description: t('description'),
    path: '/var-personal'
  })
}

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd path="/var-personal" />
      <VarPersonal />
    </>
  )
}
