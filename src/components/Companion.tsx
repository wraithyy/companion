import { CompanionState } from '../lib/eventMap'
import { CompanionSkin } from '../lib/sprites/types'
import {
  ACCESSORIES,
  ACC_PALETTE,
  CLOSED_STATES,
  STATE_ACCESSORY,
  STATE_ANIMATION,
} from '../lib/sprites/shared'
import { PixelSprite } from './PixelSprite'

interface Props {
  state: CompanionState
  skin: CompanionSkin
}

export function Companion({ state, skin }: Props) {
  const face = CLOSED_STATES.has(state) ? skin.closed : skin.open
  const accessory = STATE_ACCESSORY[state]

  return (
    <div className={`companion companion--${state}`}>
      <div className={`companion-sprite ${STATE_ANIMATION[state]}`}>
        <PixelSprite
          rows={face}
          palette={skin.palette}
          size={skin.size}
          ariaLabel={`${skin.label} is ${state}`}
        />
      </div>
      {accessory.key && (
        <div className={`companion-accessory ${accessory.anim}`}>
          <PixelSprite
            rows={ACCESSORIES[accessory.key]}
            palette={ACC_PALETTE}
            size={36}
            ariaLabel=""
          />
        </div>
      )}
    </div>
  )
}
