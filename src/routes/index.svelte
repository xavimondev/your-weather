<script>
  import '../app.css'
  import { getColorTemperature, getMeaningByUvIndex } from '../utils/weather'
  import { getAstronomy, getForecast, getHourFormatted, getWeatherFrom } from '../services/weather'
  const weatherPromise = getWeatherFrom('Trujillo')
  const astronomyPromise = getAstronomy('Trujillo')
  const forecastPromise = getForecast('Trujillo')
</script>

<svelte:head>
  <title>Weather</title>
</svelte:head>

{#await weatherPromise then weather}
  <main class="max-h-screen mx-5 my-12">
    <!-- Today data -->
    <section class="text-center mt-6 flex flex-col gap-4 mb-10">
      <h2 class="text-3xl">{weather.cityName}</h2>
      <h1 class="text-6xl">{weather.temperature}º</h1>
      <h4>{weather.condition}</h4>
    </section>
    <!-- Hourly Forecast -->
    <section class="border-2 border-cyan-200 rounded-2xl p-4 mb-3">
      <header class="uppercase text-sm font-semibold mb-4 border-b border-cyan-500 pb-3">
        hourly forecast
      </header>
      <ul class="flex gap-5 overflow-x-scroll max-w-full">
        {#await forecastPromise then forecast}
          {#each forecast.currentDayForecast as { temp, icon, condition, hour }, i}
            <li class="min-w-[64px] min-h-[110px]">
              <ul class="text-center">
                <li class="font-semibold">{i === 0 ? 'Now' : getHourFormatted(hour)}</li>
                <li>
                  <img src={icon} alt={condition} />
                </li>
                <li class="font-bold text-lg">{temp}º</li>
              </ul>
            </li>
          {/each}
        {/await}
      </ul>
    </section>
    <!-- 3 Day Forecast -->
    <section class="border-2 border-cyan-200 rounded-2xl p-4 mb-3">
      <header class="uppercase text-sm font-semibold mb-4 border-b border-cyan-500 pb-3">
        3-day-forecast
      </header>
      <div class="flex flex-col gap-4 divide-y divide-blue-200">
        {#await forecastPromise then forecast}
          {#each forecast.forecastHistoricalData as { date, icon, mintemp_c, maxtemp_c, temperatures }}
            <div class="flex justify-between items-center w-full h-10">
              <span class="font-semibold">{date}</span>
              <img src={icon} width="48" height="48" alt="sunny" />
              <div class="flex justify-between gap-1 items-center">
                <span>{mintemp_c}º</span>
                <div class="flex flex-row rounded-xl border border-t-gray-50">
                  {#each temperatures as { temp }}
                    <span class={`w-1 h-1 ${getColorTemperature(temp)}`} />
                  {/each}
                </div>
                <span class="font-semibold">{maxtemp_c}º</span>
              </div>
            </div>
          {/each}
        {/await}
      </div>
    </section>
    <!-- Other indicators-->
    <section class="grid gap-4 grid-cols-2 grid-rows-4">
      <!-- UV Index  -->
      <div class="border-2 border-cyan-200 rounded-2xl p-4">
        <header class="uppercase text-sm font-semibold mb-2 pb-1">uv index</header>
        <div class="">
          <h1 class="font-bold text-2xl">{weather.uvindex}</h1>
          <h2 class="font-semibold text-md">{getMeaningByUvIndex(weather.uvindex)}</h2>
        </div>
      </div>
      <!-- Sunset -->
      <div class="border-2 border-cyan-200 rounded-2xl p-4">
        <header class="uppercase text-sm font-semibold mb-2 pb-1">sunset</header>
        <div class="flex flex-col gap-3">
          {#await astronomyPromise then astronomy}
            <h1 class="font-bold text-2xl">{astronomy.sunset}</h1>
            <h2 class="text-sm">Sunrise: {astronomy.sunrise}</h2>
          {/await}
        </div>
      </div>
      <!-- Wind -->
      <div class="border-2 border-cyan-200 rounded-2xl p-4">
        <header class="uppercase text-sm font-semibold mb-2 pb-1">wind</header>
        <div class="">
          <h1 class="font-bold text-2xl">{weather.wind} km/h</h1>
        </div>
      </div>
      <!-- Precipitation -->
      <div class="border-2 border-cyan-200 rounded-2xl p-4">
        <header class="uppercase text-sm font-semibold mb-2 pb-1">precipitation</header>
        <div class="">
          <h1 class="font-bold text-2xl">{weather.precipitation} mm</h1>
          <h2 class="font-semibold text-md">in last 24 hours</h2>
        </div>
      </div>
      <!-- Feels like -->
      <div class="border-2 border-cyan-200 rounded-2xl p-4">
        <header class="uppercase text-sm font-semibold mb-2 pb-1">feels like</header>
        <div class="">
          <h1 class="font-bold text-2xl">{weather.feelslike}º</h1>
        </div>
      </div>
      <!-- Humidity -->
      <div class="border-2 border-cyan-200 rounded-2xl p-4">
        <header class="uppercase text-sm font-semibold mb-2 pb-1">humidity</header>
        <div class="">
          <h1 class="font-bold text-2xl">{weather.humidity}%</h1>
        </div>
      </div>
      <!-- Visibility -->
      <div class="border-2 border-cyan-200 rounded-2xl p-4">
        <header class="uppercase text-sm font-semibold mb-2 pb-1">visibility</header>
        <div class="">
          <h1 class="font-bold text-2xl">{weather.visibility} km</h1>
        </div>
      </div>
      <!-- Pressure -->
      <div class="border-2 border-cyan-200 rounded-2xl p-4">
        <header class="uppercase text-sm font-semibold mb-4 pb-1">pressure</header>
        <div class="">
          <h1 class="font-bold text-2xl">{weather.pressure} mb</h1>
        </div>
      </div>
    </section>
  </main>
  <nav class="fixed bottom-0 z-50 flex  w-full gap-6 p-2 bg-gray-600 justify-between">
    <a
      class="ring-gray-900 p-2 rounded-lg flex text-xs flex-col items-center gap-1 transition hover:text-yellow-300 text-white"
      href="/leaderboard"
    >
      <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"
        ><g
          fill="none"
          fill-rule="evenodd"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          transform="translate(4 2)"
          ><path
            d="m6.5 16.5407715.6311176-.7118691c.71585099-.8191184 1.36011688-1.5983525 1.93279767-2.3377022l.4733382-.6239608c1.97516433-2.6615039 2.96274653-4.77276704 2.96274653-6.33378943 0-3.33218241-2.6862915-6.03344997-6-6.03344997s-6 2.70126756-6 6.03344997c0 1.56102239.98758218 3.67228553 2.96274653 6.33378943l.4733382.6239608c.73630387.9505925 1.5909423 1.9671163 2.56391527 3.0495713z"
          /><circle cx="6.5" cy="6.5" r="2.5" /></g
        ></svg
      >
    </a>
    <a
      class="ring-gray-900 p-2 rounded-lg flex text-xs flex-col items-center gap-1 transition hover:text-yellow-300 text-white"
      href="/leaderboard"
    >
      <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"
        ><g
          fill="none"
          fill-rule="evenodd"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><circle cx="8.5" cy="8.5" r="5" /><path d="m17.571 17.5-5.571-5.5" /></g
        ></svg
      >
    </a>
  </nav>
{:catch error}
  <span>{error.message}</span>
{/await}
