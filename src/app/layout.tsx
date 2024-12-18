import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import { Breadcrumbs } from './components/navigation/Breadcrumbs'
import { HeaderWithFooter } from './components/surfaces/HeaderWithFooter'
import './globals.css'

export async function generateMetadata() {
  const t = await getTranslations()

  return {
    title: t('metadata.title'),
    description: t('metadata.description')
  }
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Breadcrumbs />
          <HeaderWithFooter />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
