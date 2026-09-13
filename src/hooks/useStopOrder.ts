import { useCallback, useMemo, useState } from 'react'
import type { Stop } from '../data/itinerary'
import { applySavedOrder, moveItem } from '../lib/order'

/** Bump the suffix whenever the itinerary changes so a stale saved order is ignored. */
const STORAGE_KEY = 'tainan-trip:order:2026-09-13'

function readSavedIds(): string[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.every((x) => typeof x === 'string') ? parsed : null
  } catch {
    return null
  }
}

function writeSavedIds(ids: string[] | null) {
  try {
    if (ids) localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* private mode / storage blocked: order just lives in memory */
  }
}

/** Reorderable list of stops, persisted per browser. */
export function useStopOrder(defaultStops: Stop[]) {
  const [ordered, setOrdered] = useState<Stop[]>(() => applySavedOrder(defaultStops, readSavedIds()))

  const move = useCallback((from: number, to: number) => {
    setOrdered((prev) => {
      const next = moveItem(prev, from, to)
      writeSavedIds(next.map((s) => s.id))
      return next
    })
  }, [])

  const reset = useCallback(() => {
    writeSavedIds(null)
    setOrdered([...defaultStops])
  }, [defaultStops])

  const isCustom = useMemo(
    () => ordered.some((s, i) => s.id !== defaultStops[i]?.id),
    [ordered, defaultStops],
  )

  return { stops: ordered, move, reset, isCustom }
}
