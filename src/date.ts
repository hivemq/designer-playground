export type IntlFormat = 'system' | 'de-DE' | 'en-EN' | 'en-US' | undefined

export function formatDate(date: Date, isUTC: boolean, formatSetting: IntlFormat) {
  if (date == null) {
    return '–'
  }
  return date.toLocaleDateString(formatSetting, {
    timeZone: isUTC ? 'UTC' : undefined,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export function formatDateTime(date: Date | null, isUTC: boolean, formatSetting: IntlFormat) {
  if (date == null) {
    return '–'
  }
  return date.toLocaleString(formatSetting, {
    timeZone: isUTC ? 'UTC' : undefined,
    timeZoneName: 'short',
    hour12: formatSetting === 'en-US',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDateTimeSeconds(
  date: Date | null,
  isUTC: boolean,
  formatSetting: IntlFormat,
) {
  if (date == null) {
    return '–'
  }
  return date.toLocaleString(formatSetting, {
    timeZone: isUTC ? 'UTC' : undefined,
    timeZoneName: 'short',
    hour12: formatSetting === 'en-US',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export function isSameDayAsToday(date: Date, isUTC: boolean) {
  const today = new Date()
  if (isUTC) {
    today.setUTCHours(0, 0, 0, 0)
    const utcDate = new Date(date)
    utcDate.setUTCHours(0, 0, 0, 0)
    return utcDate.getTime() === today.getTime()
  }
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}

export function formatTimeSeconds(
  date: Date,
  isUTC: boolean,
  formatSetting: IntlFormat,
  showTimeZone = true,
) {
  if (date == null) {
    return '–'
  }
  return date.toLocaleTimeString(formatSetting, {
    timeZone: isUTC ? 'UTC' : undefined,
    timeZoneName: showTimeZone ? 'short' : undefined,
    hour12: formatSetting === 'en-US',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export function formatTime(
  date: Date,
  isUTC: boolean,
  formatSetting: IntlFormat,
  showTimeZone = true,
) {
  if (date == null) {
    return '–'
  }
  return date.toLocaleTimeString(formatSetting, {
    timeZone: isUTC ? 'UTC' : undefined,
    timeZoneName: showTimeZone ? 'short' : undefined,
    hour12: formatSetting === 'en-US',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatter = new Intl.RelativeTimeFormat('en', {
  style: 'long',
  numeric: 'always',
})

export function timeAgo(date: Date | null) {
  if (date == null) {
    return '–'
  }
  const now = Date.now()
  const diff = Math.floor((now - date.getTime()) / 1000) // Difference in seconds
  const diffAbs = Math.abs(diff)
  const unit = getUnit(diffAbs)
  const sign = diff < 0 ? 1 : -1
  return formatter.format(sign * convertUnit(diffAbs, unit), unit)
}

type CustomRelativeTimeFormatUnit = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year'
const minInSec = 60
const hourInSec = minInSec * 60
const dayInSec = hourInSec * 24
const monthInSec = dayInSec * 30
const yearInSec = dayInSec * 360

function convertUnit(diff: number, unit: CustomRelativeTimeFormatUnit): number {
  switch (unit) {
    case 'second':
      return diff
    case 'minute':
      return Math.floor(diff / minInSec)
    case 'hour':
      return Math.floor(diff / hourInSec)
    case 'day':
      return Math.floor(diff / dayInSec)
    case 'month':
      return Math.floor(diff / monthInSec)
    case 'year':
      return Math.floor(diff / yearInSec)
  }
}

function getUnit(diff: number): CustomRelativeTimeFormatUnit {
  if (diff < minInSec) {
    return 'second'
  }
  if (diff < hourInSec) {
    return 'minute'
  }
  if (diff < dayInSec) {
    return 'hour'
  }
  if (diff < monthInSec) {
    return 'day'
  }
  if (diff < yearInSec) {
    return 'month'
  }
  return 'year'
}
