import { useEffect, useRef } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { categoryLabel, type Stop } from '../data/itinerary'

interface Props {
  stop: Stop
  index: number
  isSelected: boolean
  onSelect: () => void
}

/** Opens Apple Maps (the Maps app on iOS, maps.apple.com elsewhere) with driving directions. */
export function appleMapsUrl(stop: Stop): string {
  const [lat, lng] = stop.position
  return `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`
}

export function StopCard({ stop, index, isSelected, onSelect }: Props) {
  const ref = useRef<HTMLLIElement | null>(null)
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: stop.id })

  useEffect(() => {
    if (isSelected) ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [isSelected])

  return (
    <li
      ref={(node) => {
        ref.current = node
        setNodeRef(node)
      }}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={[
        'relative pl-12 scroll-mt-[44dvh] lg:scroll-mt-4',
        isDragging ? 'z-20 opacity-90' : '',
      ].join(' ')}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={isSelected}
        aria-label={`第 ${index + 1} 站`}
        className={[
          'absolute top-3 left-0 grid h-8 w-8 place-items-center rounded-full border-2 text-sm font-bold transition',
          isSelected ? 'border-ink bg-ink text-white' : 'border-brick bg-paper text-brick',
        ].join(' ')}
      >
        {index + 1}
      </button>

      <div
        onClick={onSelect}
        className={[
          'cursor-pointer rounded-2xl border bg-paper p-4 shadow-sm transition',
          isSelected ? 'border-ink ring-2 ring-ink/10' : 'border-line hover:border-brick/50',
          isDragging ? 'shadow-lg' : '',
        ].join(' ')}
      >
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold leading-snug">
              <span className="mr-1">{stop.emoji}</span>
              {stop.name}
              <span className="ml-2 align-middle rounded-full bg-cream px-2 py-0.5 text-[11px] font-medium text-muted">
                {categoryLabel[stop.category]}
              </span>
            </h2>
            <p className="mt-1 text-sm text-muted">{stop.address}</p>
          </div>
          <button
            type="button"
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
            onClick={(e) => e.stopPropagation()}
            aria-label="拖曳調整順序"
            className="drag-handle -mr-2 -mt-1 shrink-0 cursor-grab rounded-lg px-2 py-1 text-xl leading-none text-muted active:cursor-grabbing"
          >
            ⋮⋮
          </button>
        </div>

        {isSelected && (
          <div className="mt-3 space-y-2 border-t border-line pt-3 text-sm">
            <p className="leading-relaxed">{stop.note}</p>
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs text-muted">
              {stop.hours && (
                <>
                  <dt>營業</dt>
                  <dd className="text-ink">{stop.hours}</dd>
                </>
              )}
              {stop.closed && (
                <>
                  <dt>公休</dt>
                  <dd className="font-medium text-brick">{stop.closed}</dd>
                </>
              )}
              {stop.phone && (
                <>
                  <dt>電話</dt>
                  <dd>
                    <a
                      href={`tel:${stop.phone.replace(/-/g, '')}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-ink underline"
                    >
                      {stop.phone}
                    </a>
                  </dd>
                </>
              )}
            </dl>
            <a
              href={appleMapsUrl(stop)}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-block rounded-full bg-brick px-3 py-1.5 text-xs font-semibold text-white active:bg-brick-dark"
            >
               Apple 地圖導航 ↗
            </a>
          </div>
        )}
      </div>
    </li>
  )
}
