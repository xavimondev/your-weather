export const FETCH_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    'X-RapidAPI-Key': import.meta.env.VITE_RAPID_KEY
  }
}
export const RAPIDAPI_HOST = 'https://weatherapi-com.p.rapidapi.com/'
export const DEFAULT_QUERY = 'auto:ip'
export const ENDPOINT_API = '/api/weather'
