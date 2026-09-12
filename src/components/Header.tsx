import { stops, trip } from '../data/itinerary'

const routeUrl = (() => {
  const first = stops[0].position.join(',')
  const last = stops[stops.length - 1].position.join(',')
  const waypoints = stops
    .slice(1, -1)
    .map((s) => s.position.join(','))
    .join('|')
  const params = new URLSearchParams({
    api: '1',
    origin: first,
    destination: last,
    waypoints,
    travelmode: 'walking',
  })
  return `https://www.google.com/maps/dir/?${params.toString()}`
})()

export function Header() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-line bg-paper px-4">
      <div className="min-w-0">
        <h1 className="truncate text-base font-bold leading-tight">{trip.title}</h1>
        <p className="truncate text-xs text-muted">{trip.subtitle}</p>
      </div>
      <a
        href={routeUrl}
        target="_blank"
        rel="noreferrer"
        className="shrink-0 rounded-full bg-brick px-3 py-1.5 text-xs font-semibold text-white active:bg-brick-dark"
      >
        全程路線 ↗
      </a>
    </header>
  )
}
