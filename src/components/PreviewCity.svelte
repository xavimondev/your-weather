<script>
  import { fade, fly } from 'svelte/transition'
  import { getColorTemperature, getHourFormatted, getMeaningByUvIndex } from '../utils/weather'
  import { addFavorite, removeFavorite } from '../stores/store'
  export let weather
  export let forecast
  export let astronomy

  const add = () => {
    const weatherData = {
      weather,
      astronomy,
      forecast
    }
    addFavorite(weatherData)
  }
</script>

{#if weather && forecast && astronomy}
  <div class="mx-1" in:fly={{ y: 200, duration: 200 }} out:fade>
    <div class="bg-black/[.5] fixed top-0 left-0 right-0 bottom-0" />
    <div class="fixed bottom-0 left-0 right-0 overflow-auto h-[90%] rounded-t-2xl">
      <div class="bg-white py-2 px-1">
        <!-- Buttons -->
        <div class="flex flex-row justify-between mt-3 mx-4">
          <button
            class="font-medium text-sm uppercase border-2 border-solid border-red-400 rounded-lg p-1 text-red-600 cursor-pointer"
            >cancel</button
          >
          <button
            class="font-medium text-sm uppercase border-2 border-solid border-blue-400 rounded-lg p-1 text-blue-400 cursor-pointer"
            on:click={add}>add</button
          >
        </div>
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
          <ul class="flex gap-5 overflow-x-scroll max-w-full cursor-grab">
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
          </ul>
        </section>
        <!-- 3 Day Forecast -->
        <section class="border-2 border-cyan-200 rounded-2xl p-4 mb-3">
          <header class="uppercase text-sm font-semibold mb-4 border-b border-cyan-500 pb-3">
            3-day-forecast
          </header>
          <div class="flex flex-col gap-4 divide-y divide-blue-200">
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
              <h1 class="font-bold text-2xl">{astronomy.sunset}</h1>
              <h2 class="text-sm">Sunrise: {astronomy.sunrise}</h2>
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
            <header class="uppercase text-sm font-semibold mb-2 pb-1">pressure</header>
            <div class="">
              <h1 class="font-bold text-2xl">{weather.pressure} mb</h1>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
{/if}
