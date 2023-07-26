import { format, isValid } from 'date-fns'
import { fr } from 'date-fns/locale'

export const MILLISECOND = 1
export const SECOND = 1000 * MILLISECOND
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR

export function isFuture(date: Date) {
  return date.valueOf() > Date.now().valueOf()
}

export function isPast(date: Date) {
  return date.valueOf() < Date.now().valueOf()
}

export function convertToDbDate(date: Date | string): string {
  let dbDate = typeof date === "string" ? new Date(date) : date
  if (isNaN(dbDate.valueOf())) { throw new Error('Invalid Date') }

  return dbDate.toISOString()
}

const DATE_FORMAT = {
  // 19:20
  SESSION_TIME: 'HH:mm',
  // Mercredi 15 Janvier
  DAY_LITERAL: 'EEEE d LLLL',
  // 18h20
  TIME_LITERAL: "HH'h'mm",
}

const options = { locale: fr }

export const convertToDate = (date: string | Date): Date | null => {
  const newDate = typeof date === 'string' ? new Date(date) : date
  if (! isValid(newDate)) return null

  return newDate
}

// de 18h20 à 19h30
export const getTimeIntervalLiteral = (start: Date | string, end: Date | string): string => {
  const dateFormat = DATE_FORMAT.TIME_LITERAL
  const startDate = convertToDate(start)
  const endDate = convertToDate(end)
  if (! startDate || ! endDate) return ''

  return `de ${ format(startDate, dateFormat) } à ${ format(endDate, dateFormat) }`
}

// Le mercredi 15 Janvier
export const getDateLiteral = (start: Date | string): string => {
  const dateFormat = DATE_FORMAT.DAY_LITERAL
  const startDate = convertToDate(start)

  if (! startDate) return ''

  return `Le ${ format(startDate, dateFormat, options) }`
}
