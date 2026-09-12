import { useEffect } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Polyline, TileLayer, useMap } from 'react-leaflet'
import type { Stop } from '../data/itinerary'

interface Props {
  stops: Stop[]
  selectedIndex: number | null
  currentIndex: number
  onSelect: (index: number) => void
}

function markerIcon(index: number, state: 'default' | 'active' | 'current') {
  const cls = ['stop-marker']
  if (state === 'active') cls.push('stop-marker--active')
  if (state === 'current') cls.push('stop-marker--current')
  return L.divIcon({
    className: '',
    html: `<div class="${cls.join(' ')}"><span>${index + 1}</span></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  })
}

/** Pans the map to the selected stop whenever the selection changes. */
function FlyToSelected({ stop }: { stop: Stop | null }) {
  const map = useMap()
  useEffect(() => {
    if (stop) map.flyTo(stop.position, Math.max(map.getZoom(), 16), { duration: 0.6 })
  }, [map, stop])
  return null
}

export function TripMap({ stops, selectedIndex, currentIndex, onSelect }: Props) {
  const bounds = L.latLngBounds(stops.map((s) => s.position)).pad(0.15)
  const selected = selectedIndex === null ? null : stops[selectedIndex]

  return (
    <MapContainer bounds={bounds} className="h-full w-full" zoomControl={false} attributionControl>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      <Polyline
        positions={stops.map((s) => s.position)}
        pathOptions={{ color: '#c8553d', weight: 3, opacity: 0.7, dashArray: '6 6' }}
      />
      {stops.map((stop, i) => {
        const state = i === selectedIndex ? 'active' : i === currentIndex ? 'current' : 'default'
        return (
          <Marker
            key={`${stop.id}-${state}`}
            position={stop.position}
            icon={markerIcon(i, state)}
            zIndexOffset={state === 'active' ? 1000 : 0}
            eventHandlers={{ click: () => onSelect(i) }}
          />
        )
      })}
      <FlyToSelected stop={selected} />
    </MapContainer>
  )
}
