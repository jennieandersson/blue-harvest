import type { MetadataRoute } from 'next'

import { canonicalUrl, NOINDEX_PATHS } from '@/app/config/site'
import lastModified from '@/lastModified.json' with { type: 'json' }

const noindexPaths = new Set<string>(NOINDEX_PATHS)

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(lastModified)
    .filter(([path]) => !noindexPaths.has(path))
    .map(([path, date]) => ({
      url: canonicalUrl(path),
      lastModified: date
    }))
}
