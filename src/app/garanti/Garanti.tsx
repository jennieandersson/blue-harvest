import { useTranslations } from 'next-intl'
import { H1 } from '../components/typography/H1'
import { P } from '../components/typography/P'
import { SpaceContainer } from '../components/layout/SpaceContainer'
import { SimpleCard } from '../components/surfaces/SimpleCard'
import { H2 } from '../components/typography/H2'
import { Ul } from '../components/surfaces/Ul'
import { Li } from '../components/surfaces/Li'
import { Pillar } from '../components/layout/Pillar'
import { Section } from '../components/layout/Section'
import { BgColors } from '../types'

const Garanti = () => {
  const t = useTranslations('garanti')
  const securityPackagePoints = Object.keys(
    t.raw('securityPackage.points')
  ).map((key) => t(`securityPackage.points.${key}`))

  return (
    <main className="mb-36 flex flex-col">
      <SimpleCard
        fullWidth
        bgColor={BgColors.Green}
        content={
          <div className="mx-auto max-w-3xl px-4 py-8">
            <P white>{t('preamble1')}</P>
            <P white>{t('preamble2')}</P>
          </div>
        }
      />

      <SpaceContainer spaceVertically>
        <Pillar>
          <Section>
            <H1>{t('title')}</H1>
            <P>{t('intro')}</P>
          </Section>

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
            <P>{t('capsuleGuarantee.price')}</P>
            <Ul>
              <Li>{t('capsuleGuarantee.points.point1')}</Li>
            </Ul>
          </Section>

          <Section>
            <H2>{t('followUps.title')}</H2>
            <P>{t('followUps.description')}</P>
          </Section>
        </Pillar>
      </SpaceContainer>
    </main>
  )
}
export default Garanti
