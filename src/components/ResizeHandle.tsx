import type { PointerEvent } from 'react'
import { getCurrentWindow } from '@tauri-apps/api/window'

// A grip in the bottom-right corner that resizes the always-on-top window.
// Tauri has no HTML attribute for resizing (unlike drag), so we kick off a
// native resize-drag on pointer down.
export function ResizeHandle() {
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    // Keep the press from also triggering the window drag region.
    e.preventDefault()
    e.stopPropagation()
    void getCurrentWindow().startResizeDragging('SouthEast')
  }

  return (
    <div
      className="resize-handle"
      onPointerDown={onPointerDown}
      title="Resize companion"
    >
      ⤡
    </div>
  )
}
