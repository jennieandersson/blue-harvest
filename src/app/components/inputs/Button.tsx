type ButtonProps = {
  text: string
  inverted?: boolean
  small?: boolean
  fullWidth?: boolean
  className?: string
}

export const Button = ({
  text,
  inverted,
  small,
  fullWidth,
  className
}: ButtonProps) => {
  return (
    <button
      className={`${className} ${fullWidth ? 'w-full' : ''} rounded-xl ${small ? 'border-2' : 'border-4'} ${inverted ? 'border-black' : 'border-white'} bg-transparent ${small ? 'p-2' : 'px-16 py-5 text-lg'} ${inverted ? 'text-black' : 'text-white'} ${inverted ? 'hover:border-slate-500 hover:text-slate-500' : 'hover:border-beige hover:text-beige'}`}
    >
      {text}
    </button>
  )
}
