<script>
  import { getLocation } from '../utils/getLocation'
  import { DEFAULT_QUERY } from '../constants'
  import { cityStore } from '../stores/favorite'
  import { getWeatherFrom } from '../services/weather'
  import HourlyForecast from '../components/HourlyForecast.svelte'
  import ThreeDayForecast from '../components/ThreeDayForecast.svelte'
  import TodayWeather from '../components/TodayWeather.svelte'
  import Indicators from '../components/Indicators.svelte'
  import Navbar from '../components/Navbar.svelte'
  import WeatherEffect from '../components/WeatherEffect.svelte'
  import Fallback from '../components/Fallbacks/Fallback.svelte'

  let loading
  let weatherPromise

  const getWeather = async (citySelected) => {
    try {
      const coords = await getLocation()
      const city = citySelected === 'your_city' ? coords : citySelected
      weatherPromise = getWeatherFrom(city)
    } catch (error) {
      // In this case, user denied the permission to access location,
      // therefore, I will use the default ip or favorite city on locaslstorage
      const city = citySelected === 'your_city' ? DEFAULT_QUERY : citySelected
      weatherPromise = getWeatherFrom(city)
    } finally {
      loading = false
    }
  }

  $: if ($cityStore) {
    loading = true
    // console.log(`${$cityStore} has changed`)
    getWeather($cityStore)
  }
</script>

<svelte:head>
  <title>Weather</title>
  <!-- I just wanted to put this style on this page, so I followed that comment ⬇️-->
  <!-- Explanation: https://stackoverflow.com/questions/61909748/updating-body-background-color-in-sapper -->
  <style>
    body {
      color: white;
    }
  </style>
</svelte:head>

{#if loading}
  <Fallback />
{:else}
  {#await weatherPromise}
    <Fallback />
  {:then { info, forecast, astronomy }}
    <main class="w-full absolute">
      <WeatherEffect {info} {astronomy} />
      <div class="relative z-50 mb-32 mx-5 mt-12">
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
      </div>
      <Navbar />
    </main>
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
