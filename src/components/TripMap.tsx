import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import L from "leaflet";
import { Circle, MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import type { LatLng, Stop } from "../data/itinerary";

interface Props {
  stops: Stop[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  userPosition: LatLng | null;
  userAccuracy: number | null;
  locationError: string | null;
}

function markerIcon(index: number, active: boolean) {
  return L.divIcon({
    className: "",
    html: `<div class="stop-marker${active ? " stop-marker--active" : ""}"><span>${index + 1}</span></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
}

const userIcon = L.divIcon({
  className: "",
  html: '<div class="user-marker"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

/** Pans the map to the selected stop whenever the selection changes. */
function FlyToSelected({ stop }: { stop: Stop | null }) {
  const map = useMap();
  useEffect(() => {
    if (stop)
      map.flyTo(stop.position, Math.max(map.getZoom(), 15), { duration: 0.6 });
  }, [map, stop]);
  return null;
}

export function TripMap({
  stops,
  selectedId,
  onSelect,
  userPosition,
  userAccuracy,
  locationError,
}: Props) {
  const bounds = L.latLngBounds(stops.map((s) => s.position)).pad(0.15);
  const selected = stops.find((s) => s.id === selectedId) ?? null;
  const mapRef = useRef<LeafletMap | null>(null);

  const locateDisabled = !userPosition;
  const flyToUser = () => {
    const map = mapRef.current;
    if (map && userPosition)
      map.flyTo(userPosition, Math.max(map.getZoom(), 15), { duration: 0.6 });
  };

  return (
    <div className="relative h-full w-full">
      <MapContainer
        ref={mapRef}
        bounds={bounds}
        className="h-full w-full"
        zoomControl={false}
        attributionControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {userPosition && userAccuracy !== null && userAccuracy < 1000 && (
          <Circle
            center={userPosition}
            radius={userAccuracy}
            pathOptions={{
              color: "#2f6fdd",
              weight: 1,
              opacity: 0.4,
              fillOpacity: 0.12,
            }}
          />
        )}
        {userPosition && (
          <Marker
            position={userPosition}
            icon={userIcon}
            zIndexOffset={500}
            interactive={false}
          />
        )}

        {stops.map((stop, i) => {
          const active = stop.id === selectedId;
          return (
            <Marker
              key={`${stop.id}-${i}-${active}`}
              position={stop.position}
              icon={markerIcon(i, active)}
              zIndexOffset={active ? 1000 : 0}
              eventHandlers={{ click: () => onSelect(stop.id) }}
            />
          );
        })}

        <FlyToSelected stop={selected} />
      </MapContainer>

      {/* Kept outside the Leaflet container: absolutely-positioned children inside it are not painted reliably. */}
      <button
        type="button"
        disabled={locateDisabled}
        title={locationError ?? (locateDisabled ? "定位中…" : "移到目前位置")}
        aria-label="移到目前位置"
        onClick={flyToUser}
        className={[
          "absolute right-3 bottom-3 z-[1000] grid h-11 w-11 place-items-center rounded-full border border-line bg-paper text-lg shadow-md",
          locateDisabled ? "opacity-50" : "active:bg-cream",
        ].join(" ")}
      >
        {locationError ? "⚠️" : locateDisabled ? "…" : "➤"}
      </button>
    </div>
  );
}
