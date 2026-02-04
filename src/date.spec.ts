import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import {
  formatDate,
  formatDateTime,
  formatDateTimeSeconds,
  formatTime,
  formatTimeSeconds,
  isSameDayAsToday,
  timeAgo,
} from './date'

describe('formatDate', () => {
  const testDate = new Date('2024-06-15T14:30:00Z')

  it('returns dash when date is null', () => {
    expect(formatDate(null as unknown as Date, false, 'en-US')).toBe('–')
  })

  it('formats date in en-US locale', () => {
    const result = formatDate(testDate, true, 'en-US')
    expect(result).toBe('06/15/2024')
  })

  it('formats date in de-DE locale', () => {
    const result = formatDate(testDate, true, 'de-DE')
    expect(result).toBe('15.06.2024')
  })

  it('formats date with UTC timezone', () => {
    const result = formatDate(testDate, true, 'en-US')
    expect(result).toBe('06/15/2024')
  })
})

describe('formatDateTime', () => {
  const testDate = new Date('2024-06-15T14:30:00Z')

  it('returns dash when date is null', () => {
    expect(formatDateTime(null, false, 'en-US')).toBe('–')
  })

  it('formats datetime in en-US locale with 12-hour format', () => {
    const result = formatDateTime(testDate, true, 'en-US')
    expect(result).toMatch(/06\/15\/2024/)
    expect(result).toMatch(/02:30/)
    expect(result).toMatch(/PM/)
  })

  it('formats datetime in de-DE locale with 24-hour format', () => {
    const result = formatDateTime(testDate, true, 'de-DE')
    expect(result).toMatch(/15\.06\.2024/)
    expect(result).toMatch(/14:30/)
  })
})

describe('formatDateTimeSeconds', () => {
  const testDate = new Date('2024-06-15T14:30:45Z')

  it('returns dash when date is null', () => {
    expect(formatDateTimeSeconds(null, false, 'en-US')).toBe('–')
  })

  it('includes seconds in the output', () => {
    const result = formatDateTimeSeconds(testDate, true, 'en-US')
    expect(result).toMatch(/02:30:45/)
  })
})

describe('formatTime', () => {
  const testDate = new Date('2024-06-15T14:30:00Z')

  it('returns dash when date is null', () => {
    expect(formatTime(null as unknown as Date, false, 'en-US')).toBe('–')
  })

  it('formats time in en-US locale with 12-hour format', () => {
    const result = formatTime(testDate, true, 'en-US')
    expect(result).toMatch(/02:30/)
    expect(result).toMatch(/PM/)
  })

  it('formats time in de-DE locale with 24-hour format', () => {
    const result = formatTime(testDate, true, 'de-DE')
    expect(result).toMatch(/14:30/)
  })

  it('hides timezone when showTimeZone is false', () => {
    const result = formatTime(testDate, true, 'en-US', false)
    expect(result).not.toMatch(/UTC/)
  })
})

describe('formatTimeSeconds', () => {
  const testDate = new Date('2024-06-15T14:30:45Z')

  it('returns dash when date is null', () => {
    expect(formatTimeSeconds(null as unknown as Date, false, 'en-US')).toBe('–')
  })

  it('includes seconds in the output', () => {
    const result = formatTimeSeconds(testDate, true, 'en-US')
    expect(result).toMatch(/02:30:45/)
  })
})

describe('isSameDayAsToday', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-06-15T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns true for today in UTC', () => {
    const today = new Date('2024-06-15T08:00:00Z')
    expect(isSameDayAsToday(today, true)).toBe(true)
  })

  it('returns false for a different day in UTC', () => {
    const yesterday = new Date('2024-06-14T08:00:00Z')
    expect(isSameDayAsToday(yesterday, true)).toBe(false)
  })

  it('returns true for today in local time', () => {
    const today = new Date('2024-06-15T12:00:00Z')
    expect(isSameDayAsToday(today, false)).toBe(true)
  })

  it('returns false for a different day in local time', () => {
    const tomorrow = new Date('2024-06-16T12:00:00Z')
    expect(isSameDayAsToday(tomorrow, false)).toBe(false)
  })
})

describe('timeAgo', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-06-15T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns dash when date is null', () => {
    expect(timeAgo(null)).toBe('–')
  })

  it('returns seconds ago for recent times', () => {
    const date = new Date('2024-06-15T11:59:30Z')
    const result = timeAgo(date)
    expect(result).toBe('30 seconds ago')
  })

  it('returns minutes ago for times within the hour', () => {
    const date = new Date('2024-06-15T11:55:00Z')
    const result = timeAgo(date)
    expect(result).toBe('5 minutes ago')
  })

  it('returns hours ago for times within the day', () => {
    const date = new Date('2024-06-15T10:00:00Z')
    const result = timeAgo(date)
    expect(result).toBe('2 hours ago')
  })

  it('returns days ago for times within the month', () => {
    const date = new Date('2024-06-10T12:00:00Z')
    const result = timeAgo(date)
    expect(result).toBe('5 days ago')
  })

  it('returns months ago for times within the year', () => {
    const date = new Date('2024-04-15T12:00:00Z')
    const result = timeAgo(date)
    expect(result).toBe('2 months ago')
  })

  it('returns years ago for older times', () => {
    const date = new Date('2022-06-15T12:00:00Z')
    const result = timeAgo(date)
    expect(result).toBe('2 years ago')
  })

  it('handles future dates', () => {
    const date = new Date('2024-06-15T12:00:30Z')
    const result = timeAgo(date)
    expect(result).toBe('in 30 seconds')
  })
})
