import { useEffect, useState } from 'react'

// The window's initial edge length in px. The companion is authored to fill a
// 200x200 window, so scale = currentEdge / BASE keeps it filling the frame as
// the window is resized.
const BASE = 200

export function useWindowScale() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      const edge = Math.min(window.innerWidth, window.innerHeight)
      setScale(edge / BASE)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return scale
}
