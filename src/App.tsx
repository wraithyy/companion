import { useCompanionState } from './hooks/useCompanionState'
import { useSkin } from './hooks/useSkin'
import { useWindowScale } from './hooks/useWindowScale'
import { Companion } from './components/Companion'
import { MiniCompanion } from './components/MiniCompanion'
import { SkinPicker } from './components/SkinPicker'
import { DragHandle } from './components/DragHandle'
import { ResizeHandle } from './components/ResizeHandle'

export default function App() {
  const { state, miniCount } = useCompanionState()
  const { skin, skinId, selectSkin } = useSkin()
  const scale = useWindowScale()

  return (
    <div
      data-tauri-drag-region
      className="app-root"
    >
      <DragHandle />
      <SkinPicker skinId={skinId} onSelect={selectSkin} />
      <ResizeHandle />
      <div className="companion-stage" style={{ transform: `scale(${scale})` }}>
        <Companion state={state} skin={skin} />
        {miniCount > 0 && (
          <div className="mini-row">
            {Array.from({ length: miniCount }, (_, i) => (
              <MiniCompanion key={i} index={i} skin={skin} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
