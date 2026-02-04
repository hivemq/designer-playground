import type { IntlFormat } from './date'

const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
const sizesBinary = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

export const formatByteNumber = (
  bytes: number | undefined,
  formatSetting: IntlFormat,
  isBinary = false,
  maximumFractionDigits = 2,
  minimumFractionDigits = 2,
): string => {
  let k: number
  let selectedSizes: string[]
  if (isBinary) {
    k = 1024
    selectedSizes = sizesBinary
  } else {
    k = 1000
    selectedSizes = sizes
  }

  if (bytes == null || Number.isNaN(bytes)) {
    return '–'
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  if (i < 1) {
    return `${formatNumber(bytes, formatSetting, 0, 0)} ${selectedSizes[0]}`
  }

  const sizeIndex = Math.min(i, selectedSizes.length - 1)
  return `${formatNumber(bytes / k ** sizeIndex, formatSetting, maximumFractionDigits, minimumFractionDigits)} ${selectedSizes[sizeIndex]}`
}

export const formatNumber = (
  value: number,
  formatSetting: IntlFormat,
  maximumFractionDigits = 2,
  minimumFractionDigits = 0,
): string => {
  if (value == null || Number.isNaN(value)) {
    return '–'
  }

  return Number(value).toLocaleString(formatSetting, {
    minimumFractionDigits,
    maximumFractionDigits,
  })
}

export const formatLargeNumber = (
  value: number,
  formatSetting: IntlFormat,
  space = ' ',
): string => {
  if (value == null || Number.isNaN(value)) {
    return '–'
  }
  if (value < 1_000 || value >= Number.POSITIVE_INFINITY) {
    return formatNumber(value, formatSetting)
  }
  if (value < 1_000_000) {
    const translatedMillions = 'k'
    const formattedNumber = formatNumber(value / 1_000, formatSetting, 1, 1)
    return `${formattedNumber}${space}${translatedMillions}`
  }
  const translatedMillions = 'm'
  const formattedNumber = formatNumber(value / 1_000_000, formatSetting, 1, 1)
  return `${formattedNumber}${space}${translatedMillions}`
}
