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

export const penguin: CompanionSkin = {
  id: 'penguin',
  label: 'Penguin',
  palette: PALETTE,
  open: OPEN,
  closed: CLOSED,
  size: 88,
}
