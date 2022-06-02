export const FETCH_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    'X-RapidAPI-Key': import.meta.env.VITE_RAPID_KEY
  }
}
const RAPID_KEY =
  process.env.NODE_ENV === 'development'
    ? import.meta.env.VITE_RAPID_KEY
    : process.env.VITE_RAPID_KEY
const RAPID_KEY_2 =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_RAPID_KEY
    : process.env.VITE_RAPID_KEY

console.log(`${RAPID_KEY} width process.env.NODE_ENV`)
console.log(`${RAPID_KEY_2} width import.meta.env.VITE_RAPID_KEY`)
console.log(import.meta.env)
console.log(process.env)

export const RAPIDAPI_HOST = 'https://weatherapi-com.p.rapidapi.com/'
export const DEFAULT_QUERY = 'auto:ip'
export const ENDPOINT_API = '/api/weather'
