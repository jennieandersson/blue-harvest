import { forwardRef } from 'react'

type ButtonWithIconProps = {
  label: string // Accessibility label
  icon: JSX.Element
  onClick: () => void
  className?: string
}

export const ButtonWithIcon = forwardRef<
  HTMLButtonElement,
  ButtonWithIconProps
>(({ label, icon, onClick, className }, ref) => (
  <button
    ref={ref}
    onClick={onClick}
    aria-label={label}
    className={`rounded-full p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${className}`}
  >
    {icon}
  </button>
))

ButtonWithIcon.displayName = 'ButtonWithIcon'
