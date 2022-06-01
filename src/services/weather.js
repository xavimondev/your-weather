import { DEFAULT_QUERY, FETCH_OPTIONS, RAPIDAPI_HOST } from '../constants'

import { extractHourFromDate } from '../utils/weather'
import {
  getBasicInfoWeather,
  getForecastHistoricalData,
  getTodayTemperatures
} from '../utils/getWeatherData'

export const getWeatherFrom = async (query = DEFAULT_QUERY) => {
  const infoAstronomy = await getAstronomy(query)
  const { forecastData, basicInfoWeather } = await getForecast(query)

  return {
    info: basicInfoWeather,
    astronomy: infoAstronomy,
    forecast: forecastData
  }
}

export const getAstronomy = async (query) => {
  // Fetching data from API
  const response = await fetch(`${RAPIDAPI_HOST}astronomy.json?q=${query}`, FETCH_OPTIONS)
  const { astronomy } = await response.json()
  const { astro } = astronomy
  const { sunrise, sunset } = astro
  const astronomyData = {
    sunrise,
    sunset
  }

  return astronomyData
}

export const getForecast = async (query) => {
  const response = await fetch(`${RAPIDAPI_HOST}forecast.json?q=${query}&days=3`, FETCH_OPTIONS)
  const data = await response.json()
  const {
    forecast: { forecastday },
    location
  } = data

  const basicInfoWeather = getBasicInfoWeather(data)

  const { localtime } = location
  //2022-05-31 8:45 -> return 8
  const weirdHour = extractHourFromDate(localtime)
  // Get forecast for today and next two days
  const forecastHistoricalData = getForecastHistoricalData(forecastday)

  const currentDayForecast = getTodayTemperatures(forecastHistoricalData[0].temperatures, weirdHour)
  const todayMaxTemp = forecastHistoricalData[0].maxtemp_c
  const todayMinTemp = forecastHistoricalData[0].mintemp_c
  const forecastData = { forecastHistoricalData, currentDayForecast, todayMaxTemp, todayMinTemp }

  return { forecastData, basicInfoWeather }
}

export const searchCity = async (query = '') => {
  const response = await fetch(`${RAPIDAPI_HOST}search.json?q=${query}`, FETCH_OPTIONS)
  const data = await response.json()
  return data
}
