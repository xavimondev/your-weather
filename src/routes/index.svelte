<script>
  import { getLocation } from '../utils/getLocation'
  import { getWeatherFrom } from '../services/weather'
  import HourlyForecast from '../components/HourlyForecast.svelte'
  import ThreeDayForecast from '../components/ThreeDayForecast.svelte'
  import TodayWeather from '../components/TodayWeather.svelte'
  import Indicators from '../components/Indicators.svelte'
  import Navbar from '../components/Navbar.svelte'

  let loading = true
  let weatherPromise

  getLocation()
    .then((coords) => {
      weatherPromise = getWeatherFrom(coords)
    })
    .catch(() => {
      weatherPromise = getWeatherFrom()
    })
    .finally(() => {
      loading = false
    })
</script>

<svelte:head>
  <title>Weather</title>
</svelte:head>

{#if loading}
  <h1>Loading</h1>
{:else}
  {#await weatherPromise then { info, forecast, astronomy }}
    <main class="max-h-screen mx-5 my-12">
      <TodayWeather
        cityName={info.cityName}
        condition={info.condition}
        temperature={info.temperature}
      />
      <HourlyForecast currentDayForecast={forecast.currentDayForecast} />
      <ThreeDayForecast forecastHistoricalData={forecast.forecastHistoricalData} />
      <!-- TODO: Improve this weird component /> -->
      <Indicators
        uvindex={info.uvindex}
        sunset={astronomy.sunset}
        sunrise={astronomy.sunrise}
        wind={info.wind}
        precipitation={info.precipitation}
        feelslike={info.feelslike}
        humidity={info.humidity}
        visibility={info.visibility}
        pressure={info.pressure}
      />
    </main>
    <Navbar />
  {:catch error}
    <span>{error.message}</span>
  {/await}
{/if}
