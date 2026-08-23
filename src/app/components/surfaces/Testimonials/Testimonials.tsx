import { JsonLd } from '@/app/components/surfaces/JsonLd'
import { CLINIC_ID, SITE_URL } from '@/app/config/site'
import { Testimonial } from '@/components/surfaces/Testimonials/Testimonial'
import { testimonials } from '@/data/testimonialdata'

const FEATURED_TESTIMONIAL_COUNT = 3

const getRandomTestimonials = (count: number) => {
  const shuffled = [...testimonials]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled.slice(0, count)
}

export default function Testimonials() {
  const selectedTestimonials = getRandomTestimonials(FEATURED_TESTIMONIAL_COUNT)

  const graph = selectedTestimonials.map((t) => ({
    '@type': 'Quotation',
    '@id': `${SITE_URL}/#testimonial-${t.title}-${t.date}`,
    text: t.content,
    author: { '@type': 'Person', name: t.title },
    datePublished: t.date,
    inLanguage: 'sv',
    isBasedOn: t.link,
    url: t.link,
    publisher: { '@type': 'Organization', name: 'Google' },
    about: { '@id': CLINIC_ID },
    mainEntityOfPage: SITE_URL,
    citation: t.link
  }))

  const schema = { '@context': 'https://schema.org', '@graph': graph }

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden">
      <div className="flex min-w-min justify-center gap-4 lg:min-w-0">
        {selectedTestimonials.map((testimonial) => (
          <Testimonial
            key={`${testimonial.title}-${testimonial.date}-${testimonial.content.slice(0, 20)}`}
            title={testimonial.title}
            content={testimonial.content}
            link={testimonial.link}
            date={testimonial.date}
            rating={testimonial.rating}
          />
        ))}
      </div>
      <JsonLd data={schema} id="jsonld-testimonials" />
    </div>
  )
}
