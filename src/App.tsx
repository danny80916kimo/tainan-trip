import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Timeline } from './components/Timeline'
import { TripMap } from './components/TripMap'
import { stops } from './data/itinerary'
import { findCurrentStopIndex, nowMinutes } from './lib/time'

/** Minutes since midnight, refreshed every 30 s so the “現在” badge moves on its own. */
function useNowMinutes() {
  const [now, setNow] = useState(() => nowMinutes())
  useEffect(() => {
    const id = setInterval(() => setNow(nowMinutes()), 30_000)
    return () => clearInterval(id)
  }, [])
  return now
}

export function App() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const now = useNowMinutes()
  const currentIndex = findCurrentStopIndex(
    stops.map((s) => s.time),
    now,
  )

  const select = (i: number) => setSelectedIndex((prev) => (prev === i ? null : i))

  return (
    <div className="flex min-h-dvh flex-col lg:h-dvh">
      <Header />
      <main className="flex flex-1 flex-col lg:min-h-0 lg:flex-row">
        {/* Map: sticky strip on phones, full-height right pane on wide screens */}
        <section className="sticky top-0 z-10 h-[42dvh] shrink-0 border-b border-line lg:static lg:order-2 lg:h-auto lg:flex-1 lg:border-b-0 lg:border-l">
          <TripMap
            stops={stops}
            selectedIndex={selectedIndex}
            currentIndex={currentIndex}
            onSelect={select}
          />
        </section>

        <section className="lg:order-1 lg:w-[440px] lg:shrink-0 lg:overflow-y-auto">
          <Timeline
            stops={stops}
            selectedIndex={selectedIndex}
            currentIndex={currentIndex}
            onSelect={select}
          />
          <p className="px-4 pb-6 text-center text-[11px] text-muted">
            點卡片或地圖上的號碼可展開細節 · 直線距離僅供參考
          </p>
        </section>
      </main>
    </div>
  )
}
