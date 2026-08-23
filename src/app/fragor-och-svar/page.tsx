import { getTranslations } from 'next-intl/server'

import { BreadcrumbJsonLd } from '@/app/components/navigation/BreadcrumbJsonLd'
import { createPageMetadata } from '@/app/config/metadata'
import { canonicalUrl } from '@/app/config/site'
import { JsonLd } from '@/components/surfaces/JsonLd'

import { FAQ_ITEM_KEYS } from './accordionData'
import FragorOchSvar from './FragorOchSvar'

const FAQ_PATH = '/fragor-och-svar'

export const metadata = createPageMetadata({
  title: 'Frågor och svar - Dahliakliniken',
  description:
    'Har du frågor om bröstförstoring, bröstlyft eller bröstförminskning? Här hittar du svar från Dr Örjan Gribbe om ingrepp, återhämtning och resultat. För personlig rådgivning – boka en konsultation.',
  path: FAQ_PATH
})

const toPlainText = (value: string) => value.replace(/<\/?[^>]+>/g, '')

export default async function Page() {
  const t = await getTranslations('fragor-och-svar.page.faqAccordion')

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonicalUrl(FAQ_PATH)}#faq`,
    mainEntity: FAQ_ITEM_KEYS.map((key) => ({
      '@type': 'Question',
      name: t(`${key}.question`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: toPlainText(String(t.raw(`${key}.answer`)))
      }
    }))
  }

  return (
    <>
      <JsonLd id="jsonld-faq" data={faqJsonLd} />
      <BreadcrumbJsonLd path={FAQ_PATH} />
      <FragorOchSvar />
    </>
  )
}
