import { CompanionSkin } from '../lib/sprites/types'
import { PixelSprite } from './PixelSprite'

interface Props {
  index: number
  skin: CompanionSkin
}

// A tiny subagent companion matching the active skin. Bobs with a per-index
// delay so a row of them ripples instead of moving in lockstep.
export function MiniCompanion({ index, skin }: Props) {
  const rows = skin.mini?.rows ?? skin.open
  const palette = skin.mini?.palette ?? skin.palette
  const size = skin.mini?.size ?? 28

  return (
    <span
      className="mini-companion companion-float"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <PixelSprite
        rows={rows}
        palette={palette}
        size={size}
        ariaLabel={`subagent ${skin.label}`}
      />
    </span>
  )
}
