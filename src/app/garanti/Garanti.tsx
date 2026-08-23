import { useTranslations } from 'next-intl'

import { Pillar } from '@/components/layout/Pillar'
import { Section } from '@/components/layout/Section'
import { SpaceContainer } from '@/components/layout/SpaceContainer'
import { Card } from '@/components/surfaces/Card'
import { Li } from '@/components/surfaces/Li'
import { Ul } from '@/components/surfaces/Ul'
import { A } from '@/components/typography/A'
import { H1 } from '@/components/typography/H1'
import { H2 } from '@/components/typography/H2'
import { P } from '@/components/typography/P'

import { BgColors } from '../types'

const Garanti = () => {
  const t = useTranslations('garanti.page')
  const tCommon = useTranslations('common')
  const securityPackagePoints = Object.keys(t.raw('securityPackage.points')).map(
    (key) => t(`securityPackage.points.${key}`)
  )
  const philosophyPoints = Object.keys(t.raw('philosophy.points')).map((key) =>
    t(`philosophy.points.${key}`)
  )

  return (
    <>
      <Card
        fullWidth
        bgColor={BgColors.Coral}
        content={
          <Pillar>
            <H1 white>{t('hero.title')}</H1>
            <P white>{t('hero.intro')}</P>
            <P white>{t('hero.preamble1')}</P>
            <P white>{t('hero.preamble2')}</P>
          </Pillar>
        }
      />

      <SpaceContainer spaceVertically>
        <Pillar>
          <Section>
            <H2>{t('securityPackage.title')}</H2>
            <Ul>
              {securityPackagePoints.map((point, index) => (
                <Li key={index}>{point}</Li>
              ))}
            </Ul>
          </Section>

          <Section>
            <H2>{t('capsuleGuarantee.title')}</H2>
            <P>{t('capsuleGuarantee.description')}</P>
            <P>{t('capsuleGuarantee.price')}</P>
            <Ul>
              <Li>{t('capsuleGuarantee.points.point1')}</Li>
            </Ul>
            <A href={'/brostoperationer#complications'}>{t('capsuleGuarantee.readMoreLinkText')}</A>
          </Section>

          <Section>
            <H2>{t('followUps.title')}</H2>
            <P>{t('followUps.description')}</P>
          </Section>
        </Pillar>
      </SpaceContainer>

      <Card
        id="phil"
        fullWidth
        bgColor={BgColors.Coral}
        content={
          <Pillar>
            <H2 white>{t('philosophy.heading')}</H2>
            <P white>{t('philosophy.intro')}</P>
            <ol className="list-decimal space-y-6 pl-6 marker:text-lg marker:font-semibold marker:text-white">
              {philosophyPoints.map((point, index) => (
                <li className="text-lg text-white" key={index}>
                  {point}
                </li>
              ))}
            </ol>
            <SpaceContainer noPadding spaceTop>
              <H2 white>{t('philosophy.stabilityHeading')}</H2>
              <P white>{t('philosophy.stabilityText')}</P>
            </SpaceContainer>
            <SpaceContainer noPadding spaceTop>
              <H2 white>{t('philosophy.staffPolicyHeading')}</H2>
              <P white>{t('philosophy.staffPolicyText1')}</P>
              <P white>{t('philosophy.staffPolicyText2')}</P>
              <H2 white>{t('philosophy.serviceLevelHeading')}</H2>
              <P white>{t('philosophy.serviceLevelText')}</P>
            </SpaceContainer>
          </Pillar>
        }
      />

      <SpaceContainer noPadding>
        <Card
          bgColor={BgColors.Beige}
          className="before:bg-[30%_30%] lg:before:[background-size:200%]"
          content={
            <Pillar>
              <H2 className="text-center">
                {t('cta.title')}
              </H2>
              <P className="text-center">{t('cta.description')}</P>
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
export default Garanti
