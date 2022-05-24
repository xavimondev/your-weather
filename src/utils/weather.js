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
