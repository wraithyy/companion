import { useEffect, useReducer, useRef } from 'react'
import { listen } from '@tauri-apps/api/event'
import { mapEvent, HookEvent } from '../lib/eventMap'
import { companionReducer, initialState } from '../state/companionReducer'
import { useThrottledState } from './useThrottledState'

// Generous: Claude often reasons for several seconds between hook events.
// On timeout the reducer keeps an active turn "thinking" (awake), so this only
// controls how soon a truly-stopped turn settles to the resting face.
const IDLE_TIMEOUT_MS = 4000

export function useCompanionState() {
  const [companionState, dispatch] = useReducer(companionReducer, initialState)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let unlisten: (() => void) | undefined
    // Guard against StrictMode double-mount: the cleanup may run before the
    // async listen() resolves, leaving unlisten undefined. The disposed flag
    // ensures we tear down the listener even if it resolved after cleanup ran.
    let disposed = false

    listen<HookEvent>('cc-event', (event) => {
      const hookEvent = event.payload as HookEvent
      const result = mapEvent(hookEvent)

      dispatch({
        type: 'EVENT',
        result,
        tool: hookEvent.tool_name ?? null,
      })

      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }

      if (result.state !== 'asking') {
        idleTimerRef.current = setTimeout(() => {
          dispatch({ type: 'IDLE_TIMEOUT' })
        }, IDLE_TIMEOUT_MS)
      }
    }).then((fn) => {
      if (disposed) {
        fn()
        return
      }
      unlisten = fn
    })

    return () => {
      disposed = true
      unlisten?.()
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [])

  // Throttle only the displayed face state — mini accounting and active flag
  // must remain exact and immediate to keep spawn/remove counts in sync.
  const displayState = useThrottledState(companionState.state, 2000)

  return { ...companionState, state: displayState }
}
