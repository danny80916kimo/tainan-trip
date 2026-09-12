/** "HH:MM" → minutes since midnight. */
export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/**
 * Index of the stop currently in progress: the last stop whose start time
 * is at or before `nowMinutes`. Returns -1 before the day begins.
 */
export function findCurrentStopIndex(times: string[], nowMinutes: number): number {
  let current = -1
  times.forEach((t, i) => {
    if (toMinutes(t) <= nowMinutes) current = i
  })
  return current
}

/** 45 → "45 分", 60 → "1 小時", 75 → "1 小時 15 分". */
export function formatStay(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m} 分`
  if (m === 0) return `${h} 小時`
  return `${h} 小時 ${m} 分`
}

/** Minutes since midnight in the browser's local time zone. */
export function nowMinutes(date = new Date()): number {
  return date.getHours() * 60 + date.getMinutes()
}
