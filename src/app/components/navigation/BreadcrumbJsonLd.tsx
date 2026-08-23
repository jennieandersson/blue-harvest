import { JsonLd } from '@/components/surfaces/JsonLd'

import { createBreadcrumbList } from './createBreadcrumbList'

export async function BreadcrumbJsonLd({ path }: { path: string }) {
  const data = await createBreadcrumbList(path)

  if (!data) {
    return null
  }

  return (
    <JsonLd
      id="jsonld-breadcrumbs"
      data={{ '@context': 'https://schema.org', ...data }}
    />
  )
}
