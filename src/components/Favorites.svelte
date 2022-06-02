<script>
  // I based on https://svelte.dev/repl/f649d828badf468cacad8bdc8b4088a3?version=3.29.0
  import { slide } from 'svelte/transition'
  import { spring } from 'svelte/motion'
  import { removeFavorite, weatherStore } from '../stores/store'
  import { updateCitySelected } from '../stores/favorite'
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

  const deleteFavorite = (id) => {
    coords.set({ x: 0, y: 0 }, { hard: true })
    removeFavorite(id)
  }

  $: side = $coords.x >= (w / 2) * 1 ? 'left' : 'right'
  $: side === 'left' ? deleteFavorite(favoriteId) : ''
</script>

<!-- Favorites -->
<section class="w-full flex flex-col gap-6 mt-20">
  {#each $weatherStore as { id, weather, forecast }, index}
    <!--- Weather Item-->
    <div
      out:slide={{ duration: 500 }}
      class="relative rounded-2xl flex items-center bg-gradient-to-r from-red-500 to-pink-400 w-full h-28 cursor-pointer"
      on:click={updateCitySelected(weather.cityName)}
    >
      <SvgIcon d={itrash} />
      <div
        class="absolute w-full h-full border-2 rounded-2xl border-none bg-[#181b29] p-3"
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
            <a class="font-semibold text-md md:text-xl text-white" href="/">{weather.cityName}</a>
            <h2 class="text-3xl md:text-5xl text-white">{weather.temperature}º</h2>
          </div>
          <div class="flex flex-row justify-between w-full">
            <span class="text-gray-300 text-sm">{weather.condition}</span>
            <div>
              <span class="text-sm text-white">H:{forecast.todayMaxTemp}º</span>
              <span class="text-sm text-white">L:{forecast.todayMinTemp}º</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--- End Weather Item-->
  {/each}
</section>
<!-- End Favorites -->
