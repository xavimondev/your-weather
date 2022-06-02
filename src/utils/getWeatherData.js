import { getNameOfDay } from './dates'
import { extractHourFromDate } from './weather'

export const getBasicInfoWeather = (data) => {
  const { location, current } = data
  const { country, name, region, localtime } = location

  //2022-05-31 8:45 -> return 8
  const weirdHour = extractHourFromDate(localtime)

  const {
    temp_c,
    wind_kph,
    pressure_mb,
    humidity,
    feelslike_c,
    vis_km,
    uv,
    precip_mm,
    is_day,
    condition
  } = current
  const { text } = condition

  const basicInfoWeather = {
    country,
    region,
    cityName: name,
    temperature: temp_c,
    condition: text,
    wind: wind_kph,
    pressure: pressure_mb,
    feelslike: feelslike_c,
    visibility: vis_km,
    uvindex: uv,
    humidity,
    precipitation: precip_mm,
    isDay: is_day,
    weirdHour
  }

  return basicInfoWeather
}

const getTemperaturesByHour = (hours = []) =>
  hours.map((h, index) => ({
    temp: h.temp_c,
    hour: index,
    icon: h.condition.icon,
    condition: h.condition.text
  }))

export const getForecastHistoricalData = (forecastday) => {
  const forecastHistoricalData = forecastday.map((fv) => {
    const { date, day, hour } = fv
    const { maxtemp_c, mintemp_c, condition } = day
    const { icon } = condition
    const temperaturesByHour = getTemperaturesByHour(hour)
    return {
      date: getNameOfDay(date),
      icon,
      mintemp_c: Math.round(mintemp_c),
      maxtemp_c: Math.round(maxtemp_c),
      temperatures: temperaturesByHour
    }
  })

  return forecastHistoricalData
}

export const getTodayTemperatures = (todayForecast = [], currentHourIndex) => {
  // Copy of current today's forecast
  const todayForecastData = [...todayForecast]
  // Extract elapsed hours less current hour until last
  const pastHoursTodayForecast = todayForecastData.splice(0, currentHourIndex)
  const todayHourForecastData = [...todayForecastData, ...pastHoursTodayForecast]

  return todayHourForecastData
}
