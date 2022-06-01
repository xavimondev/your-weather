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
  <!-- I just wanted to put this style on this page, so I followed that comment ⬇️-->
  <!-- Explanation: https://stackoverflow.com/questions/61909748/updating-body-background-color-in-sapper -->
  <style>
    body {
      background-color: #29539b;
      background-image: linear-gradient(315deg, #29539b 0%, #1e3b70 74%);
      color: white;
      background-repeat: no-repeat;
      background-attachment: fixed;
      height: 100%;
    }
  </style>
</svelte:head>

{#if loading}
  <h1>Loading</h1>
{:else}
  {#await weatherPromise then { info, forecast, astronomy }}
    <main class="max-h-screen mx-5 mt-12 mb-80">
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

<style>
  /* I added this class because backdrop utilities are not applying correctly
  Issue here: https://github.com/tailwindlabs/tailwindcss/discussions/7044
  */
  :global(.back-filter) {
    backdrop-filter: blur(5px) brightness(110%);
  }
</style>
