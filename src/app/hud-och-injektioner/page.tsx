import { BreadcrumbJsonLd } from '@/app/components/navigation/BreadcrumbJsonLd'
import { createPageMetadata } from '@/app/config/metadata'
import {
  canonicalUrl,
  DATE_PUBLISHED,
  ORG_ID,
  SITE_URL
} from '@/app/config/site'
import { JsonLd } from '@/components/surfaces/JsonLd'
import { getLastModified } from '@/utils/getLastModified'

import HudOchInjektioner from './HudOchInjektioner'

export const metadata = createPageMetadata({
  title: 'Hud & injektioner - Dahliakliniken',
  description:
    'Det finns olika behandlingar med muskelavslappnande medel som kan ge fint och bra resultat. Muskelavslappnande kan användas mot behandling av rynkor och för medicinsk användning t.ex. mot spänningshuvudvärk och svettningar.',
  path: '/hud-och-injektioner'
})

export default async function Page() {
  const canonical = canonicalUrl('/hud-och-injektioner')
  const dateModified = getLastModified('/hud-och-injektioner')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TherapeuticProcedure',
        '@id': `${canonical}#therapy`,
        url: canonical,
        name: 'Hud & injektioner - Dahliakliniken',
        description:
          'Det finns olika behandlingar med muskelavslappnande medel som kan ge fint och bra resultat. Muskelavslappnande kan användas mot behandling av rynkor och för medicinsk användning t.ex. mot spänningshuvudvärk och svettningar.',
        image: {
          '@type': 'ImageObject',
          '@id': `${canonical}#primaryimage`,
          url: `${canonicalUrl()}/images/ansiktsmuskler.jpeg`
        },
        procedureType: 'PercutaneousProcedure',
        bodyLocation: [
          'Glabella (argrynka/bekymmersrynka)',
          'Panna',
          'Kråksparkar',
          'Mungipor (m. depressor anguli oris)',
          'Näsrygg (bunny lines)',
          'Läppkant (lip flip)',
          'Gummy smile',
          'Haka (m. mentalis)',
          'Platysma-band (hals)',
          'Masseter (bruxism)'
        ],
        mainEntityOfPage: { '@id': canonical },
        potentialAction: {
          '@type': 'ScheduleAction',
          target: `${SITE_URL}/boka`,
          name: 'Boka tid / konsultation'
        }
      },
      {
        '@type': 'MedicalWebPage',
        '@id': canonical,
        url: canonical,
        name: 'Hud & injektioner - Dahliakliniken',
        inLanguage: 'sv-SE',
        isPartOf: { '@id': `${SITE_URL}#website` },
        publisher: { '@id': ORG_ID },
        about: {
          '@id': `${canonical}#therapy`
        },
        primaryImageOfPage: {
          '@id': `${canonical}#primaryimage`
        },
        medicalAudience: 'Patient',
        specialty: 'PlasticSurgery',
        breadcrumb: {
          '@id': `${canonical}#breadcrumb`
        },
        datePublished: DATE_PUBLISHED,
        ...(dateModified && { dateModified })
      }
    ]
  }

  return (
    <>
      <JsonLd id="jsonld-hud-och-injektioner" data={jsonLd} />
      <BreadcrumbJsonLd path="/hud-och-injektioner" />
      <HudOchInjektioner />
    </>
  )
}
