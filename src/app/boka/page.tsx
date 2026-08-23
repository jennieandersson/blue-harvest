import { BreadcrumbJsonLd } from '@/app/components/navigation/BreadcrumbJsonLd'
import { createPageMetadata } from '@/app/config/metadata'

import Boka from './Boka'

export const metadata = createPageMetadata({
  title: 'Boka - Dahliakliniken',
  description:
    'Boka din konsultation hos Dr Gribbe för bröstförstoring, bröstlyft eller bröstförminskning. Expertis, personlig rådgivning och skräddarsydda lösningar väntar dig.',
  path: '/boka'
})

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd path="/boka" />
      <Boka />
    </>
  )
}
