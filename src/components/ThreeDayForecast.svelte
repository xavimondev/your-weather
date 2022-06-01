<script>
  import { getColorTemperature } from '../utils/weather'

  export let forecastHistoricalData
</script>

<!-- 3 Day Forecast -->
<section class="border-none bg-white/5 back-filter rounded-2xl p-4 mb-3">
  <header
    class="uppercase text-sm text-gray-300 font-semibold mb-4 border-b border-gray-100/10 pb-3"
  >
    3-day-forecast
  </header>
  <div class="flex flex-col gap-4 divide-y divide-gray-100/10">
    {#each forecastHistoricalData as { date, icon, mintemp_c, maxtemp_c, temperatures }}
      <div class="flex justify-between items-center w-full h-10 three-forecast-item">
        <span class="font-semibold">{date}</span>
        <img src={icon} width="32" height="32" alt="sunny" />
        <div class="flex justify-between gap-1 items-center">
          <span class="text-gray-300">{mintemp_c}º</span>
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
