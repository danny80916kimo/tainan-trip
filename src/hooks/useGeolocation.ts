import { useEffect, useState } from 'react'
import type { LatLng } from '../data/itinerary'

export interface GeoState {
  position: LatLng | null
  /** Metres, as reported by the device. */
  accuracy: number | null
  error: string | null
  supported: boolean
}

function describe(err: GeolocationPositionError): string {
  switch (err.code) {
    case err.PERMISSION_DENIED:
      return '未允許定位，請到瀏覽器設定開啟'
    case err.POSITION_UNAVAILABLE:
      return '目前無法取得位置'
    case err.TIMEOUT:
      return '定位逾時'
    default:
      return err.message
  }
}

/** Follows the device position for as long as the component is mounted. */
export function useGeolocation(): GeoState {
  const [state, setState] = useState<GeoState>({
    position: null,
    accuracy: null,
    error: null,
    supported: typeof navigator !== 'undefined' && 'geolocation' in navigator,
  })

  useEffect(() => {
    if (!('geolocation' in navigator)) return
    const id = navigator.geolocation.watchPosition(
      (p) =>
        setState({
          position: [p.coords.latitude, p.coords.longitude],
          accuracy: p.coords.accuracy,
          error: null,
          supported: true,
        }),
      (err) => setState((prev) => ({ ...prev, error: describe(err) })),
      { enableHighAccuracy: true, maximumAge: 10_000, timeout: 20_000 },
    )
    return () => navigator.geolocation.clearWatch(id)
  }, [])

  return state
}
