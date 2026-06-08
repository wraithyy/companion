import type { CompanionSkin } from './types'

const PALETTE = {
  K: '#0a0a0f', // outline
  H: '#5d5a6f', // dark cool grey — hat/robe shadow
  h: '#a18e87', // warm grey-pink — hat/robe main
  L: '#ded8d4', // light highlight
  B: '#6b444a', // dark reddish-brown — staff/crook
  S: '#ebaf8a', // skin
  s: '#ae7060', // skin shadow
  W: '#a6b8c7', // beard cool blue-grey
}

// 30 wide x 40 tall — extracted from reference pixel art at ~6px/cell
// staff + crook upper-left, tall hat upper-right, beard center
const OPEN: string[] = [
  '....................hhhhhhhh..',
  '....................hhhhhHHH..',
  '..................hhhhhHHHHHHH',
  '..................hhhhhHHKKHKH',
  '................hhhhhHHKKKKKKH',
  '................hhhhhHHH....hH',
  '.hhhBh.........hhhhhhHHH....hH',
  'hBhhhhh.......hhhhhhhHHH......',
  'BhBKBhK......hhhhhhHHHHH......',
  'BhBKBhK......hhhhhhHHHHHH.....',
  'BKK.KBK.....hhhhhhhhHHHHH.....',
  'BKKKKBKhhhhhhhhhhhhhHHHHHH....',
  '..KhBKKKKKKKKKKhhhhhhHHhhh....',
  '..BhBKKKKKKKKKBBKKKKhhHHhhhKh.',
  '..hBBKKKKKKKSKSSSKSWWsBBKKKKK.',
  '....BKKHKKKKSKSSSKSWWhBBKKKKK.',
  '....BKK..hhKWLSBSSWWWWKHKKK...',
  '....BKK....WWWWHBWWWWWWw......',
  '....BKK....WWWhShWWWWKKL......',
  '....BKK....WWWWWWWWWWKHW......',
  '..hSshh..hhW........WWHhhh....',
  '..SSsssShhhhW.......WWHhhH....',
  '..SShKKhBhhhh.....WWWhHhhHWW..',
  '..hSssssKhhhH.....WWWKKhhhhH..',
  '..hssssKKhhhH.....WWWKKhhhhH..',
  '..hhBKKKKhhHHWWWWWWWKKhhhhHHH.',
  '....BKKKKhHHHWWWWWWWKShhhhhhhH',
  '....BKKKKhHKHHHLWWWKKSShhhhhhH',
  '....BKKKKhHKhhhHWKHhSShhhhHWH.',
  '....BKKKKHHKhhhKWKHKShhhKhH...',
  '....BKKKKHKhhBBHWWBhHsBhhKhH..',
  '....BKKKKKhhhBBWWKBhhHHKKKhH..',
  '....BKKKKhhhBBWWKKBhhHHKKKHH..',
  '....BKKKKhhhBBWKKKBhhhHKKHKK..',
  '....BKKKKhhhBBWKKBBhhHHHH.....',
  '....BKKKKhhhBBKKhKBhhhHHH.....',
  '....BKKKhhhhhBBKHHKBBhhhhHhH..',
  '....BKKKhhhhBBBHHHHKBhhhhHHH..',
  '....BKKKhBBBBKKHHHHKKBBBBKKK..',
  '....HKKKHKKKKKKKKKHKHKKKKKKK..',
]

const CLOSED: string[] = [
  '....................hhhhhhhh..',
  '....................hhhhhHHH..',
  '..................hhhhhHHHHHHH',
  '..................hhhhhHHKKHKH',
  '................hhhhhHHKKKKKKH',
  '................hhhhhHHH....hH',
  '.hhhBh.........hhhhhhHHH....hH',
  'hBhhhhh.......hhhhhhhHHH......',
  'BhBKBhK......hhhhhhHHHHH......',
  'BhBKBhK......hhhhhhHHHHHH.....',
  'BKK.KBK.....hhhhhhhhHHHHH.....',
  'BKKKKBKhhhhhhhhhhhhhHHHHHH....',
  '..KhBKKKKKKKKKKhhhhhhHHhhh....',
  '..BhBKKKKKKKKKBBKKKKhhHHhhhKh.',
  '..hBBKKKKKKKSSSSSSSWWsBBKKKKK.',
  '....BKKHKKKKSSSSSSSWWhBBKKKKK.',
  '....BKK..hhKWLhBhhWWWWKHKKK...',
  '....BKK....WWWWHBWWWWWWw......',
  '....BKK....WWWhShWWWWKKL......',
  '....BKK....WWWWWWWWWWKHW......',
  '..hSshh..hhW........WWHhhh....',
  '..SSsssShhhhW.......WWHhhH....',
  '..SShKKhBhhhh.....WWWhHhhHWW..',
  '..hSssssKhhhH.....WWWKKhhhhH..',
  '..hssssKKhhhH.....WWWKKhhhhH..',
  '..hhBKKKKhhHHWWWWWWWKKhhhhHHH.',
  '....BKKKKhHHHWWWWWWWKShhhhhhhH',
  '....BKKKKhHKHHHLWWWKKSShhhhhhH',
  '....BKKKKhHKhhhHWKHhSShhhhHWH.',
  '....BKKKKHHKhhhKWKHKShhhKhH...',
  '....BKKKKHKhhBBHWWBhHsBhhKhH..',
  '....BKKKKKhhhBBWWKBhhHHKKKhH..',
  '....BKKKKhhhBBWWKKBhhHHKKKHH..',
  '....BKKKKhhhBBWKKKBhhhHKKHKK..',
  '....BKKKKhhhBBWKKBBhhHHHH.....',
  '....BKKKKhhhBBKKhKBhhhHHH.....',
  '....BKKKhhhhhBBKHHKBBhhhhHhH..',
  '....BKKKhhhhBBBHHHHKBhhhhHHH..',
  '....BKKKhBBBBKKHHHHKKBBBBKKK..',
  '....HKKKHKKKKKKKKKHKHKKKKKKK..',
]

const DWARF_PALETTE = {
  K: '#1c1820', // outline
  I: '#525060', // iron helm dark
  i: '#8a88a0', // helm highlight
  S: '#c89060', // skin
  s: '#a07040', // skin shadow / brow
  B: '#4a2010', // dark beard
  b: '#6a3820', // beard highlight
}

// 11 wide x 12 tall — iron helm with horns, visible dark eyes, massive dark beard
const DWARF: string[] = [
  '.KK.KKK.KK.',
  '.KiIIIIIiK.',
  'KIIIiIiIIIK',
  'KKKKKKKKKKK',
  '.KSSSSSSsSK',
  '.KsKSSSKsSK',
  '.KSSSSSSsSK',
  'KKKbBBbBKKK',
  'KBbBBBBBbBK',
  'KBBbBBBbBBK',
  '.KBBBBBBbK.',
  '..KBBBBbK..',
]

export const wizard: CompanionSkin = {
  id: 'wizard',
  label: 'Pixel Wizard',
  palette: PALETTE,
  open: OPEN,
  closed: CLOSED,
  size: 96,
  mini: {
    rows: DWARF,
    palette: DWARF_PALETTE,
    size: 32,
  },
}
