import { useEffect, useReducer, useRef } from 'react'
import { listen } from '@tauri-apps/api/event'
import { mapEvent, HookEvent } from '../lib/eventMap'
import { companionReducer, initialState } from '../state/companionReducer'

const IDLE_TIMEOUT_MS = 1500

export function useCompanionState() {
  const [companionState, dispatch] = useReducer(companionReducer, initialState)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let unlisten: (() => void) | undefined

    const setupListener = async () => {
      unlisten = await listen<HookEvent>('cc-event', (event) => {
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
      })
    }

    setupListener()

    return () => {
      unlisten?.()
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }
    }
  }, [])

  return companionState
}
