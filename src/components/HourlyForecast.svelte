<script>
  import { getHourFormatted } from '../utils/weather'

  export let currentDayForecast
</script>

<!-- Hourly Forecast -->
<section class="border-none bg-white/5 back-filter rounded-2xl p-4 mb-3">
  <header
    class="uppercase text-sm text-gray-300 font-semibold mb-4 border-b border-gray-100/10 pb-3"
  >
    hourly forecast
  </header>
  <ul class="flex gap-5 overflow-x-scroll max-w-full">
    {#each currentDayForecast as { temp, icon, condition, hour }, i}
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
