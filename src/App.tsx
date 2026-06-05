import { useCompanionState } from './hooks/useCompanionState'
import { Companion } from './components/Companion'
import { MiniCompanion } from './components/MiniCompanion'

export default function App() {
  const { state, miniCount } = useCompanionState()

  return (
    <div
      data-tauri-drag-region
      className="app-root"
    >
      <div className="companion-stage">
        <Companion state={state} />
        {miniCount > 0 && (
          <div className="mini-row">
            {Array.from({ length: miniCount }, (_, i) => (
              <MiniCompanion key={i} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
