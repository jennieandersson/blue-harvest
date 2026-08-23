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

import Brostoperationer from './Brostoperationer'

export const metadata = createPageMetadata({
  title: 'Bröstoperationer i Stockholm - Dahliakliniken',
  description:
    'Kliniken för estetisk bröstförstoring och bröstlyft. Vi är med dig på resan mot dina drömbröst. Från början till slut. Från första mötet, konsultationen till slutkontrollen.',
  path: '/brostoperationer'
})

export default async function Page() {
  const canonical = canonicalUrl('/brostoperationer')
  const dateModified = getLastModified('/brostoperationer')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': canonical,
        url: canonical,
        name: 'Bröstoperationer i Stockholm - Dahliakliniken',
        inLanguage: 'sv-SE',
        description:
          'Översikt över våra bröstoperationer i Stockholm – bröstförstoring, bröstlyft och bröstförminskning – samt information om konsultation, operationsdag och återhämtning.',
        isPartOf: { '@id': `${SITE_URL}#website` },
        publisher: { '@id': ORG_ID },
        breadcrumb: { '@id': `${canonical}#breadcrumb` },
        mainEntity: {
          '@id': `${canonical}#procedures`
        },
        potentialAction: {
          '@type': 'ScheduleAction',
          target: `${SITE_URL}/boka`,
          name: 'Boka tid / konsultation'
        },
        datePublished: DATE_PUBLISHED,
        ...(dateModified && { dateModified })
      },
      {
        '@type': 'ItemList',
        '@id': `${canonical}#procedures`,
        name: 'Bröstoperationer',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Bröstförstoring',
            item: `${SITE_URL}/brostoperationer/brostforstoring`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Bröstlyft',
            item: `${SITE_URL}/brostoperationer/brostlyft`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Bröstförminskning',
            item: `${SITE_URL}/brostoperationer/brostforminskning`
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Före & efterbilder',
            item: `${SITE_URL}/brostoperationer/fore-och-efter`
          }
        ]
      }
    ]
  }

  return (
    <>
      <JsonLd id="jsonld-brostoperationer" data={jsonLd} />
      <BreadcrumbJsonLd path="/brostoperationer" />
      <Brostoperationer />
    </>
  )
}
