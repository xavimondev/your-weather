// TODO: Improve all this weird logic

export const getMeaningByUvIndex = (uvIndex) => {
  if (uvIndex < 3) return 'LOW'
  else if (uvIndex < 6) return 'MODERATE'
  else if (uvIndex < 8) return 'HIGH'
  else if (uvIndex < 11) return 'VERY HIGH'
  else return 'EXTREME'
}

export const getColorTemperature = (temp) => {
  if (temp < 0) return 'bg-blue-700' // dark blue
  else if (temp < 15) return 'bg-blue-400' // light blue
  else if (temp < 20) return 'bg-green-200' // green
  else if (temp < 25) return 'bg-yellow-300' // yellow
  else if (temp < 30) return 'bg-orange-300' // orange
  else return 'bg-red-500' // red
}

export const getHourFormatted = (hour) => (hour < 10 ? `0${hour}` : hour)

export const extractHourFromDate = (localtime) => {
  const resDate = localtime.split(' ')
  const weirdHour = resDate[1].split(':')[0]

  return weirdHour
}

/* Create a function to convert 12 hours to 24 hours, Thanks copilot for this snippet */
export const convert12to24 = (time) => {
  const [hours, minutes] = time.split(':')
  const [, period] = minutes.split(' ')
  const newHour = parseInt(hours)
  if (period === 'PM') {
    return newHour + 12
  }
  return newHour
}
