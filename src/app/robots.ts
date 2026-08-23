import type { MetadataRoute } from 'next'

import {
  canonicalUrl,
  isPreviewDeployment,
  NOINDEX_PATHS
} from '@/app/config/site'

export default function robots(): MetadataRoute.Robots {
  if (isPreviewDeployment) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/'
      }
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [...NOINDEX_PATHS]
    },
    sitemap: `${canonicalUrl()}/sitemap.xml`
  }
}
