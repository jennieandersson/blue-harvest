import { BreadcrumbJsonLd } from '@/app/components/navigation/BreadcrumbJsonLd'
import { createPageMetadata } from '@/app/config/metadata'
import { canonicalUrl, CLINIC_ID, ORG_ID } from '@/app/config/site'
import { JsonLd } from '@/components/surfaces/JsonLd'
import {
  BUSINESS_ADDRESS,
  BUSINESS_CONTACT,
  BUSINESS_NAME
} from '@/data/businessData'

import KontaktOchBesok from './KontaktOchBesok'

export const metadata = createPageMetadata({
  title: 'Kontakt & besök - Dahliakliniken',
  description:
    'Boka en konsultation online eller på plats hos Dr Örjan Gribbe. Kontakta oss via telefon, e-post eller SMS. Här hittar du även adress och vägbeskrivning till vår klinik i Stockholm.',
  path: '/kontakt-och-besok'
})

const clinicJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  '@id': CLINIC_ID,
  name: BUSINESS_NAME,
  url: canonicalUrl(),
  image: `${canonicalUrl()}/images/Wonna_Tower_IMG_7027.png`,
  telephone: BUSINESS_CONTACT.telephone,
  email: BUSINESS_CONTACT.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS_ADDRESS.streetAddress,
    addressLocality: BUSINESS_ADDRESS.addressLocality,
    postalCode: BUSINESS_ADDRESS.postalCode,
    addressCountry: BUSINESS_ADDRESS.addressCountry
  },
  parentOrganization: { '@id': ORG_ID }
}

export default function Page() {
  return (
    <>
      <JsonLd id="jsonld-clinic-contact" data={clinicJsonLd} />
      <BreadcrumbJsonLd path="/kontakt-och-besok" />
      <KontaktOchBesok />
    </>
  )
}
