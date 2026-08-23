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

import Brostforstoring from './Brostforstoring'

export const metadata = createPageMetadata({
  title: 'Bröstförstoring i Stockholm - Dahliakliniken',
  description:
    'Brösten är för de flesta kvinnor mycket viktiga. De representerar kvinnlighet, skönhet och symboliserar fruktbarhet. Här kan du läsa om hur processen för bröstförstoring går till.',
  path: '/brostoperationer/brostforstoring'
})

export default async function Page() {
  const canonical = canonicalUrl('/brostoperationer/brostforstoring')
  const dateModified = getLastModified('/brostoperationer/brostforstoring')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SurgicalProcedure',
        '@id': `${canonical}#procedure`,
        url: canonical,
        name: 'Bröstförstoring i Stockholm - Dahliakliniken',
        description:
          'Bröstförstoring är en plastikkirurgisk operation som syftar till att öka bröstens storlek och förbättra deras form. Detta kan göras genom att använda implantat eller genom att flytta fett från andra delar av kroppen.',
        image: {
          '@type': 'ImageObject',
          '@id': `${canonical}#primaryimage`,
          url: `${canonicalUrl()}/images/_N3A7297.jpg`
        },
        mainEntityOfPage: { '@id': canonical },
        potentialAction: {
          '@type': 'ScheduleAction',
          target: `${SITE_URL}/boka`
        }
      },
      {
        '@type': 'MedicalWebPage',
        '@id': canonical,
        url: canonical,
        name: 'Bröstförstoring i Stockholm - Dahliakliniken',
        inLanguage: 'sv-SE',
        isPartOf: { '@id': `${SITE_URL}#website` },
        publisher: { '@id': ORG_ID },
        about: { '@id': `${canonical}#procedure` },
        breadcrumb: { '@id': `${canonical}#breadcrumb` },
        primaryImageOfPage: { '@id': `${canonical}#primaryimage` },
        datePublished: DATE_PUBLISHED,
        ...(dateModified && { dateModified })
      }
    ]
  }

  return (
    <>
      <JsonLd id="jsonld-brostforstoring" data={jsonLd} />
      <BreadcrumbJsonLd path="/brostoperationer/brostforstoring" />
      <Brostforstoring />
    </>
  )
}
