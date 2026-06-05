import { useEffect, useRef, useState } from 'react'
import { CompanionState } from '../lib/eventMap'

// States that are user-attention or terminal — skip the dwell and emit immediately
// so the companion never looks unresponsive when it matters most.
const BYPASS_STATES = new Set<CompanionState>(['asking', 'done', 'sleeping', 'idle'])

const THROTTLE_MS = 2000

export function useThrottledState(
  value: CompanionState,
  intervalMs: number = THROTTLE_MS,
): CompanionState {
  const [displayed, setDisplayed] = useState<CompanionState>(value)

  // Tracks whether we're currently in the dwell hold window
  const dwellTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Latest value that arrived during the hold — collapsed to one pending slot
  const pendingRef = useRef<CompanionState | null>(null)
  const dwellingRef = useRef(false)

  useEffect(() => {
    if (BYPASS_STATES.has(value)) {
      // High-priority: clear any pending dwell and emit immediately
      if (dwellTimerRef.current) {
        clearTimeout(dwellTimerRef.current)
        dwellTimerRef.current = null
      }
      pendingRef.current = null
      dwellingRef.current = false
      setDisplayed(value)
      return
    }

    if (!dwellingRef.current) {
      // Not currently holding — emit immediately and start the dwell window
      setDisplayed(value)
      dwellingRef.current = true
      dwellTimerRef.current = setTimeout(() => {
        dwellingRef.current = false
        dwellTimerRef.current = null
        // Flush the latest pending value if one arrived during the dwell
        if (pendingRef.current !== null) {
          const next = pendingRef.current
          pendingRef.current = null
          // Reuse bypass check for the flushed value
          if (BYPASS_STATES.has(next)) {
            setDisplayed(next)
          } else {
            // Start a fresh dwell for the pending value
            setDisplayed(next)
            dwellingRef.current = true
            dwellTimerRef.current = setTimeout(() => {
              dwellingRef.current = false
              dwellTimerRef.current = null
            }, intervalMs)
          }
        }
      }, intervalMs)
    } else {
      // Currently in a dwell hold — collapse into a single pending slot
      pendingRef.current = value
    }
  }, [value, intervalMs])

  useEffect(() => {
    return () => {
      if (dwellTimerRef.current) {
        clearTimeout(dwellTimerRef.current)
        dwellTimerRef.current = null
      }
      pendingRef.current = null
      dwellingRef.current = false
    }
  }, [])

  return displayed
}
