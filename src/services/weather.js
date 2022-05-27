import { getKeyFormatted } from '../utils/getKeyFormatted'
import { DEFAULT_QUERY, FETCH_OPTIONS, RAPIDAPI_HOST } from '../constants'

import { searchCache, updateCache } from './cache'

export const getWeatherFrom = async (query = DEFAULT_QUERY) => {
  const response = await fetch(`${RAPIDAPI_HOST}current.json?q=${query}`, FETCH_OPTIONS)
  const data = await response.json()
  const { location, current } = data
  const { country, name, region } = location
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
    isDay: is_day
  }

  const key = getKeyFormatted({ country, name, region })

  const infoAstronomy = await getAstronomy({ query, key: `${key}|astronomy` })
  const infoForecast = await getForecast({ query, key: `${key}|forecast` })

  return {
    info: basicInfoWeather,
    astronomy: infoAstronomy,
    forecast: infoForecast
  }
}

export const getAstronomy = async (q) => {
  const { query, key } = q
  // Looking for data on cache
  const result = await searchCache(key)
  if (!result) {
    // Fetching data from API
    const response = await fetch(`${RAPIDAPI_HOST}astronomy.json?q=${query}`, FETCH_OPTIONS)
    const { astronomy } = await response.json()
    const { astro } = astronomy
    const { sunrise, sunset } = astro
    const astronomyData = {
      sunrise,
      sunset
    }
    // Updating data in cache
    await updateCache({ key, value: astronomyData })

    return astronomyData
  }

  return result
}

const getTemperaturesByHour = (hours = []) =>
  hours.map((h, index) => ({
    temp: h.temp_c,
    hour: index,
    icon: h.condition.icon,
    condition: h.condition.text
  }))

const getTodayTemperatures = (todayForecast = []) => {
  // Every position of array is hour. Start at 0 and finish at 23
  const currentHourIndex = new Date().getHours()
  // Copy of current today's forecast
  const todayForecastData = [...todayForecast]
  // Extract elapsed hours less current hour until last
  const pastHoursTodayForecast = todayForecastData.splice(0, currentHourIndex)
  const todayHourForecastData = [...todayForecastData, ...pastHoursTodayForecast]

  return todayHourForecastData
}

export const getForecast = async (q) => {
  const { query, key } = q
  // Looking for data on cache
  const result = await searchCache(key)
  if (!result) {
    const response = await fetch(`${RAPIDAPI_HOST}forecast.json?q=${query}&days=3`, FETCH_OPTIONS)
    const data = await response.json()
    const {
      forecast: { forecastday }
    } = data

    const forecastHistoricalData = forecastday.map((fv) => {
      const { date, day, hour } = fv
      const { maxtemp_c, mintemp_c, condition } = day
      const { icon } = condition
      const temperaturesByHour = getTemperaturesByHour(hour)
      return {
        date,
        icon,
        mintemp_c: Math.round(mintemp_c),
        maxtemp_c: Math.round(maxtemp_c),
        temperatures: temperaturesByHour
      }
    })
    const currentDayForecast = getTodayTemperatures(forecastHistoricalData[0].temperatures)
    const forecastData = { forecastHistoricalData, currentDayForecast }
    // Updating data in cache
    await updateCache({ key, value: forecastData })

    return forecastData
  }
  return result
}

export const searchCity = async (query = '') => {
  const response = await fetch(`${RAPIDAPI_HOST}search.json?q=${query}`, FETCH_OPTIONS)
  const data = await response.json()
  return data
}
