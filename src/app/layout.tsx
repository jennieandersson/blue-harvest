import './globals.css'

import { GoogleTagManager } from '@next/third-parties/google'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

import { LastUpdated } from '@/app/components/surfaces/LastUpdated'
import { BUSINESS_IMAGES, BUSINESS_NAME } from '@/data/businessData'

import { Breadcrumbs } from './components/navigation/Breadcrumbs'
import { HeaderWithFooter } from './components/surfaces/HeaderWithFooter'
import { JsonLd } from './components/surfaces/JsonLd'
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from './config/metadata'
import { ORG_ID, SITE_URL } from './config/site'
import { ephesis, josefinSans } from './fonts'

export const runtime = 'nodejs'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION
}

const org = {
  '@id': ORG_ID,
  '@type': 'Organization',
  name: BUSINESS_NAME,
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: BUSINESS_IMAGES.logo }
}

const webSite = {
  '@id': `${SITE_URL}#website`,
  '@type': 'WebSite',
  url: SITE_URL,
  name: BUSINESS_NAME,
  publisher: { '@id': ORG_ID }
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()
  const nonce = (await headers()).get('x-nonce') || undefined

  return (
    <html
      lang={locale}
      className={`${josefinSans.variable} ${ephesis.variable} lg:bg-beige`}
    >
      <head>
        <JsonLd
          id="jsonld-organization"
          data={{ '@context': 'https://schema.org', '@graph': [org, webSite] }}
        />
      </head>
      <body className={josefinSans.className}>
        <GoogleTagManager
          gtmId={process.env.NEXT_PUBLIC_GTM_ID!}
          nonce={nonce}
        />
        <NextIntlClientProvider messages={messages}>
          <HeaderWithFooter />
          <main className="relative flex flex-col lg:mt-20">
            <Breadcrumbs />
            {children}
          </main>
          <LastUpdated />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
