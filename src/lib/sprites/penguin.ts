import { CompanionSkin } from './types'

const PALETTE = {
  K: '#1b1b2f', // body
  W: '#f7f7ff', // belly / sclera
  O: '#ff9f1c', // beak / feet
  P: '#101020', // pupil
}

const OPEN: string[] = [
  '......KKKK......',
  '.....KKKKKK.....',
  '....KKKKKKKK....',
  '...KKKKKKKKKK...',
  '...KKWWKKWWKK...',
  '...KKWPKKPWKK...',
  '...KKKKOOKKKK...',
  '..KKKKWWWWKKKK..',
  '.KKKWWWWWWWWKKK.',
  '.KKWWWWWWWWWWKK.',
  '.KKWWWWWWWWWWKK.',
  '.KKWWWWWWWWWWKK.',
  '..KKWWWWWWWWKK..',
  '...KKWWWWWWKK...',
  '...KKKKKKKKKK...',
  '....OOO..OOO....',
]

const CLOSED: string[] = [
  '......KKKK......',
  '.....KKKKKK.....',
  '....KKKKKKKK....',
  '...KKKKKKKKKK...',
  '...KKKKKKKKKK...',
  '...KKWWKKWWKK...',
  '...KKKKOOKKKK...',
  '..KKKKWWWWKKKK..',
  '.KKKWWWWWWWWKKK.',
  '.KKWWWWWWWWWWKK.',
  '.KKWWWWWWWWWWKK.',
  '.KKWWWWWWWWWWKK.',
  '..KKWWWWWWWWKK..',
  '...KKWWWWWWKK...',
  '...KKKKKKKKKK...',
  '....OOO..OOO....',
]

const EGG_PALETTE = {
  K: '#1b1b2f',
  W: '#f7f7ff',
  O: '#ff9f1c',
  P: '#101020',
  E: '#f5f5f5',
  e: '#c8c0b0',
}

// Top half of the penguin emerging from an egg shell — subagents are hatchlings.
const EGG: string[] = [
  '......KKKK......',
  '.....KKKKKK.....',
  '....KKKKKKKK....',
  '...KKKKKKKKKK...',
  '...KKWWKKWWKK...',
  '...KKWPKKPWKK...',
  '...KKKKOOKKKK...',
  '..KKKKWWWWKKKK..',
  'eEEEeEEEEEEeEEee',
  'EEEEEEEEEEEEEEEE',
  'EEEEEEEEEEEEEEEE',
  'EEEEEEEEEEEEEEEE',
  '.EEEEEEEEEEEEEE.',
  '.EEEEEEEEEEEEEE.',
  '..EEEEEEEEEEEE..',
  '....EEEEEEEE....',
  '......EEEE......',
  '.......EE.......',
]

export const penguin: CompanionSkin = {
  id: 'penguin',
  label: 'Penguin',
  palette: PALETTE,
  open: OPEN,
  closed: CLOSED,
  size: 88,
  mini: {
    rows: EGG,
    palette: EGG_PALETTE,
    size: 40,
  },
}
