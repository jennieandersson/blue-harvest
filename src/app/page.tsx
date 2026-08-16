import Image from 'next/image'
import { getTranslations } from 'next-intl/server'

import { CLINIC_ID } from '@/app/config/site'
import { allTreatmentsData } from '@/data/allTreatmentsData'
import {
  BUSINESS_ADDRESS,
  BUSINESS_CONTACT,
  BUSINESS_IMAGES,
  BUSINESS_NAME,
  BUSINESS_SOCIAL
} from '@/data/businessData'
import belowheadingImage from '@/public/images/_N3A9899.jpg'
import Consultation from '@/public/images/N3A0033_.jpg'
import WaitingRoom from '@/public/images/N3A7746_edited.png'

import { Pillar } from './components/layout/Pillar'
import { SpaceContainer } from './components/layout/SpaceContainer'
import { TreatmentBox } from './components/layout/TreatmentBox'
import { Card } from './components/surfaces/Card'
import { Hero } from './components/surfaces/Hero'
import { JsonLd } from './components/surfaces/JsonLd'
import Testimonials from './components/surfaces/Testimonials/Testimonials'
import { A } from './components/typography/A'
import { H1 } from './components/typography/H1'
import { H2 } from './components/typography/H2'
import { H3 } from './components/typography/H3'
import { P } from './components/typography/P'
import { BgColors } from './types'

export const metadata = {
  other: {
    'google-site-verification': 'scjbJTK54uTe66Okuk5_r-T36DpV5FkEsy8eWukJ28A'
  }
}

export default async function Home() {
  const tPage = await getTranslations('home-page.page')
  const tCommon = await getTranslations('common')

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': CLINIC_ID,
    name: BUSINESS_NAME,
    image: BUSINESS_IMAGES.openGraph,
    url: BUSINESS_CONTACT.url,
    telephone: BUSINESS_CONTACT.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS_ADDRESS.streetAddress,
      addressLocality: BUSINESS_ADDRESS.addressLocality,
      postalCode: BUSINESS_ADDRESS.postalCode,
      addressCountry: BUSINESS_ADDRESS.addressCountry
    },
    description: tPage('schema.description'),
    medicalSpecialty: {
      '@type': 'MedicalSpecialty',
      name: 'PlasticSurgery'
    },
    founder: {
      '@type': 'Person',
      name: tPage('schema.founderName')
    },
    areaServed: {
      '@type': 'Place',
      name: tPage('schema.areaServedName')
    },
    sameAs: [BUSINESS_SOCIAL.facebook, BUSINESS_SOCIAL.instagram]
  }

  return (
    <>
      <JsonLd data={schemaData} />
      <Hero />
      <Card
        bgColor={BgColors.White}
        bgPosition="right"
        content={
          <SpaceContainer noPadding>
            <Pillar noPadding>
              <H1>
                {tPage.rich('aboutBox.title', {
                  span: (chunks) => (
                    <span className="block text-lg">{chunks}</span>
                  ),
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </H1>
              <P className="fat">
                {tPage.rich('aboutBox.newClinicName', {
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </P>
              <P>
                {tPage.rich('aboutBox.welcomeMessage', {
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </P>
              <P>
                {tPage.rich('aboutBox.paragraph1', {
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </P>
            </Pillar>
          </SpaceContainer>
        }
      />

      <SpaceContainer as="section" ariaLabelledBy="testimonials-heading">
        <Pillar>
          <H2 id="testimonials-heading">{tPage('testimonials.title')}</H2>
        </Pillar>
        <Testimonials />
      </SpaceContainer>

      <SpaceContainer as="section">
        <Pillar>
          <H2>{tPage('treatmentSection.title')}</H2>
        </Pillar>

        <div className="m-auto xl:max-w-7xl">
          <TreatmentBox treatments={allTreatmentsData} />
        </div>
      </SpaceContainer>

      <SpaceContainer noPadding spaceTop>
        <Card
          bgColor={BgColors.Beige}
          className="before:bg-position-[50%_30%]"
          content={
            <>
              <H2 upperCase className="text-center">
                {tCommon('bookConsultation')}
              </H2>
              <div className="m-auto flex max-w-xs justify-center">
                <A href="/boka" className="uppercase" buttonStyle inverted>
                  {tCommon('bookNow')}
                </A>
              </div>
            </>
          }
        />
      </SpaceContainer>

      {/* About Section */}
      <Card
        className="before:bg-size-[500%] before:bg-position-[30%_40%]"
        bgColor={BgColors.White}
        content={
          <Pillar>
            <Image
              src={Consultation}
              alt={tPage('altText.consultationImage')}
            />
            <span className="imagetext">{tPage('profileCard.imageText')}</span>
            <span className="imagetext-inline">
              {tPage('profileCard.paragraph1')}
            </span>
            <span className="imagetext-inline">
              <A href={'https://sfep.se/'}>{tPage('profileCard.linkpre')}</A>
            </span>

            <SpaceContainer noPadding spaceTop>
              <H2 id="om-kliniken" className="scroll-mt-4 lg:scroll-mt-24">
                {tPage.rich('aboutClinic.title', {
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </H2>
              <P>
                {tPage.rich('aboutClinic.paragraph1', {
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </P>
              <P>{tPage('aboutClinic.paragraph2')}</P>
              <SpaceContainer noPadding spaceVertically>
                <Image
                  src={belowheadingImage}
                  alt={tPage('altText.consultationImage')}
                  className="max-h-svh object-cover object-center"
                />
              </SpaceContainer>
              <P>
                {tPage.rich('aboutClinic.paragraph3', {
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </P>
              <P>
                {tPage.rich('aboutClinic.paragraph4', {
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </P>

              <H3>
                {tPage.rich('aboutClinic.ourPhilosophy', {
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </H3>
              <P>
                {tPage.rich('aboutClinic.paragraph5', {
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </P>
              <A href={'/garanti#phil'}>{tPage('aboutClinic.readMore')}</A>
            </SpaceContainer>
          </Pillar>
        }
      />

      <Card
        bgColor={BgColors.Coral}
        bgPosition="right"
        content={
          <Pillar>
            <H2 white>
              {tPage.rich('operationDepartment.title', {
                strong: (chunks) => <strong>{chunks}</strong>
              })}
            </H2>
            <div className="lg:columns-2">
              <P white>
                {tPage.rich('operationDepartment.text1', {
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </P>
              <P white>
                {tPage.rich('operationDepartment.text2', {
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </P>
              <P white>
                {tPage.rich('operationDepartment.text3', {
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </P>
              <P white>
                {tPage.rich('operationDepartment.text4', {
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </P>
              <P white>
                {tPage.rich('operationDepartment.text5', {
                  strong: (chunks) => <strong>{chunks}</strong>
                })}
              </P>
            </div>
          </Pillar>
        }
      />

      <Pillar>
        <Image
          src={WaitingRoom}
          alt={tPage('altText.patientRoom')}
          className="max-h-[calc(100dvh-80px)] object-cover object-center"
        />
      </Pillar>

      <SpaceContainer noPadding>
        <Card
          bgColor={BgColors.Beige}
          className="before:bg-[30%_30%] lg:before:[background-size:200%]"
          content={
            <Pillar>
              <H2 className="text-center">
                {tPage('cta.title')}
              </H2>
              <P className="text-center">{tPage('cta.description')}</P>
              <div className="m-auto flex max-w-xs justify-center">
                <A href="/boka" className="uppercase" buttonStyle inverted>
                  {tCommon('bookNow')}
                </A>
              </div>
            </Pillar>
          }
        />
      </SpaceContainer>
    </>
  )
}
