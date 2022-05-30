<script>
  import { getWeatherFrom } from '../services/weather'
  import HourlyForecast from '../components/HourlyForecast.svelte'
  import ThreeDayForecast from '../components/ThreeDayForecast.svelte'
  import TodayWeather from '../components/TodayWeather.svelte'
  import Indicators from '../components/Indicators.svelte'
  import Navbar from '../components/Navbar.svelte'

  const weatherPromise = getWeatherFrom('Trujillo')
</script>

<svelte:head>
  <title>Weather</title>
</svelte:head>

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
