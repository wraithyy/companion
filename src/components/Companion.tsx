import { CompanionState } from '../lib/eventMap'

interface Props {
  state: CompanionState
}

const STATE_EMOJI: Record<CompanionState, string> = {
  idle: '😴',
  thinking: '🤔',
  reading: '📖',
  editing: '✍️',
  working: '⚙️',
  searching: '🔍',
  asking: '❓',
  tidying: '🧹',
  done: '✅',
  sleeping: '💤',
}

const STATE_ANIMATION: Record<CompanionState, string> = {
  idle: 'companion-breathe',
  thinking: 'companion-float',
  reading: 'companion-tilt',
  editing: 'companion-bounce',
  working: 'companion-spin',
  searching: 'companion-sway',
  asking: 'companion-pulse',
  tidying: 'companion-sway',
  done: 'companion-pop',
  sleeping: 'companion-breathe',
}

export function Companion({ state }: Props) {
  return (
    <div className={`companion companion--${state}`}>
      <span
        className={`companion-emoji ${STATE_ANIMATION[state]}`}
        role="img"
        aria-label={`companion is ${state}`}
      >
        {STATE_EMOJI[state]}
      </span>
    </div>
  )
}
