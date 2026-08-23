import { BreadcrumbJsonLd } from '@/app/components/navigation/BreadcrumbJsonLd'
import { createPageMetadata } from '@/app/config/metadata'

import Priser from './Priser'

export const metadata = createPageMetadata({
  title: 'Prislista - Dahliakliniken',
  description:
    'I alla priser ingår allt såsom narkos, implantat, övernattning och återbesök.',
  path: '/priser'
})

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd path="/priser" />
      <Priser />
    </>
  )
}
