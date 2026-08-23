import { BreadcrumbJsonLd } from '@/app/components/navigation/BreadcrumbJsonLd'
import { createPageMetadata } from '@/app/config/metadata'

import ForeOchEfter from './ForeOchEfter'

export const metadata = createPageMetadata({
  title: 'Före och efter - Dahliakliniken',
  description:
    'Utforska imponerande före och efter-resultat av Dr Gribbes bröstoperationer. Se verkliga patienters förvandlingar och upptäck möjligheterna för din egen förändring.',
  path: '/brostoperationer/fore-och-efter'
})

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd path="/brostoperationer/fore-och-efter" />
      <ForeOchEfter />
    </>
  )
}
