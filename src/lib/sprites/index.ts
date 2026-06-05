import { CompanionSkin } from './types'
import { penguin } from './penguin'
import { cat } from './cat'
import { robot } from './robot'
import { ghost } from './ghost'
import { kara } from './kara'

export * from './types'
export * from './shared'

export const SKINS: CompanionSkin[] = [penguin, cat, robot, ghost, kara]

export const DEFAULT_SKIN_ID = penguin.id

export function getSkin(id: string): CompanionSkin {
  return SKINS.find((s) => s.id === id) ?? SKINS[0]
}
