export type LatLng = [lat: number, lng: number]

const EARTH_RADIUS_M = 6_371_000
const WALK_METERS_PER_MINUTE = 80

const toRad = (deg: number) => (deg * Math.PI) / 180

/** Great-circle (haversine) distance between two points, in metres. */
export function distanceMeters(a: LatLng, b: LatLng): number {
  const dLat = toRad(b[0] - a[0])
  const dLng = toRad(b[1] - a[1])
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h))
}

/** Rough walking time at a relaxed pace, rounded up to whole minutes. */
export function walkMinutes(meters: number): number {
  return Math.ceil(meters / WALK_METERS_PER_MINUTE)
}
