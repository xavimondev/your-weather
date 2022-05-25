<script>
  import '../app.css'
  import { getAstronomy, getForecast, getWeatherFrom, searchCity } from '../services/weather'
  const classes =
    'mb-2 py-1 px-2 text-sm cursor-pointer font-medium hover:bg-slate-200 hover:rounded-md'
  let city = ''
  // Get reference to a DOM node, in this case I will use to focus input
  let searchInput
  // List of cities
  let filteredCities = []

  const handleChange = async () => {
    if (city.length > 2) {
      const response = await searchCity(city)
      console.log(response)
      filteredCities = response
    }
  }

  $: if (!city) {
    // console.log('Cleaning array because there are not results')
    filteredCities = []
  }

  const setInputValue = async (citySelected) => {
    const { name, country, lat, lon } = citySelected
    city = `${name}, ${country}`
    filteredCities = []
    hiLiteIndex = null
    searchInput.focus()
    // console.log(citySelected)
    const weather = await getWeatherFrom(`${lat},${lon}`)
    const astronomy = await getAstronomy(`${lat},${lon}`)
    const forecast = await getForecast(`${lat},${lon}`)
    console.log({ weather, astronomy, forecast })
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
  <section class="w-full">
    <a href="/">
      <div class="border-2 border-cyan-200 rounded-2xl p-3 mb-3 h-32">
        <div class="flex flex-col gap-4 items-center w-full">
          <div class="flex flex-row justify-between w-full">
            <div>
              <h2 class="font-semibold text-2xl">My Location</h2>
              <span class="text-gray-500 text-sm">08:56</span>
            </div>
            <h2 class="text-5xl">16º</h2>
          </div>
          <div class="flex flex-row justify-between w-full">
            <span class="text-gray-500 text-sm">Mostly Clear</span>
            <div>
              <span class="text-sm">H:21º</span>
              <span class="text-sm">L:16º</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  </section>
</main>
