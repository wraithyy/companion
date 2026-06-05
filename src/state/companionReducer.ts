import { CompanionState, EventMappingResult } from '../lib/eventMap'

export interface CompanionReducerState {
  state: CompanionState
  miniCount: number
  lastTool: string | null
}

export type CompanionAction =
  | { type: 'EVENT'; result: EventMappingResult; tool: string | null }
  | { type: 'IDLE_TIMEOUT' }

export const initialState: CompanionReducerState = {
  state: 'idle',
  miniCount: 0,
  lastTool: null,
}

export function companionReducer(
  state: CompanionReducerState,
  action: CompanionAction,
): CompanionReducerState {
  switch (action.type) {
    case 'EVENT': {
      const { result, tool } = action
      const miniCount = result.spawnMini
        ? state.miniCount + 1
        : result.removeMini
          ? Math.max(0, state.miniCount - 1)
          : state.miniCount

      return {
        state: result.state,
        miniCount,
        lastTool: tool,
      }
    }
    case 'IDLE_TIMEOUT': {
      return {
        ...state,
        state: 'idle',
      }
    }
  }
}
