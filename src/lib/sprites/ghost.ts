import { CompanionSkin } from './types'

const PALETTE = {
  B: '#dbe9ff', // body
  E: '#9bb8e0', // outline
  P: '#2a2a3a', // eyes
  M: '#6a7a9a', // mouth
}

const OPEN: string[] = [
  '....EEEEEEEE....',
  '..EEBBBBBBBBEE..',
  '.EBBBBBBBBBBBBE.',
  '.EBBBBBBBBBBBBE.',
  'EBBPPBBBBPPBBBBE',
  'EBBPPBBBBPPBBBBE',
  'EBBBBBBBBBBBBBBE',
  'EBBBBBMMMMBBBBBE',
  'EBBBBBBBBBBBBBBE',
  'EBBBBBBBBBBBBBBE',
  'EBBBBBBBBBBBBBBE',
  '.EBBBBBBBBBBBBE.',
  '.EBBBBBBBBBBBBE.',
  'EBBBBBBBBBBBBBBE',
  'EBB.EBB.EBB.EBBE',
  '.B...B...B...B..',
]

const CLOSED: string[] = [
  '....EEEEEEEE....',
  '..EEBBBBBBBBEE..',
  '.EBBBBBBBBBBBBE.',
  '.EBBBBBBBBBBBBE.',
  'EBBBBBBBBBBBBBBE',
  'EBBMMBBBBMMBBBBE',
  'EBBBBBBBBBBBBBBE',
  'EBBBBBMMMMBBBBBE',
  'EBBBBBBBBBBBBBBE',
  'EBBBBBBBBBBBBBBE',
  'EBBBBBBBBBBBBBBE',
  '.EBBBBBBBBBBBBE.',
  '.EBBBBBBBBBBBBE.',
  'EBBBBBBBBBBBBBBE',
  'EBB.EBB.EBB.EBBE',
  '.B...B...B...B..',
]

export const ghost: CompanionSkin = {
  id: 'ghost',
  label: 'Ghost',
  palette: PALETTE,
  open: OPEN,
  closed: CLOSED,
  size: 88,
}
