import { trip } from '../data/itinerary'

interface Props {
  isCustomOrder: boolean
  onResetOrder: () => void
}

export function Header({ isCustomOrder, onResetOrder }: Props) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-line bg-paper px-4">
      <div className="min-w-0">
        <h1 className="truncate text-base font-bold leading-tight">{trip.title}</h1>
        <p className="truncate text-xs text-muted">{trip.subtitle}</p>
      </div>
      {isCustomOrder && (
        <button
          type="button"
          onClick={onResetOrder}
          className="shrink-0 rounded-full border border-line bg-cream px-3 py-1.5 text-xs font-semibold text-ink active:bg-line"
        >
          還原順序
        </button>
      )}
    </header>
  )
}
