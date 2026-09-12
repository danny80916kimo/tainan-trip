import { describe, expect, it } from 'vitest'
import { distanceMeters, walkMinutes } from './geo'

describe('distanceMeters', () => {
  it('returns 0 for the same point', () => {
    expect(distanceMeters([22.99, 120.2], [22.99, 120.2])).toBe(0)
  })

  it('treats 0.001 degrees of latitude as roughly 111 m', () => {
    const d = distanceMeters([22.99, 120.2], [22.991, 120.2])
    expect(d).toBeGreaterThan(110)
    expect(d).toBeLessThan(112)
  })

  it('is symmetric', () => {
    const a: [number, number] = [22.9902512, 120.1963613]
    const b: [number, number] = [22.9971251, 120.2004968]
    expect(distanceMeters(a, b)).toBeCloseTo(distanceMeters(b, a), 6)
  })
})

describe('walkMinutes', () => {
  it('returns 0 for no distance', () => {
    expect(walkMinutes(0)).toBe(0)
  })

  it('assumes about 80 m per minute and rounds up', () => {
    expect(walkMinutes(80)).toBe(1)
    expect(walkMinutes(81)).toBe(2)
    expect(walkMinutes(400)).toBe(5)
  })
})
