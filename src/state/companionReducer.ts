import { CompanionState, EventMappingResult } from '../lib/eventMap'

export interface CompanionReducerState {
  state: CompanionState
  miniCount: number
  active: boolean
  lastTool: string | null
}

export type CompanionAction =
  | { type: 'EVENT'; result: EventMappingResult; tool: string | null }
  | { type: 'IDLE_TIMEOUT' }

export const initialState: CompanionReducerState = {
  state: 'idle',
  miniCount: 0,
  active: false,
  lastTool: null,
}

// States that mean "no work in flight" — the companion should rest, not look busy.
const RESTING: ReadonlySet<CompanionState> = new Set<CompanionState>([
  'idle',
  'sleeping',
  'done',
])

export function companionReducer(
  state: CompanionReducerState,
  action: CompanionAction,
): CompanionReducerState {
  switch (action.type) {
    case 'EVENT': {
      const { result, tool } = action
      const active = !RESTING.has(result.state)

      // A turn ending (done) or a session boundary (idle/sleeping) clears any
      // lingering subagent minis. Otherwise spawn/remove per the event.
      const miniCount = !active
        ? 0
        : result.spawnMini
          ? state.miniCount + 1
          : result.removeMini
            ? Math.max(0, state.miniCount - 1)
            : state.miniCount

      return { state: result.state, miniCount, active, lastTool: tool }
    }
    case 'IDLE_TIMEOUT': {
      // While a turn is active, a gap between events means Claude is thinking —
      // stay awake rather than dropping to the sleepy idle face. Only rest once
      // the turn has actually stopped.
      if (state.active) {
        return { ...state, state: 'thinking' }
      }
      return {
        ...state,
        state: state.state === 'sleeping' ? 'sleeping' : 'idle',
      }
    }
  }
}
