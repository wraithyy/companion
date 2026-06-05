import type { CompanionSkin } from './types'

const PALETTE = {
  K: '#1c1a28',
  H: '#2e2c40',
  G: '#504e66',
  g: '#8280a0',
  W: '#f0ece4',
  w: '#c0bcb0',
  F: '#c89868',
  f: '#a07848',
  R: '#3e3c52',
  r: '#2c2a3c',
  B: '#7a5828',
  b: '#4a3418',
  L: '#d8b040',
}

// 14 wide — tall pointy hat, big white beard, staff on left
const OPEN: string[] = [
  '...KgK........',
  '..KGGgK.......',
  '.KHGGGgK......',
  '.KHHGGGgK.....',
  '.KHHHGGGgK....',
  'KKKKKKKKKKKgK.',
  'KGGGGGGGGGGGgK',
  'KwWWWWWWWWWwwK',
  'KwWWWSKKSWWwwK',
  'KwWWWFFFFWWwwK',
  'KwWWWWWWWWWwwK',
  'KwWWWWWWWWWwwK',
  'LBRRRRRRRRRRrK',
  'bBRRrRRRRrRRrK',
  'bBRRrRRRRrRRrK',
  'bBRRRRRRRRRRrK',
  '.bKRRRRRRRRrK.',
  '..KbKKKKKKbK..',
]

const CLOSED: string[] = [
  '...KgK........',
  '..KGGgK.......',
  '.KHGGGgK......',
  '.KHHGGGgK.....',
  '.KHHHGGGgK....',
  'KKKKKKKKKKKgK.',
  'KGGGGGGGGGGGgK',
  'KwWWWWWWWWWwwK',
  'KwWWWSfffWWwwK',
  'KwWWWFFFFWWwwK',
  'KwWWWWWWWWWwwK',
  'KwWWWWWWWWWwwK',
  'LBRRRRRRRRRRrK',
  'bBRRrRRRRrRRrK',
  'bBRRrRRRRrRRrK',
  'bBRRRRRRRRRRrK',
  '.bKRRRRRRRRrK.',
  '..KbKKKKKKbK..',
]

const DWARF_PALETTE = {
  K: '#1c1a28',
  H: '#4c3c2c',
  h: '#786050',
  F: '#c89060',
  B: '#9a7830',
  b: '#6a5020',
  T: '#5a3020',
  t: '#3c1e10',
}

// 10 wide — leather helmet, tiny face, huge beard, stubby body
const DWARF: string[] = [
  '..KHHHHK..',
  '.KHhHHhHK.',
  'KHHhHHhHHK',
  '..KFFFFK..',
  '.KBBBBBbK.',
  'KBBBBBBBbK',
  'KBBTTTTBbK',
  'KbBTTTTbbK',
  'KbbTtTTbbK',
  '.KbTtTTbK.',
  '..KbKKbK..',
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
    size: 22,
  },
}
