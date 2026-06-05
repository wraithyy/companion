import { CompanionState } from '../eventMap'

export type PixelRows = readonly string[]
export type Palette = Record<string, string>

// A selectable companion. Only the character (body + expression) varies per
// skin; accessories and animations are shared across all skins.
export interface CompanionSkin {
  id: string
  label: string
  palette: Palette
  open: PixelRows // neutral / eyes-open expression
  closed: PixelRows // sleepy / eyes-closed expression
  size: number // rendered width in px
  // Optional override for subagent (mini) companions. When absent they reuse
  // the main `open` sprite + palette.
  mini?: {
    rows: PixelRows
    palette: Palette
    size?: number // rendered width in px (defaults to the mini default)
  }
}

export type { CompanionState }
