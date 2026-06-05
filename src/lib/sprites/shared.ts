import { CompanionState } from '../eventMap'
import { Palette, PixelRows } from './types'

// Palette for the shared accessory sprites (icons the penguin/cat/robot holds).
export const ACC_PALETTE: Palette = {
  K: '#1b1b2f',
  W: '#f7f7ff',
  R: '#e63946',
  Y: '#ffd166',
  S: '#9aa6c4',
  G: '#2ec4b6',
  C: '#4cc9f0',
  M: '#b5651d',
}

export type AccessoryKey =
  | 'book'
  | 'pencil'
  | 'gear'
  | 'magnifier'
  | 'question'
  | 'broom'
  | 'check'
  | 'zzz'
  | 'bubble'

// 7x7 accessory sprites, reused by every skin.
export const ACCESSORIES: Record<AccessoryKey, PixelRows> = {
  book: [
    '.......',
    '.RRRRR.',
    '.RWWWR.',
    '.RWWWR.',
    '.RWWWR.',
    '.RRRRR.',
    '.......',
  ],
  pencil: [
    '.....YY',
    '....YYO',
    '...YYO.',
    '..YYY..',
    '.YYY...',
    'SYY....',
    'SS.....',
  ],
  gear: [
    '..S.S..',
    '.SSSSS.',
    'SSSWSSS',
    'SSWKWSS',
    'SSSWSSS',
    '.SSSSS.',
    '..S.S..',
  ],
  magnifier: [
    '.CCC...',
    'C...C..',
    'C...C..',
    'C...C..',
    '.CCC...',
    '...KK..',
    '....KK.',
  ],
  question: [
    '.YYYY..',
    'YY..YY.',
    '....YY.',
    '...YY..',
    '..YY...',
    '.......',
    '..YY...',
  ],
  broom: [
    '...M...',
    '...M...',
    '...M...',
    '..YYY..',
    '.YYYYY.',
    'YYYYYYY',
    'Y.Y.Y.Y',
  ],
  check: [
    '......G',
    '.....GG',
    'G...GG.',
    'GG.GG..',
    '.GGG...',
    '..G....',
    '.......',
  ],
  zzz: [
    '..CCCC.',
    '....CC.',
    '...CC..',
    '..CC...',
    '..CCCC.',
    '.......',
    '.......',
  ],
  bubble: [
    '.CCCCC.',
    'CCCCCCC',
    'CCCCCCC',
    '.CCCCC.',
    '...C...',
    '..C....',
    '.C.....',
  ],
}

// States that render the closed/sleepy expression.
export const CLOSED_STATES: ReadonlySet<CompanionState> = new Set<CompanionState>([
  'idle',
  'sleeping',
])

// Which accessory (and its animation) accompanies each state.
export const STATE_ACCESSORY: Record<
  CompanionState,
  { key: AccessoryKey | null; anim: string }
> = {
  idle: { key: null, anim: '' },
  sleeping: { key: 'zzz', anim: 'acc-float' },
  thinking: { key: 'bubble', anim: 'acc-float' },
  reading: { key: 'book', anim: 'acc-bob' },
  editing: { key: 'pencil', anim: 'acc-bob' },
  working: { key: 'gear', anim: 'acc-spin' },
  searching: { key: 'magnifier', anim: 'acc-bob' },
  asking: { key: 'question', anim: 'acc-float' },
  tidying: { key: 'broom', anim: 'acc-bob' },
  done: { key: 'check', anim: 'acc-pop' },
}

// Body animation per state (skin-agnostic, transform-only).
export const STATE_ANIMATION: Record<CompanionState, string> = {
  idle: 'companion-breathe',
  thinking: 'companion-float',
  reading: 'companion-tilt',
  editing: 'companion-bounce',
  working: 'companion-bounce',
  searching: 'companion-sway',
  asking: 'companion-pulse',
  tidying: 'companion-sway',
  done: 'companion-pop',
  sleeping: 'companion-breathe',
}
