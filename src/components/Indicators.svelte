<script>
  import { getMeaningByUvIndex } from '../utils/weather'

  export let uvindex
  export let sunset
  export let sunrise
  export let wind
  export let precipitation
  export let feelslike
  export let humidity
  export let visibility
  export let pressure
</script>

<!-- Other indicators-->
<section class="grid gap-4 grid-cols-2 grid-rows-4">
  <!-- UV Index  -->
  <div class="border-2 border-cyan-200 rounded-2xl p-4 uv-index">
    <header class="uppercase text-sm font-semibold mb-2 pb-1">uv index</header>
    <div class="">
      <h1 class="font-bold text-2xl uv-index-value">{uvindex}</h1>
      <h2 class="font-semibold text-md">
        {getMeaningByUvIndex(uvindex)}
      </h2>
    </div>
  </div>
  <!-- Sunset -->
  <div class="border-2 border-cyan-200 rounded-2xl p-4 sunset">
    <header class="uppercase text-sm font-semibold mb-2 pb-1">sunset</header>
    <div class="flex flex-col gap-3">
      <h1 class="font-bold text-2xl sunset-value">{sunset}</h1>
      <h2 class="text-sm sunrise-value">Sunrise: {sunrise}</h2>
    </div>
  </div>
  <!-- Wind -->
  <div class="border-2 border-cyan-200 rounded-2xl p-4 wind">
    <header class="uppercase text-sm font-semibold mb-2 pb-1">wind</header>
    <h1 class="font-bold text-2xl wind-value">{wind} km/h</h1>
  </div>
  <!-- Precipitation -->
  <div class="border-2 border-cyan-200 rounded-2xl p-4 precipitation">
    <header class="uppercase text-sm font-semibold mb-2 pb-1">precipitation</header>
    <h1 class="font-bold text-2xl precipitation-value">{precipitation} mm</h1>
    <h2 class="font-semibold text-md">in last 24 hours</h2>
  </div>
  <!-- Feels like -->
  <div class="border-2 border-cyan-200 rounded-2xl p-4 feels-like">
    <header class="uppercase text-sm font-semibold mb-2 pb-1">feels like</header>
    <h1 class="font-bold text-2xl feels-like-value">{feelslike}º</h1>
  </div>
  <!-- Humidity -->
  <div class="border-2 border-cyan-200 rounded-2xl p-4 humidity">
    <header class="uppercase text-sm font-semibold mb-2 pb-1">humidity</header>
    <h1 class="font-bold text-2xl humidity-value">{humidity}%</h1>
  </div>
  <!-- Visibility -->
  <div class="border-2 border-cyan-200 rounded-2xl p-4 visibility">
    <header class="uppercase text-sm font-semibold mb-2 pb-1">visibility</header>
    <h1 class="font-bold text-2xl visibility-value">{visibility} km</h1>
  </div>
  <!-- Pressure -->
  <div class="border-2 border-cyan-200 rounded-2xl p-4 pressure">
    <header class="uppercase text-sm font-semibold mb-4 pb-1">pressure</header>
    <h1 class="font-bold text-2xl pressure-value">{pressure} mb</h1>
  </div>
</section>
