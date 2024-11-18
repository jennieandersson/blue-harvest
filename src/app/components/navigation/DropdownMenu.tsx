import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../inputs/Button'
import { useTranslations } from 'next-intl'
import { ButtonWithIcon } from '../inputs/ButtonWithIcon'
import { CloseIcon } from '../icons/CloseIcon'
import { MenuIcon } from '../icons/MenuIcon'
import { ChevronIcon } from '../icons/ChevronIcon'

export const DropdownMenu: React.FC = () => {
  const t = useTranslations()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  const renderLinks = () => {
    const links = [
      {
        text: t('dropdown.clinic'),
        href: '/',
        id: crypto.randomUUID()
      },
      {
        text: t('dropdown.breastSurgeries'),
        href: '/brostoperationer',
        id: crypto.randomUUID()
      },
      {
        text: t('dropdown.implants'),
        href: '/brostoperationer/implantaten',
        id: crypto.randomUUID()
      },
      {
        text: t('dropdown.skinInjections'),
        href: '/hud-och-injektioner',
        id: crypto.randomUUID()
      },
      {
        text: t('dropdown.ourStaff'),
        href: '/var-personal',
        id: crypto.randomUUID()
      },
      {
        text: t('dropdown.price'),
        href: '/priser',
        id: crypto.randomUUID()
      }
    ]

    return links.map(({ text, href, id }) => (
      <li key={id}>
        <Link href={href} className="hover:underline">
          {text}
        </Link>
      </li>
    ))
  }

  return (
    <div className="relative z-50 flex items-center">
      <ButtonWithIcon
        onClick={toggleMenu}
        icon={isOpen ? <CloseIcon /> : <MenuIcon />}
        label={isOpen ? t('common.close') : t('common.open')}
      />

      {isOpen && (
        <div className="before:bg- absolute -right-gapSpace bottom-[60px] z-50 flex w-64 flex-col rounded-[16px_0px_0px_0px] bg-[#EAE6E3] p-[10px] pl-gapSpace pt-10 before:absolute before:left-0 before:top-0 before:z-[-1] before:h-full before:w-full before:bg-card-pattern before:bg-500 before:bg-[20%_20%] before:opacity-20">
          <ButtonWithIcon
            className="-translate-y-4 self-end"
            onClick={() => setIsOpen(false)}
            icon={<ChevronIcon />}
            label={t('common.close')}
          />
          <ul className="mb-gapSpace flex w-full flex-col gap-5">
            {renderLinks()}
          </ul>
          <Button inverted small text={t('common.bookFreeConsultation')} />
        </div>
      )}
    </div>
  )
}
