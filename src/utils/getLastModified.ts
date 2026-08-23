import lastModified from '@/lastModified.json' with { type: 'json' }

const map = lastModified as Record<string, string>

export function getLastModified(path: string): string | undefined {
  if (!path) return undefined

  const normalized =
    path !== '/' && path.endsWith('/') ? path.slice(0, -1) : path

  return map[normalized]
}
