export function slugToCamelCase(slug: string) {
  return slug.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase())
}

export function breadcrumbRouteKey(slug: string) {
  return `breadcrumbNav.routes.${slugToCamelCase(slug)}`
}

export function formatBreadcrumbFallback(slug: string) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
