export const SITE_URL = process.env.SITE_URL || 'https://www.dahliakliniken.se'
export const CLINIC_ID = `${SITE_URL}/#clinic`
export const ORG_ID = `${SITE_URL}/#organization`
export const DATE_PUBLISHED = '2025-02-19'

export const NOINDEX_PATHS = ['/tack-for-din-bokning'] as const

export const isPreviewDeployment = process.env.VERCEL_ENV === 'preview'

export const canonicalUrl = (path = '') => {
  // ensure single slash between base and path
  const base = SITE_URL.replace(/\/$/, '')
  const suffix = String(path || '').replace(/^\//, '')
  return suffix ? `${base}/${suffix}` : base
}
