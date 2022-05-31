const SECONDS_PER_DAY = 24 * 60 * 60
export const getSecondsUntilEndDay = () => {
  const d = new Date()
  const h = d.getHours()
  const m = d.getMinutes()
  const s = d.getSeconds()
  const SECONDS_ELAPSED_HOUR = h * 60 * 60
  const SECONDS_ELAPSED_MINUTE = m * 60
  const SECONDS_ELAPSED = s
  const secondsUntilEndOfDate =
    SECONDS_PER_DAY - SECONDS_ELAPSED_HOUR - SECONDS_ELAPSED_MINUTE - SECONDS_ELAPSED
  return secondsUntilEndOfDate
}

// TODO: Improve weird logic
const formatDate = (date) => {
  const [year, month, day] = date.split('-')
  const resultDate = [month, day, year].join('-')
  return resultDate
}

export const getNameOfDay = (date) => {
  const resultDate = formatDate(date)
  const d = new Date(resultDate)
  const dayName = d.toLocaleString('en-US', { weekday: 'short' })
  return dayName
}
