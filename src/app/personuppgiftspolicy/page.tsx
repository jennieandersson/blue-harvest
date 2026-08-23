import { BreadcrumbJsonLd } from '@/app/components/navigation/BreadcrumbJsonLd'
import { createPageMetadata } from '@/app/config/metadata'

import Personuppgiftspolicy from './personuppgiftspolicy'

export const metadata = createPageMetadata({
  title: 'Vår personuppgiftspolicy - Dahliakliniken',
  description:
    'Vår personuppgiftspolicy - Dahliakliniken. Här kan du läsa vår personuppgiftspolicy',
  path: '/personuppgiftspolicy'
})

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd path="/personuppgiftspolicy" />
      <Personuppgiftspolicy />
    </>
  )
}
