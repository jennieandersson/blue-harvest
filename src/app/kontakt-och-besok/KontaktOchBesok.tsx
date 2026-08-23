import { Car, Mail, MapPin, Phone, Train } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { Pillar } from '@/components/layout/Pillar'
import { SpaceContainer } from '@/components/layout/SpaceContainer'
import { Card } from '@/components/surfaces/Card'
import { H1 } from '@/components/typography/H1'
import { H2 } from '@/components/typography/H2'
import { P } from '@/components/typography/P'
import locationImage from '@/public/images/Wonna_Tower_IMG_7027.png'

import { BgColors } from '../types'

const KontaktOchBesok = () => {
  const t = useTranslations('kontakt-och-besok.page')
  let emailIndex = 0
  return (
    <>
      <Card
        bgColor={BgColors.Coral}
        className="before:bg-[30%_30%] lg:before:[background-size:200%]"
        content={
          <Pillar>
            <H1 white>{t('hero.title')}</H1>
            <P white>{t('hero.preamble')}</P>
          </Pillar>
        }
      />
      <SpaceContainer>
        <Pillar>
          <SpaceContainer noPadding spaceVertically>
            <Image
              src={locationImage}
              alt={
                'En bild på entrén till Wonna Tower, där Dahlia kliniken finns '
              }
              className="max-h-[calc(100dvh-80px)] object-cover object-center"
            />
          </SpaceContainer>
          <div className="grid gap-4 gap-y-8 md:grid-cols-2">
            <address className="contents not-italic">
              <div className="space-y-4">
                <H2>{t('contact.heading')}</H2>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-[#1B3B35]" />
                  <div>
                    <P>
                      {t.rich('contact.phone', {
                        phone: (chunks) => (
                          <span className="block">{chunks}</span>
                        )
                      })}
                    </P>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-[#1B3B35]" />
                  <div>
                    <P>
                      {t.rich('contact.email', {
                        email: (chunks) => {
                          const email = String(chunks).trim() // Ensure chunks is a string
                          return (
                            <a
                              className="block"
                              href={`mailto:${email}`}
                              key={emailIndex++}
                            >
                              {email}
                            </a>
                          )
                        }
                      })}
                    </P>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-1 h-6 w-6 shrink-0" />
                <div>
                  <H2>{t('location.heading')}</H2>
                  <P>{t('location.address')}</P>
                  <P>{t('location.addressDetails')}</P>
                </div>
              </div>
            </address>

            <div className="flex items-start gap-2">
              <Car className="mt-1 h-6 w-6 shrink-0" />
              <div>
                <H2>{t('parking.heading')}</H2>
                <P>{t('parking.details')}</P>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="mt-1 flex shrink-0 gap-2">
                <Train className="h-6 w-6" />
              </div>
              <div>
                <H2>{t('publicTransport.heading')}</H2>
                <P>{t('publicTransport.details')}</P>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.7876457461824!2d18.0279!3d59.3334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d74e8f35c51%3A0x7c0c07ce8d4e6c4f!2sSankt%20G%C3%B6ransgatan%20126%2C%20Stockholm!5e0!3m2!1sen!2sse!4v1623456789012!5m2!1sen!2sse"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-lg"
            />
          </div>
        </Pillar>
      </SpaceContainer>
    </>
  )
}

export default KontaktOchBesok
