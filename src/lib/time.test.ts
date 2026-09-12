import { describe, expect, it } from 'vitest'
import { findCurrentStopIndex, formatStay, toMinutes } from './time'

describe('toMinutes', () => {
  it('converts HH:MM to minutes since midnight', () => {
    expect(toMinutes('00:00')).toBe(0)
    expect(toMinutes('11:30')).toBe(690)
    expect(toMinutes('18:15')).toBe(1095)
  })
})

describe('findCurrentStopIndex', () => {
  const times = ['11:30', '12:30', '13:15']

  it('returns -1 before the first stop', () => {
    expect(findCurrentStopIndex(times, toMinutes('09:00'))).toBe(-1)
  })

  it('returns the stop whose start time has passed most recently', () => {
    expect(findCurrentStopIndex(times, toMinutes('11:30'))).toBe(0)
    expect(findCurrentStopIndex(times, toMinutes('12:29'))).toBe(0)
    expect(findCurrentStopIndex(times, toMinutes('12:30'))).toBe(1)
    expect(findCurrentStopIndex(times, toMinutes('13:14'))).toBe(1)
  })

  it('stays on the last stop after it starts', () => {
    expect(findCurrentStopIndex(times, toMinutes('23:00'))).toBe(2)
  })
})

describe('formatStay', () => {
  it('formats minutes under an hour', () => {
    expect(formatStay(45)).toBe('45 分')
  })

  it('formats whole hours', () => {
    expect(formatStay(60)).toBe('1 小時')
    expect(formatStay(120)).toBe('2 小時')
  })

  it('formats hours with minutes', () => {
    expect(formatStay(75)).toBe('1 小時 15 分')
  })
})
