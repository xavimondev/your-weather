<script>
  import '../app.css'
  import { spring } from 'svelte/motion'
  import { slide } from 'svelte/transition'
  import { weatherStore } from '../stores/store'
  import { itrash } from '../icons'
  import { myslide } from '../utils/myslide'
  import { getWeatherFrom, searchCity } from '../services/weather'
  import PreviewCity from '../components/PreviewCity.svelte'
  import SvgIcon from '../components/SvgIcon.svelte'
  /* Animations*/
  let coords = spring({ x: 0, y: 0 }, { stiffness: 0.05, damping: 0.5 })
  let selected
  let current
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

  function deleteContact(id) {
    coords.set({ x: 0, y: 0 }, { hard: true })
  }

  $: side = $coords.x >= (w / 2) * 1 ? 'left' : 'right'
  $: side === 'left' ? deleteContact(current) : ''

  /* Data */
  const classes =
    'mb-2 py-1 px-2 text-sm cursor-pointer font-medium hover:bg-slate-200 hover:rounded-md'
  let city = ''
  // Get reference to a DOM node, in this case I will use to focus input
  let searchInput
  // List of cities
  let filteredCities = []
  // Result of promises
  let weather
  let astronomyData
  let forecastData
  let isVisible = false

  const handleChange = async () => {
    if (city.length > 2) {
      const response = await searchCity(city)
      console.log(response)
      filteredCities = response
    }
  }

  $: if (!city) {
    filteredCities = []
  }

  const getDataWeatherSelected = async (lat, lon) => {
    const results = await getWeatherFrom(`${lat},${lon}`)
    const { info, astronomy, forecast } = results
    weather = info
    astronomyData = astronomy
    forecastData = forecast
  }

  const setInputValue = (citySelected) => {
    const { name, country, lat, lon } = citySelected
    city = `${name}, ${country}`
    filteredCities = []
    hiLiteIndex = null
    searchInput.focus()
    isVisible = true
    getDataWeatherSelected(lat, lon)
  }

  /* Navigating over the list of countries using keyboard */
  let hiLiteIndex = null

  const navigateList = (e) => {
    if (e.key === 'ArrowDown' && hiLiteIndex <= filteredCities.length - 1) {
      hiLiteIndex === null ? (hiLiteIndex = 0) : (hiLiteIndex += 1)
    } else if (e.key === 'ArrowUp' && hiLiteIndex !== null) {
      hiLiteIndex === 0 ? (hiLiteIndex = filteredCities.length - 1) : (hiLiteIndex -= 1)
    } else if (e.key === 'Enter') {
      setInputValue(filteredCities[hiLiteIndex])
    } else {
      return
    }
  }
</script>

<svelte:head>
  <title>Search</title>
</svelte:head>

<svelte:window on:keydown={navigateList} />

<main class="max-h-screen mx-5 my-12">
  <h1 class="font-bold text-4xl mb-4">Weather</h1>
  <!-- Search box -->
  <section class="mb-8 w-full z-30">
    <form autocomplete="off" on:submit={(e) => e.preventDefault()}>
      <div class="relative flex items-center focus-within:text-gray-600">
        <span class="absolute ml-3 text-gray-400 pointer-events-none">
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
        </span>
        <input
          type="search"
          bind:this={searchInput}
          bind:value={city}
          on:input={handleChange}
          class="pr-3 pl-10 py-2 rounded-lg w-full border border-gray-300 text-md placeholder-slate-400 outline-none"
          placeholder="Search for a city or town"
        />
      </div>
    </form>
    <div class="relative z-10">
      {#if filteredCities.length > 0}
        <ul class="p-3 w-full border border-solid bg-slate-100 rounded-b-lg shadow-sm">
          {#each filteredCities as city, i}
            <li
              class={`${classes} ${i === hiLiteIndex ? 'bg-slate-200' : ''}`}
              on:click={() => setInputValue(city)}
            >
              {city.name}, {city.country}
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </section>
  <!-- Favorites -->
  <section class="w-full flex flex-col gap-6">
    {#each $weatherStore as { weather, forecast }, index}
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
            ;(selected = index), (current = index)
            handleSlideStart
          }}
          on:slidemove={handleSlideMove}
          on:slideend={handleSlideEnd}
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
</main>

{#if isVisible}
  <PreviewCity {weather} forecast={forecastData} astronomy={astronomyData} />
{/if}
