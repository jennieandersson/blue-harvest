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

import Brostlyft from './Brostlyft'

export const metadata = createPageMetadata({
  title: 'Bröstlyft i Stockholm - Dahliakliniken',
  description:
    'Om brösthuden är lös och hänger kan den ofta fyllas ut med bröstimplantat på ett estetiskt vackert sätt. Här kan du läsa om hur ett bröstlyft går till.',
  path: '/brostoperationer/brostlyft'
})

export default async function Page() {
  const canonical = canonicalUrl('/brostoperationer/brostlyft')
  const dateModified = getLastModified('/brostoperationer/brostlyft')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SurgicalProcedure',
        '@id': `${canonical}#procedure`,
        url: canonical,
        name: 'Bröstlyft i Stockholm - Dahliakliniken',
        description:
          'Bröstlyft är en plastikkirurgisk operation som återställer form och lyft genom att ta bort överskottshud och strama upp bröstvävnaden. Bröstvårtan kan vid behov flyttas till en högre position.',
        image: {
          '@type': 'ImageObject',
          '@id': `${canonical}#primaryimage`,
          url: `${canonicalUrl()}/images/_N3A7179.jpg`
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
        name: 'Bröstlyft i Stockholm - Dahliakliniken',
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
      <JsonLd id="jsonld-brostlyft" data={jsonLd} />
      <BreadcrumbJsonLd path="/brostoperationer/brostlyft" />
      <Brostlyft />
    </>
  )
}
