import { useState } from 'react'
import { SKINS } from '../lib/sprites'
import { PixelSprite } from './PixelSprite'

interface Props {
  skinId: string
  onSelect: (id: string) => void
}

export function SkinPicker({ skinId, onSelect }: Props) {
  const [open, setOpen] = useState(false)

  // Stop mouse events from reaching the drag region so clicks select instead
  // of dragging the window.
  const stop = (e: { stopPropagation: () => void }) => e.stopPropagation()

  return (
    <div className="skin-picker" onMouseDown={stop}>
      <button
        className="skin-picker__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label="Choose companion"
        title="Choose companion"
      >
        ⚙
      </button>
      {open && (
        <div className="skin-picker__panel">
          {SKINS.map((s) => (
            <button
              key={s.id}
              className={`skin-picker__item ${s.id === skinId ? 'is-active' : ''}`}
              onClick={() => {
                onSelect(s.id)
                setOpen(false)
              }}
              title={s.label}
            >
              <PixelSprite
                rows={s.open}
                palette={s.palette}
                size={32}
                ariaLabel={s.label}
              />
              <span className="skin-picker__label">{s.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
