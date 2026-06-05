import { useCallback, useState } from 'react'
import { CompanionSkin } from '../lib/sprites/types'
import { DEFAULT_SKIN_ID, getSkin } from '../lib/sprites'

const STORAGE_KEY = 'companion.skinId'

function readStored(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? DEFAULT_SKIN_ID
  } catch {
    return DEFAULT_SKIN_ID
  }
}

export function useSkin() {
  const [skinId, setSkinId] = useState<string>(readStored)

  const selectSkin = useCallback((id: string) => {
    setSkinId(id)
    try {
      localStorage.setItem(STORAGE_KEY, id)
    } catch {
      // localStorage unavailable (e.g. private mode) — selection is in-memory only.
    }
  }, [])

  const skin: CompanionSkin = getSkin(skinId)
  return { skin, skinId, selectSkin }
}
