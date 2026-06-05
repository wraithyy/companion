import { CompanionSkin } from './types'

const PALETTE = {
  D: '#3a3a5a', // dark frame
  M: '#9aa6c4', // metal
  C: '#4cc9f0', // eye / screen glow
  W: '#f7f7ff', // mouth screen
  A: '#e63946', // antenna light
}

const OPEN: string[] = [
  '.......A........',
  '.......D........',
  '..DDDDDDDDDDDD..',
  '..DMMMMMMMMMMD..',
  '..DMCCMMMMCCMD..',
  '..DMCCMMMMCCMD..',
  '..DMMMMMMMMMMD..',
  '..DMMWWWWWWMMD..',
  '..DMMMMMMMMMMD..',
  '..DDDDDDDDDDDD..',
  '..DDDDDDDDDDDD..',
  '..DMMMMMMMMMMD..',
  '..DMMMMMMMMMMD..',
  '..DDDDDDDDDDDD..',
  '....DD....DD....',
  '....DD....DD....',
]

const CLOSED: string[] = [
  '.......A........',
  '.......D........',
  '..DDDDDDDDDDDD..',
  '..DMMMMMMMMMMD..',
  '..DMMMMMMMMMMD..',
  '..DMDDMMMMDDMD..',
  '..DMMMMMMMMMMD..',
  '..DMMWWWWWWMMD..',
  '..DMMMMMMMMMMD..',
  '..DDDDDDDDDDDD..',
  '..DDDDDDDDDDDD..',
  '..DMMMMMMMMMMD..',
  '..DMMMMMMMMMMD..',
  '..DDDDDDDDDDDD..',
  '....DD....DD....',
  '....DD....DD....',
]

export const robot: CompanionSkin = {
  id: 'robot',
  label: 'Robot',
  palette: PALETTE,
  open: OPEN,
  closed: CLOSED,
  size: 88,
}
