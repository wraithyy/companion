import { useState } from 'react'
import { CompanionSkin } from '../lib/sprites/types'
import { PixelSprite } from './PixelSprite'

interface Props {
  skins: CompanionSkin[]
  skinId: string
  customIds: Set<string>
  onSelect: (id: string) => void
  onAddSkins: (jsonText: string) => string | null
  onRemoveSkin: (id: string) => void
}

export function SkinPicker({
  skins,
  skinId,
  customIds,
  onSelect,
  onAddSkins,
  onRemoveSkin,
}: Props) {
  const [open, setOpen] = useState(false)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Stop mouse events from reaching the drag region so clicks select instead
  // of dragging the window.
  const stop = (e: { stopPropagation: () => void }) => e.stopPropagation()

  const submit = () => {
    const err = onAddSkins(draft)
    if (err) {
      setError(err)
      return
    }
    setDraft('')
    setError(null)
    setAdding(false)
  }

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
          {skins.map((s) => (
            <div key={s.id} className="skin-picker__row">
              <button
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
              {customIds.has(s.id) && (
                <button
                  className="skin-picker__remove"
                  onClick={() => onRemoveSkin(s.id)}
                  aria-label={`Remove ${s.label}`}
                  title={`Remove ${s.label}`}
                >
                  ×
                </button>
              )}
            </div>
          ))}

          {adding ? (
            <div className="skin-picker__add-form">
              <textarea
                className="skin-picker__textarea"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder='{ "id": "my-skin", "label": "My Skin", "palette": { "A": "#5b3fb0" }, "open": ["AAAA"], "closed": ["AAAA"] }'
                spellCheck={false}
                rows={6}
              />
              {error && <pre className="skin-picker__error">{error}</pre>}
              <div className="skin-picker__add-actions">
                <button onClick={submit}>Add</button>
                <button
                  onClick={() => {
                    setAdding(false)
                    setError(null)
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              className="skin-picker__add"
              onClick={() => setAdding(true)}
            >
              + Add skin
            </button>
          )}
        </div>
      )}
    </div>
  )
}
