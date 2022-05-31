<script>
  import { slide } from 'svelte/transition'
  import { spring } from 'svelte/motion'
  import { removeFavorite, weatherStore } from '../stores/store'
  import { itrash } from '../icons'
  import { myslide } from '../utils/myslide'
  import SvgIcon from './SvgIcon.svelte'

  /* Animations*/
  let coords = spring({ x: 0, y: 0 }, { stiffness: 0.05, damping: 0.5 })
  let selected
  let favoriteId
  let w

  function handleSlideStart() {
    coords.stiffness = coords.damping = 1
  }

  function handleSlideMove(event) {
    coords.update(($coords) => ({
      x: $coords.x + event.detail.dx,
      y: $coords.y + event.detail.dy
    }))
  }

  function handleSlideEnd(event) {
    coords.stiffness = 0.05
    coords.damping = 0.5
    coords.set({ x: 0, y: 0 })
  }

  $: side = $coords.x >= (w / 2) * 1 ? 'left' : 'right'
  $: side === 'left' ? removeFavorite(favoriteId) : ''
</script>

<!-- Favorites -->
<section class="w-full flex flex-col gap-6 mt-20">
  {#each $weatherStore as { id, weather, forecast }, index}
    <!--- Weather Item-->
    <div
      out:slide={{ duration: 500 }}
      class="relative rounded-2xl flex items-center bg-gradient-to-r from-red-500 to-pink-400 w-full h-28 cursor-grab"
    >
      <SvgIcon d={itrash} />
      <div
        class="absolute w-full h-full border-2 rounded-2xl bg-slate-100 p-3"
        bind:offsetWidth={w}
        use:myslide
        on:slidestart={() => {
          selected = index
          favoriteId = id
          handleSlideStart
        }}
        on:slidemove={handleSlideMove}
        on:slideend={handleSlideEnd}
        style="transform: translate3d({selected === index ? $coords.x : 0}px, 0, 0)"
      >
        <div class="flex flex-col gap-4 items-center w-full">
          <div class="flex flex-row justify-between w-full">
            <h2 class="font-semibold text-md md:text-xl">{weather.cityName}</h2>
            <h2 class="text-3xl md:text-5xl">{weather.temperature}º</h2>
          </div>
          <div class="flex flex-row justify-between w-full">
            <span class="text-gray-500 text-sm">{weather.condition}</span>
            <div>
              <span class="text-sm">H:{forecast.todayMaxTemp}º</span>
              <span class="text-sm">L:{forecast.todayMinTemp}º</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--- End Weather Item-->
  {/each}
</section>
<!-- End Favorites -->
