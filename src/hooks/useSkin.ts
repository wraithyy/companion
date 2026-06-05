import { useCallback, useMemo, useState } from 'react'
import { CompanionSkin } from '../lib/sprites/types'
import { DEFAULT_SKIN_ID, SKINS } from '../lib/sprites'
import {
  loadCustomSkins,
  parseSkins,
  saveCustomSkins,
} from '../lib/sprites/customSkins'

const STORAGE_KEY = 'companion.skinId'

const BUILTIN_IDS = new Set(SKINS.map((s) => s.id))

function readStored(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_SKIN_ID
  } catch {
    return DEFAULT_SKIN_ID
  }
}

export function useSkin() {
  const [skinId, setSkinId] = useState<string>(readStored)
  const [customSkins, setCustomSkins] =
    useState<CompanionSkin[]>(loadCustomSkins)

  const skins = useMemo(() => [...SKINS, ...customSkins], [customSkins])

  const customIds = useMemo(
    () => new Set(customSkins.map((s) => s.id)),
    [customSkins],
  )

  const selectSkin = useCallback((id: string) => {
    setSkinId(id)
    try {
      localStorage.setItem(STORAGE_KEY, id)
    } catch {
      // localStorage unavailable (e.g. private mode) — selection is in-memory.
    }
  }, [])

  // Import one or more skins from JSON. Returns an error message on failure,
  // or null on success. A custom skin reusing an existing custom id replaces
  // it (so users can iterate); built-in ids are rejected.
  const addSkins = useCallback((jsonText: string): string | null => {
    let parsed: CompanionSkin[]
    try {
      parsed = parseSkins(jsonText)
    } catch (err) {
      return err instanceof Error ? err.message : 'Could not parse skins'
    }

    const clash = parsed.find((s) => BUILTIN_IDS.has(s.id))
    if (clash) {
      return `"${clash.id}" is a built-in skin id — choose another id`
    }

    setCustomSkins((prev) => {
      const byId = new Map(prev.map((s) => [s.id, s]))
      for (const s of parsed) byId.set(s.id, s)
      const next = [...byId.values()]
      saveCustomSkins(next)
      return next
    })
    return null
  }, [])

  const removeSkin = useCallback((id: string) => {
    setCustomSkins((prev) => {
      const next = prev.filter((s) => s.id !== id)
      saveCustomSkins(next)
      return next
    })
    setSkinId((cur) => {
      if (cur !== id) return cur
      try {
        localStorage.setItem(STORAGE_KEY, DEFAULT_SKIN_ID)
      } catch {
        // ignore
      }
      return DEFAULT_SKIN_ID
    })
  }, [])

  const skin: CompanionSkin = skins.find((s) => s.id === skinId) ?? skins[0]

  return { skin, skinId, skins, customIds, selectSkin, addSkins, removeSkin }
}
