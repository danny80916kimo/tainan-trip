import { useEffect, useRef } from 'react'
import { categoryLabel, type Stop } from '../data/itinerary'
import { formatStay } from '../lib/time'

interface Props {
  stop: Stop
  index: number
  stayMinutes: number | null
  isSelected: boolean
  isCurrent: boolean
  onSelect: () => void
}

export function StopCard({ stop, index, stayMinutes, isSelected, isCurrent, onSelect }: Props) {
  const ref = useRef<HTMLLIElement>(null)

  useEffect(() => {
    if (isSelected) ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [isSelected])

  const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${stop.position.join(',')}&travelmode=walking`

  return (
    <li ref={ref} className="relative pl-12">
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={isSelected}
        className={[
          'absolute top-3 left-0 grid h-8 w-8 place-items-center rounded-full border-2 text-sm font-bold transition',
          isSelected
            ? 'border-ink bg-ink text-white'
            : isCurrent
              ? 'border-moss bg-moss text-white'
              : 'border-brick bg-paper text-brick',
        ].join(' ')}
      >
        {index + 1}
      </button>

      <div
        onClick={onSelect}
        className={[
          'cursor-pointer rounded-2xl border bg-paper p-4 shadow-sm transition',
          isSelected ? 'border-ink ring-2 ring-ink/10' : 'border-line hover:border-brick/50',
        ].join(' ')}
      >
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-sm font-semibold tabular-nums text-brick">{stop.time}</span>
          <span className="text-xs text-muted">
            {isCurrent && <span className="mr-2 font-semibold text-moss">● 現在</span>}
            {stayMinutes !== null ? `停留 ${formatStay(stayMinutes)}` : '最後一站'}
          </span>
        </div>

        <h2 className="mt-1 text-lg font-bold leading-snug">
          <span className="mr-1">{stop.emoji}</span>
          {stop.name}
          <span className="ml-2 align-middle rounded-full bg-cream px-2 py-0.5 text-[11px] font-medium text-muted">
            {categoryLabel[stop.category]}
          </span>
        </h2>

        <p className="mt-1 text-sm text-muted">{stop.address}</p>

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
                    <a href={`tel:${stop.phone.replace(/-/g, '')}`} className="text-ink underline">
                      {stop.phone}
                    </a>
                  </dd>
                </>
              )}
            </dl>
            <a
              href={navUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-block rounded-full bg-brick px-3 py-1.5 text-xs font-semibold text-white active:bg-brick-dark"
            >
              Google Maps 導航 ↗
            </a>
          </div>
        )}
      </div>
    </li>
  )
}
