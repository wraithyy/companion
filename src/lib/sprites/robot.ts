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

const DISK_PALETTE = {
  D: '#0f0f1a',
  M: '#9ab0c8',
  L: '#e0ddf0',
  l: '#888898',
  a: '#22dd66',
}

// 3.5" floppy disk — subagents carry data like good robots do.
const DISK: string[] = [
  'DDDDDDDDDl',
  'DLLLLLLLLD',
  'DLLLLLLLLD',
  'DLLaLLLLLD',
  'DLLLLLLLLD',
  'DDDDDDDDDD',
  'DMMMMMMMMD',
  'DMM....MMD',
  'DMMMMMMMMD',
  'DDDDDDDDDD',
]

export const robot: CompanionSkin = {
  id: 'robot',
  label: 'Robot',
  palette: PALETTE,
  open: OPEN,
  closed: CLOSED,
  size: 88,
  mini: {
    rows: DISK,
    palette: DISK_PALETTE,
    size: 24,
  },
}
