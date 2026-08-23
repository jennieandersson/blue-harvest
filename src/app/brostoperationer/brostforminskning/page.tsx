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

import Brostforminskning from './Brostforminskning'

export const metadata = createPageMetadata({
  title: 'Bröstförminskning i Stockholm - Dahliakliniken',
  description:
    'Om den egna bysten är stor och tung kan brösten minskas genom en bröstförminskning. Operationen är mycket lik operationen bröstlyft med skillnaden att mer eller mindre egen bröstvävnad tas bort.',
  path: '/brostoperationer/brostforminskning'
})

export default async function Page() {
  const canonical = canonicalUrl('/brostoperationer/brostforminskning')
  const dateModified = getLastModified('/brostoperationer/brostforminskning')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SurgicalProcedure',
        '@id': `${canonical}#procedure`,
        url: canonical,
        name: 'Bröstförminskning i Stockholm - Dahliakliniken',
        description:
          'Bröstförminskning är en plastikkirurgisk operation som syftar till att minska bröstens storlek och vikt genom att ta bort överflödig bröstvävnad. Detta kan hjälpa till att återställa en mer proportionerlig kroppsform och lindra obehag orsakade av tunga bröst.',
        image: {
          '@type': 'ImageObject',
          '@id': `${canonical}#primaryimage`,
          url: `${canonicalUrl()}/images/_N3A7302.jpg`
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
        name: 'Bröstförminskning i Stockholm - Dahliakliniken',
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
      <JsonLd id="jsonld-brostforminskning" data={jsonLd} />
      <BreadcrumbJsonLd path="/brostoperationer/brostforminskning" />
      <Brostforminskning />
    </>
  )
}
