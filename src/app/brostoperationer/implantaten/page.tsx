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

import Implantaten from './Implantaten'

export const metadata = createPageMetadata({
  title: 'Implantaten - Dahliakliniken',
  description:
    'Det finns många olika varianter av bröstimplantat och vid tillverkningen kan man variera materialet i implantatet, hur mycket man fyller implantatet, formen på implantatet och skalets ytstruktur.',
  path: '/brostoperationer/implantaten'
})

export default async function Page() {
  const canonical = canonicalUrl('/brostoperationer/implantaten')
  const dateModified = getLastModified('/brostoperationer/implantaten')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalDevice',
        '@id': `${canonical}#procedure`,
        url: canonical,
        name: 'Implantaten - Dahliakliniken',
        description:
          'Det finns många olika varianter av bröstimplantat och vid tillverkningen kan man variera materialet i implantatet, hur mycket man fyller implantatet, formen på implantatet och skalets ytstruktur.',
        image: {
          '@type': 'ImageObject',
          '@id': `${canonical}#primaryimage`,
          url: `${canonicalUrl()}/images/_N3A0080.jpg`
        },
        mainEntityOfPage: { '@id': canonical }
      },
      {
        '@type': 'MedicalWebPage',
        '@id': canonical,
        url: canonical,
        name: 'Implantaten | Dahliakliniken',
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
      <JsonLd id="jsonld-implantaten" data={jsonLd} />
      <BreadcrumbJsonLd path="/brostoperationer/implantaten" />
      <Implantaten />
    </>
  )
}
