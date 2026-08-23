import { useTranslations } from 'next-intl'

import { H1 } from '@/components/typography/H1'

import { Pillar } from '../components/layout/Pillar'
import { Card } from '../components/surfaces/Card'
import { BgColors } from '../types'

const Boka = () => {
  const t = useTranslations('common')

  return (
    <>
      <Card
        bgColor={BgColors.Beige}
        bgPosition="right"
        content={
          <Pillar>
            <H1>{t('bookConsultation')}</H1>
          </Pillar>
        }
      />
      <iframe
        width="100%"
        height="100%"
        style={{ minHeight: '750px' }}
        src="https://app.meridiq.com/booking/NTI5Nw==?lang=sv"
        title="Meridiq Booking System"
      ></iframe>
    </>
  )
}

export default Boka
