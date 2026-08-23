type JsonLdProps = {
  data: object
  id: string
}

export const JsonLd = ({ data, id }: JsonLdProps) => {
  // Escape characters that could break out of the script tag
  const json = JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')

  return (
    <script
      id={id}
      type="application/ld+json"
      // Rendering as a plain script ensures SSR so search engines see it in initial HTML
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
