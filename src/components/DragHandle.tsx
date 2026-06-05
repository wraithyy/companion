// A grip the user can grab to move the always-on-top window. Tauri only drags
// from the element carrying `data-tauri-drag-region`, so this is an explicit,
// obvious handle (the companion body is draggable too via pointer-events: none).
export function DragHandle() {
  return (
    <div className="drag-handle" data-tauri-drag-region title="Drag companion">
      ⠿
    </div>
  )
}
