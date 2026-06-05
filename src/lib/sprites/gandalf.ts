import type { CompanionSkin } from './types'

const PALETTE = {
  K: '#1c1a28', // dark outline
  H: '#2e2c40', // darkest hat
  G: '#504e66', // mid grey hat
  g: '#8280a0', // light hat highlight
  W: '#f0ece4', // white beard
  w: '#c0bcb0', // beard shadow
  S: '#c89868', // skin
  s: '#a07848', // skin shadow
  R: '#3e3c52', // dark robe
  r: '#2c2a3c', // robe shadow
  B: '#7a5828', // staff brown
  L: '#d8b040', // staff gold glow
}

// 16 wide x 20 tall — tall pointy hat, big white beard, staff on left
const OPEN: string[] = [
  '.......KK.......',
  '......KHHK......',
  '.....KHHHgK.....',
  '....KHHHHGgK....',
  '...KHHHHGGgK....',
  'L.KHHHGGGgK.....',
  'LKHHHHGGGgK.....',
  'BHHHHHHHHHHHHHHK',
  'BGGGGGGGGGGGGGGK',
  'BwwwSsKSSKsSwwwK',
  'BwwwSSsSSsSSwwwK',
  'BKWWWWWWWWWWWwK.',
  'BKWWWsSsWWWWK...',
  'BKWWWWsSWWWWK...',
  'BKWWWWWWWWWwK...',
  'B.KWWWWWWWWwK...',
  'B..KWWWWWWwK....',
  'B...KWWWWwK.....',
  'BRRRRRRRRRRRRRrK',
  'BRRRrRRRRRrRRRrK',
]

const CLOSED: string[] = [
  '.......KK.......',
  '......KHHK......',
  '.....KHHHgK.....',
  '....KHHHHGgK....',
  '...KHHHHGGgK....',
  'L.KHHHGGGgK.....',
  'LKHHHHGGGgK.....',
  'BHHHHHHHHHHHHHHK',
  'BGGGGGGGGGGGGGGK',
  'BwwwSsSSSsSswwwK',
  'BwwwSSSSSSSwwwwK',
  'BKWWWWWWWWWWWwK.',
  'BKWWWsSsWWWWK...',
  'BKWWWWsSWWWWK...',
  'BKWWWWWWWWWwK...',
  'B.KWWWWWWWWwK...',
  'B..KWWWWWWwK....',
  'B...KWWWWwK.....',
  'BRRRRRRRRRRRRRrK',
  'BRRRrRRRRRrRRRrK',
]

const DWARF_PALETTE = {
  K: '#1c1a28',
  A: '#848898', // metal grey helmet
  a: '#acacc0', // helmet highlight
  S: '#c89060', // skin
  s: '#a07040', // skin shadow
  B: '#8a6020', // brown beard
  b: '#5a3c10', // beard shadow
  t: '#2a2028', // dark boot
}

// 11 wide x 12 tall — horned helmet, skin face, huge brown beard, boots
const DWARF: string[] = [
  '.KK.KKK.KK.',
  '.KAAAAAAAAK',
  'KAaAAAAAAaK',
  'KKKKKKKKKKK',
  '.KSSssSsSSK',
  '.KBBBBBBBbK',
  'KBBbBBBbBBK',
  'KBBbBBBbBBK',
  'KBBBBBBBBbK',
  '.KBBBBBBbK.',
  '..KBBBBbK..',
  '...KtKKtK..',
]

export const gandalf: CompanionSkin = {
  id: 'gandalf',
  label: 'Gandalf',
  palette: PALETTE,
  open: OPEN,
  closed: CLOSED,
  size: 96,
  mini: {
    rows: DWARF,
    palette: DWARF_PALETTE,
    size: 24,
  },
}
