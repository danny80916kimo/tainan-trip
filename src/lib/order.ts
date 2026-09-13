/** Returns a copy of `items` with the element at `from` moved to `to`. */
export function moveItem<T>(items: readonly T[], from: number, to: number): T[] {
  const next = [...items]
  if (from === to || from < 0 || from >= next.length || to < 0 || to >= next.length) return next
  const [moved] = next.splice(from, 1)
  next.splice(to, 0, moved)
  return next
}

/**
 * Reorders `items` to follow `savedIds`. Unknown ids are skipped, ids that
 * appear more than once are used once, and items absent from the saved list
 * are appended in their default order — so an itinerary edit never loses a stop.
 */
export function applySavedOrder<T extends { id: string }>(
  items: readonly T[],
  savedIds: readonly string[] | null | undefined,
): T[] {
  if (!savedIds) return [...items]
  const remaining = new Map(items.map((item) => [item.id, item]))
  const ordered: T[] = []
  for (const id of savedIds) {
    const item = remaining.get(id)
    if (item) {
      ordered.push(item)
      remaining.delete(id)
    }
  }
  for (const item of items) if (remaining.has(item.id)) ordered.push(item)
  return ordered
}
