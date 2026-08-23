import { useTranslations } from 'next-intl'

import { A } from '@/components/typography/A'
import { P } from '@/components/typography/P'

export const FAQ_ITEM_KEYS = Array.from(
  { length: 30 },
  (_, index) => `question${index + 1}`
)

export const useAccordionItems = () => {
  const t = useTranslations('fragor-och-svar.page.faqAccordion')

  return FAQ_ITEM_KEYS.map((key) => ({
    id: crypto.randomUUID(),
    title: t(`${key}.question`),
    content: (
      <P small>
        {key === 'question2'
          ? t.rich(`${key}.answer`, {
              link: (chunks) => (
                <A href="/brostoperationer#forberedelser">{chunks}</A>
              )
            })
          : t(`${key}.answer`)}
      </P>
    )
  }))
}
