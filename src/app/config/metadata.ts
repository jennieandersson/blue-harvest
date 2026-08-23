import type { Metadata } from 'next'

import { canonicalUrl } from '@/app/config/site'
import { BUSINESS_NAME } from '@/data/businessData'

export const DEFAULT_TITLE =
  'Dahliakliniken – Expert på estetisk bröstförstoring och bröstlyft i Stockholm'

export const DEFAULT_DESCRIPTION =
  'Dr Örjan Gribbes nya klinik i Stockholm är specialiserad på estetiska bröstoperationer, såsom bröstförstoringar, bröstförminskningar och bröstlyft.'

type CreatePageMetadataInput = {
  title: string
  description: string
  path: string
}

export function createPageMetadata({
  title,
  description,
  path
}: CreatePageMetadataInput): Metadata {
  const url = canonicalUrl(path)

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: BUSINESS_NAME,
      type: 'website',
      locale: 'sv_SE',
      images: [{ url: '/opengraph-image.jpg' }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/twitter-image.jpg']
    }
  }
}
