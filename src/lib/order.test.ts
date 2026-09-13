import { describe, expect, it } from 'vitest'
import { applySavedOrder, moveItem } from './order'

const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }]

describe('moveItem', () => {
  it('moves an item forward', () => {
    expect(moveItem(items, 0, 2).map((i) => i.id)).toEqual(['b', 'c', 'a', 'd'])
  })

  it('moves an item backward', () => {
    expect(moveItem(items, 3, 1).map((i) => i.id)).toEqual(['a', 'd', 'b', 'c'])
  })

  it('returns the same order when from equals to', () => {
    expect(moveItem(items, 2, 2)).toEqual(items)
  })

  it('does not mutate the input', () => {
    const copy = [...items]
    moveItem(items, 0, 3)
    expect(items).toEqual(copy)
  })
})

describe('applySavedOrder', () => {
  it('returns the default order when nothing is saved', () => {
    expect(applySavedOrder(items, null)).toEqual(items)
    expect(applySavedOrder(items, undefined)).toEqual(items)
  })

  it('reorders items to match the saved id list', () => {
    expect(applySavedOrder(items, ['c', 'a', 'd', 'b']).map((i) => i.id)).toEqual(['c', 'a', 'd', 'b'])
  })

  it('ignores saved ids that no longer exist', () => {
    expect(applySavedOrder(items, ['zzz', 'b', 'a']).map((i) => i.id)).toEqual(['b', 'a', 'c', 'd'])
  })

  it('appends items missing from the saved list in their default order', () => {
    expect(applySavedOrder(items, ['d']).map((i) => i.id)).toEqual(['d', 'a', 'b', 'c'])
  })

  it('never duplicates an item even if the saved list repeats an id', () => {
    expect(applySavedOrder(items, ['b', 'b', 'a']).map((i) => i.id)).toEqual(['b', 'a', 'c', 'd'])
  })
})
