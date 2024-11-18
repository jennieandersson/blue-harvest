import { P } from '../typography/P'

type CardProps = {
  title: React.ReactNode
  paragraphs: string[]
  bgColor: string // TODO: Define and set specific color types
  image?: React.ReactNode
  style?: React.CSSProperties
  oneColumn?: boolean
  twoColumns?: boolean
  threeColumns?: boolean
  bgRight?: boolean
  bgLeft?: boolean
  bgCenter?: boolean
  smallText?: boolean
  rounded?: boolean
}

export const Card = ({
  title,
  paragraphs,
  bgColor,
  image,
  oneColumn,
  twoColumns,
  threeColumns,
  bgRight,
  bgLeft,
  smallText = false,
  rounded = false
}: CardProps) => {
  return (
    <div
      className={`${rounded && 'rounded-md'} z-0 ${bgLeft && 'before:bg-[0%_50%]'} before:bg-no-repeat ${bgRight && 'before:bg-[100%_50%]'} px-6 py-8 before:bg-200 ${bgColor} relative h-full before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-card-pattern before:opacity-5`}
    >
      {title && title}

      <div
        className={`columns-1 gap-4 ${oneColumn && 'columns-1'} ${twoColumns && 'lg:columns-2'} ${threeColumns && 'lg:columns-3'}`}
      >
        {/* Image column, only shown if an image is provided */}
        {image && <div className="mb-2">{image}</div>}
        {paragraphs.map((paragraph, idx) => (
          <P key={`${paragraph}-${idx}`} color="text-white" small={smallText}>
            {paragraph}
          </P>
        ))}
      </div>
    </div>
  )
}
