<script>
  import { addFavorite } from '../stores/store'
  import { fade, fly } from 'svelte/transition'
  import { getColorTemperature, getHourFormatted, getMeaningByUvIndex } from '../utils/weather'

  // Props
  export let weather
  export let forecast
  export let astronomy
  export let isVisible

  let gradient
  let linears = [
    { isDay: 1, gradient: 'linear-gradient(315deg, #4093c0 0%, #408bb6 74%)' },
    { isDay: 0, gradient: 'linear-gradient(#111425, #1e3b70)' }
  ]

  $: if (weather) {
    // console.log({ weather, forecast, astronomy })
    const { isDay } = weather
    gradient = linears.find((linear) => linear.isDay === isDay).gradient
  }

  const add = () => {
    const { cityName, region, country } = weather
    const id = `${cityName}_${region}_${country}`

    const weatherData = {
      id,
      weather,
      astronomy,
      forecast
    }
    addFavorite(weatherData)
    cancel()
  }

  // Close modal
  const cancel = () => {
    isVisible = false
  }
</script>

{#if weather && forecast && astronomy}
  <div class="mx-1" in:fly={{ y: 200, duration: 200 }} out:fade>
    <div class="bg-black/[.3] fixed top-0 left-0 right-0 bottom-0" />
    <div class="z-20 fixed bottom-0 left-0 right-0 overflow-auto h-[90%] rounded-t-2xl">
      <div class="py-2 px-1" style={`background: ${gradient}`}>
        <!-- Buttons -->
        <div class="flex flex-row justify-between mt-3 mx-4">
          <button
            class="font-medium text-sm uppercase border-solid bg-red-400 rounded-lg p-2 text-white cursor-pointer"
            on:click={cancel}>cancel</button
          >
          <button
            class="font-medium text-sm uppercase border-solid bg-blue-500 rounded-lg p-2 text-white cursor-pointer"
            on:click={add}>add</button
          >
        </div>
        <!-- Today data -->
        <section class="text-center mt-6 flex flex-col gap-4 mb-10">
          <h2 class="text-3xl text-white">{weather.cityName}</h2>
          <h1 class="text-6xl text-white">{weather.temperature}º</h1>
          <h4 class="text-white">{weather.condition}</h4>
        </section>
        <!-- Hourly Forecast -->
        <section class="border-none bg-white/5 rounded-2xl p-4 mb-3">
          <header
            class="uppercase text-sm font-semibold text-gray-300 mb-4 border-b border-gray-100/10 pb-3"
          >
            hourly forecast
          </header>
          <ul class="flex gap-5 overflow-x-scroll max-w-full cursor-grab">
            {#each forecast.currentDayForecast as { temp, icon, condition, hour }, i}
              <li class="min-w-[64px] min-h-[110px]">
                <ul class="text-center">
                  <li class="font-semibold text-white">
                    {i === 0 ? 'Now' : getHourFormatted(hour)}
                  </li>
                  <li>
                    <img src={icon} alt={condition} />
                  </li>
                  <li class="font-bold text-lg text-white">{temp}º</li>
                </ul>
              </li>
            {/each}
          </ul>
        </section>
        <!-- 3 Day Forecast -->
        <section class="border-none bg-white/5 rounded-2xl p-4 mb-3">
          <header
            class="uppercase text-sm font-semibold mb-4 border-b border-gray-100/10 pb-3 text-gray-300"
          >
            3-day-forecast
          </header>
          <div class="flex flex-col gap-4 divide-y divide-gray-100/10">
            {#each forecast.forecastHistoricalData as { date, icon, mintemp_c, maxtemp_c, temperatures }}
              <div class="flex justify-between items-center w-full h-10">
                <span class="font-semibold text-white">{date}</span>
                <img src={icon} width="48" height="48" alt="sunny" />
                <div class="flex justify-between gap-1 items-center">
                  <span class="text-gray-300">{mintemp_c}º</span>
                  <div class="flex flex-row rounded-xl border border-t-gray-50">
                    {#each temperatures as { temp }}
                      <span class={`w-1 h-1 ${getColorTemperature(temp)}`} />
                    {/each}
                  </div>
                  <span class="font-semibold text-white">{maxtemp_c}º</span>
                </div>
              </div>
            {/each}
          </div>
        </section>
        <!-- Other indicators-->
        <section class="grid gap-4 grid-cols-2 grid-rows-4">
          <!-- UV Index  -->
          <div class="border-none bg-white/5 rounded-2xl p-4">
            <header class="uppercase text-sm font-semibold mb-2 pb-1 text-gray-300">
              uv index
            </header>
            <div class="">
              <h1 class="font-bold text-2xl text-white">{weather.uvindex}</h1>
              <h2 class="font-semibold text-md text-white">
                {getMeaningByUvIndex(weather.uvindex)}
              </h2>
            </div>
          </div>
          <!-- Sunset -->
          <div class="border-none bg-white/5 rounded-2xl p-4">
            <header class="uppercase text-sm font-semibold mb-2 pb-1 text-gray-300">sunset</header>
            <div class="flex flex-col gap-3">
              <h1 class="font-bold text-2xl text-white">{astronomy.sunset}</h1>
              <h2 class="text-sm text-white">Sunrise: {astronomy.sunrise}</h2>
            </div>
          </div>
          <!-- Wind -->
          <div class="border-none bg-white/5 rounded-2xl p-4">
            <header class="uppercase text-sm font-semibold mb-2 pb-1 text-gray-300">wind</header>
            <h1 class="font-bold text-2xl text-white">{weather.wind} km/h</h1>
          </div>
          <!-- Precipitation -->
          <div class="border-none bg-white/5 rounded-2xl p-4">
            <header class="uppercase text-sm font-semibold mb-2 pb-1 text-gray-300">
              precipitation
            </header>
            <div class="">
              <h1 class="font-bold text-2xl text-white">{weather.precipitation} mm</h1>
              <h2 class="font-semibold text-md text-white">in last 24 hours</h2>
            </div>
          </div>
          <!-- Feels like -->
          <div class="border-none bg-white/5 rounded-2xl p-4">
            <header class="uppercase text-sm font-semibold mb-2 pb-1 text-gray-300">
              feels like
            </header>
            <div class="">
              <h1 class="font-bold text-2xl text-white">{weather.feelslike}º</h1>
            </div>
          </div>
          <!-- Humidity -->
          <div class="border-none bg-white/5 rounded-2xl p-4">
            <header class="uppercase text-sm font-semibold mb-2 pb-1 text-gray-300">
              humidity
            </header>
            <div class="">
              <h1 class="font-bold text-2xl text-white">{weather.humidity}%</h1>
            </div>
          </div>
          <!-- Visibility -->
          <div class="border-none bg-white/5 rounded-2xl p-4">
            <header class="uppercase text-sm font-semibold mb-2 pb-1 text-gray-300">
              visibility
            </header>
            <div class="">
              <h1 class="font-bold text-2xl text-white">{weather.visibility} km</h1>
            </div>
          </div>
          <!-- Pressure -->
          <div class="border-none bg-white/5 rounded-2xl p-4">
            <header class="uppercase text-sm font-semibold mb-2 pb-1 text-gray-300">
              pressure
            </header>
            <div class="">
              <h1 class="font-bold text-2xl text-white">{weather.pressure} mb</h1>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
{/if}
