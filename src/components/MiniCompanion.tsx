interface Props {
  index: number
}

export function MiniCompanion({ index }: Props) {
  return (
    <span
      className="mini-companion companion-float"
      role="img"
      aria-label="mini companion"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      🐾
    </span>
  )
}
