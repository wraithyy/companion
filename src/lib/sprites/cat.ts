import { CompanionSkin } from './types'

const PALETTE = {
  F: '#f4a261', // fur
  K: '#3a2a1a', // outline / closed eyes
  W: '#fff6e9', // muzzle
  P: '#241a10', // pupil
  N: '#ff8fab', // nose
  I: '#a7d676', // eye iris
}

const OPEN: string[] = [
  '..FF........FF..',
  '.FFFF......FFFF.',
  '.FFFFFFFFFFFFFF.',
  'FFFFFFFFFFFFFFFF',
  'FFFIIFFFFFFIIFFF',
  'FFFIPFFFFFFPIFFF',
  'FFFFFFWWWWFFFFFF',
  'FFFFFWWNNWWFFFFF',
  'FFFFFFWWWWFFFFFF',
  'FFFFFFFFFFFFFFFF',
  '.FFFFFFFFFFFFFF.',
  '.FFFFFFFFFFFFFF.',
  '..FFFFFFFFFFFF..',
  '..FFFFFFFFFFFF..',
  '...FFF..FFF.....',
  '...FFF..FFF.....',
]

const CLOSED: string[] = [
  '..FF........FF..',
  '.FFFF......FFFF.',
  '.FFFFFFFFFFFFFF.',
  'FFFFFFFFFFFFFFFF',
  'FFFFFFFFFFFFFFFF',
  'FFFKKFFFFFFKKFFF',
  'FFFFFFWWWWFFFFFF',
  'FFFFFWWNNWWFFFFF',
  'FFFFFFWWWWFFFFFF',
  'FFFFFFFFFFFFFFFF',
  '.FFFFFFFFFFFFFF.',
  '.FFFFFFFFFFFFFF.',
  '..FFFFFFFFFFFF..',
  '..FFFFFFFFFFFF..',
  '...FFF..FFF.....',
  '...FFF..FFF.....',
]

export const cat: CompanionSkin = {
  id: 'cat',
  label: 'Cat',
  palette: PALETTE,
  open: OPEN,
  closed: CLOSED,
  size: 88,
}
