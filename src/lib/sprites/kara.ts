import { CompanionSkin } from './types'

const PALETTE = {
  C: '#5b3fb0', // cap crown (purple)
  V: '#34227a', // cap brim
  W: '#f2ead2', // cap logo + teeth
  S: '#cda87f', // skin
  N: '#7a5832', // nose
  H: '#271a10', // hair
  K: '#120c06', // eyes
  M: '#5c1c1c', // open mouth
  O: '#6a6b76', // phone
  F: '#c6a074', // hand
  R: '#e6552a', // cigarette ember
  Z: '#b8b8c0', // cigarette smoke
}

// 16-wide mascot style to match the other skins: a chunky head filling the
// frame, purple cap with a white logo, dark hair mass framing a tan face, bold
// eyes, a big nose, a grey phone held to the ear, and an open mouth with a
// teeth strip (one gap = the missing-teeth nod, kept subtle).
const OPEN: string[] = [
  '....CCCCCCCC....',
  '...CCCCCCCCCC...',
  '...CCWWWWWWCC...',
  '..VVVVVVVVVVVV..',
  '..VVVVVVVVVVVVV.',
  '.HHHSSSSSSSSHHH.',
  'HHHSKKSSSSKKSHHH',
  'HHHSKKSSSSKKSHHH',
  'HHHSSSSNNSSSSHHH',
  'OOHSSSSNNSSSSHHH',
  'FOHSSSSSSSSSSHHH',
  'FOHSSWWWMWWSSHHH',
  'FOHSSMMMMMMSSHHH',
  'FOHSSSSSSSSSSHHH',
  'HHHHSSSSSSSSHHHH',
  'HHHHHHHHHHHHHHHH',
]

const CLOSED: string[] = [
  '....CCCCCCCC....',
  '...CCCCCCCCCC...',
  '...CCWWWWWWCC...',
  '..VVVVVVVVVVVV..',
  '..VVVVVVVVVVVVV.',
  '.HHHSSSSSSSSHHH.',
  'HHHSSSSSSSSSSHHH',
  'HHHSKKSSSSKKSHHH',
  'HHHSSSSNNSSSSHHH',
  'OOHSSSSNNSSSSHHH',
  'FOHSSSSSSSSSSZHH',
  'FOHSSSSSSSSSZSHH',
  'FOHSSSMMWWWWRHHH',
  'FOHSSSSSSSSSSHHH',
  'HHHHSSSSSSSSHHHH',
  'HHHHHHHHHHHHHHHH',
]

// Subagents render as green beer bottles instead of mini Karas.
const BOTTLE_PALETTE = {
  B: '#2f7d32', // green glass
  D: '#16512a', // glass shadow
  G: '#62b35f', // glass highlight
  Y: '#d4a83a', // crown cap
  L: '#f2ead2', // label
  T: '#a83232', // label accent
}

const BOTTLE: string[] = [
  '....YY....',
  '....YY....',
  '....BD....',
  '....BD....',
  '....BD....',
  '...BBBD...',
  '..GBBBDD..',
  '..GBBBBD..',
  '..BBBBBD..',
  '..LLLLLL..',
  '..LTTTTL..',
  '..LLLLLL..',
  '..GBBBBD..',
  '..BBBBBD..',
  '..BBBBBD..',
  '...BBBD...',
]

export const kara: CompanionSkin = {
  id: 'kara',
  label: 'Kara',
  palette: PALETTE,
  open: OPEN,
  closed: CLOSED,
  size: 88,
  mini: {
    rows: BOTTLE,
    palette: BOTTLE_PALETTE,
    size: 22,
  },
}
