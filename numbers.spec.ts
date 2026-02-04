import { describe, expect, it } from 'vitest'
import { formatByteNumber, formatLargeNumber, formatNumber } from './numbers'

describe('formatNumber', () => {
  it('returns dash when value is null', () => {
    expect(formatNumber(null as unknown as number, 'en-US')).toBe('–')
  })

  it('returns dash when value is NaN', () => {
    expect(formatNumber(Number.NaN, 'en-US')).toBe('–')
  })

  it('formats integer in en-US locale', () => {
    expect(formatNumber(1234567, 'en-US')).toBe('1,234,567')
  })

  it('formats integer in de-DE locale', () => {
    expect(formatNumber(1234567, 'de-DE')).toBe('1.234.567')
  })

  it('formats decimal with default fraction digits', () => {
    expect(formatNumber(1234.5678, 'en-US')).toBe('1,234.57')
  })

  it('formats decimal with custom fraction digits', () => {
    expect(formatNumber(1234.5678, 'en-US', 3, 3)).toBe('1,234.568')
  })

  it('formats zero correctly', () => {
    expect(formatNumber(0, 'en-US')).toBe('0')
  })

  it('formats negative numbers', () => {
    expect(formatNumber(-1234, 'en-US')).toBe('-1,234')
  })
})

describe('formatByteNumber', () => {
  it('returns dash when bytes is undefined', () => {
    expect(formatByteNumber(undefined, 'en-US')).toBe('–')
  })

  it('returns dash when bytes is NaN', () => {
    expect(formatByteNumber(Number.NaN, 'en-US')).toBe('–')
  })

  it('formats small bytes (under 1KB) in decimal', () => {
    expect(formatByteNumber(500, 'en-US', false)).toBe('500 Bytes')
  })

  it('formats small bytes (under 1KiB) in binary', () => {
    expect(formatByteNumber(500, 'en-US', true)).toBe('500 Bytes')
  })

  it('formats kilobytes in decimal (1000-based)', () => {
    expect(formatByteNumber(1500, 'en-US', false)).toBe('1.50 KB')
  })

  it('formats kibibytes in binary (1024-based)', () => {
    expect(formatByteNumber(1536, 'en-US', true)).toBe('1.50 KiB')
  })

  it('formats megabytes in decimal', () => {
    expect(formatByteNumber(1500000, 'en-US', false)).toBe('1.50 MB')
  })

  it('formats mebibytes in binary', () => {
    expect(formatByteNumber(1572864, 'en-US', true)).toBe('1.50 MiB')
  })

  it('formats gigabytes in decimal', () => {
    expect(formatByteNumber(1500000000, 'en-US', false)).toBe('1.50 GB')
  })

  it('formats gibibytes in binary', () => {
    expect(formatByteNumber(1610612736, 'en-US', true)).toBe('1.50 GiB')
  })

  it('formats terabytes in decimal', () => {
    expect(formatByteNumber(1500000000000, 'en-US', false)).toBe('1.50 TB')
  })

  it('formats with custom fraction digits', () => {
    expect(formatByteNumber(1234567, 'en-US', false, 3, 3)).toBe('1.235 MB')
  })

  it('formats in de-DE locale', () => {
    expect(formatByteNumber(1500, 'de-DE', false)).toBe('1,50 KB')
  })

  it('formats zero bytes', () => {
    expect(formatByteNumber(0, 'en-US', false)).toBe('0 Bytes')
  })
})

describe('formatLargeNumber', () => {
  it('returns dash when value is null', () => {
    expect(formatLargeNumber(null as unknown as number, 'en-US')).toBe('–')
  })

  it('returns dash when value is NaN', () => {
    expect(formatLargeNumber(Number.NaN, 'en-US')).toBe('–')
  })

  it('formats numbers under 1000 normally', () => {
    expect(formatLargeNumber(999, 'en-US')).toBe('999')
  })

  it('formats thousands with k suffix', () => {
    expect(formatLargeNumber(1500, 'en-US')).toBe('1.5 k')
  })

  it('formats tens of thousands with k suffix', () => {
    expect(formatLargeNumber(15000, 'en-US')).toBe('15.0 k')
  })

  it('formats hundreds of thousands with k suffix', () => {
    expect(formatLargeNumber(150000, 'en-US')).toBe('150.0 k')
  })

  it('formats millions with m suffix', () => {
    expect(formatLargeNumber(1500000, 'en-US')).toBe('1.5 m')
  })

  it('formats tens of millions with m suffix', () => {
    expect(formatLargeNumber(15000000, 'en-US')).toBe('15.0 m')
  })

  it('formats with custom space separator', () => {
    expect(formatLargeNumber(1500, 'en-US', '')).toBe('1.5k')
  })

  it('formats in de-DE locale', () => {
    expect(formatLargeNumber(1500, 'de-DE')).toBe('1,5 k')
  })

  it('formats zero correctly', () => {
    expect(formatLargeNumber(0, 'en-US')).toBe('0')
  })

  it('returns formatted number for infinity', () => {
    expect(formatLargeNumber(Number.POSITIVE_INFINITY, 'en-US')).toBe('∞')
  })
})
