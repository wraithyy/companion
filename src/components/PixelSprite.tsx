import { Palette, PixelRows } from '../lib/sprites/types'

interface Props {
  rows: PixelRows
  size: number // rendered width in px
  palette: Palette
  className?: string
  ariaLabel?: string
}

// Renders a pixel grid as crisp SVG rects. One <rect> per opaque pixel.
export function PixelSprite({ rows, size, palette, className, ariaLabel }: Props) {
  const cols = rows.reduce((max, r) => Math.max(max, r.length), 0)
  const heightUnits = rows.length

  const rects = rows.flatMap((row, y) =>
    row.split('').flatMap((ch, x) => {
      const fill = palette[ch]
      if (!fill) return []
      return [
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />,
      ]
    }),
  )

  return (
    <svg
      className={className}
      width={size}
      height={cols ? (size / cols) * heightUnits : size}
      viewBox={`0 0 ${cols} ${heightUnits}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label={ariaLabel}
    >
      {rects}
    </svg>
  )
}
