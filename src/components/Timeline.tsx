import { Fragment } from 'react'
import type { Stop } from '../data/itinerary'
import { distanceMeters, walkMinutes } from '../lib/geo'
import { toMinutes } from '../lib/time'
import { StopCard } from './StopCard'

interface Props {
  stops: Stop[]
  selectedIndex: number | null
  currentIndex: number
  onSelect: (index: number) => void
}

export function Timeline({ stops, selectedIndex, currentIndex, onSelect }: Props) {
  return (
    <ol className="relative space-y-0 px-4 py-4">
      {/* vertical spine behind the numbered badges */}
      <div aria-hidden className="absolute top-8 bottom-8 left-[31px] w-0.5 bg-line" />

      {stops.map((stop, i) => {
        const next = stops[i + 1]
        const stay = next ? toMinutes(next.time) - toMinutes(stop.time) : null
        const meters = next ? distanceMeters(stop.position, next.position) : null
        return (
          <Fragment key={stop.id}>
            <StopCard
              stop={stop}
              index={i}
              stayMinutes={stay}
              isSelected={selectedIndex === i}
              isCurrent={currentIndex === i}
              onSelect={() => onSelect(i)}
            />
            {meters !== null && (
              <li className="py-2 pl-12 text-xs text-muted">
                ↓ 直線約 {Math.round(meters / 10) * 10} 公尺 · 步行約 {walkMinutes(meters)} 分
              </li>
            )}
          </Fragment>
        )
      })}
    </ol>
  )
}
