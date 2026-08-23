import { SITE_URL } from '@/app/config/site'

export const BUSINESS_NAME = 'Dahliakliniken'
export const BUSINESS_FULL_NAME = 'Dahliakliniken - Dr. Örjan Gribbe'
export const BUSINESS_SITE_URL = SITE_URL.replace(/\/$/, '')

export const BUSINESS_ADDRESS = {
  streetAddress: 'S:t Göransgatan 126',
  addressLocality: 'Stockholm',
  postalCode: '112 45',
  addressCountry: 'SE'
}

export const BUSINESS_CONTACT = {
  telephone: '+46 8 520 278 78',
  url: BUSINESS_SITE_URL,
  email: 'info@dahliakliniken.se'
}

export const BUSINESS_SOCIAL = {
  facebook: 'https://www.facebook.com/dahliakliniken',
  instagram: 'https://www.instagram.com/dahliakliniken'
}

export const BUSINESS_IMAGES = {
  logo: `${BUSINESS_SITE_URL}/images/Logo.png`,
  openGraph: `${BUSINESS_SITE_URL}/opengraph-image.jpg`
}
