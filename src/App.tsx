import { useState } from 'react'
import { Header } from './components/Header'
import { Timeline } from './components/Timeline'
import { TripMap } from './components/TripMap'
import { stops as defaultStops } from './data/itinerary'
import { useGeolocation } from './hooks/useGeolocation'
import { useStopOrder } from './hooks/useStopOrder'

export function App() {
  const { stops, move, reset, isCustom } = useStopOrder(defaultStops)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const geo = useGeolocation()

  // Same id toggles the card closed; clicking a map pin or a card both land here.
  const select = (id: string) => setSelectedId((prev) => (prev === id ? null : id))

  return (
    <div className="flex min-h-dvh flex-col lg:h-dvh">
      <Header isCustomOrder={isCustom} onResetOrder={reset} />
      <main className="flex flex-1 flex-col lg:min-h-0 lg:flex-row">
        {/* Map: sticky strip on phones, full-height right pane on wide screens */}
        <section className="sticky top-0 z-10 h-[42dvh] shrink-0 border-b border-line lg:static lg:order-2 lg:h-auto lg:flex-1 lg:border-b-0 lg:border-l">
          <TripMap
            stops={stops}
            selectedId={selectedId}
            onSelect={select}
            userPosition={geo.position}
            userAccuracy={geo.accuracy}
            locationError={geo.error}
          />
        </section>

        <section className="lg:order-1 lg:w-[440px] lg:shrink-0 lg:overflow-y-auto">
          <Timeline stops={stops} selectedId={selectedId} onSelect={select} onMove={move} />
          <p className="px-4 pb-6 text-center text-[11px] text-muted">
            {geo.error ? `${geo.error} · ` : ''}
            拖曳 ⋮⋮ 可調整順序 · 點卡片或地圖號碼看介紹
          </p>
        </section>
      </main>
    </div>
  )
}
