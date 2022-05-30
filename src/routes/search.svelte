<script>
  import Favorites from '../components/Favorites.svelte'
  import PreviewCity from '../components/PreviewCity.svelte'
  import SearchMain from '../components/Search/SearchMain.svelte'

  // Result of promises
  let weather
  let astronomyData
  let forecastData
  let isVisible = false
</script>

<svelte:head>
  <title>Search</title>
</svelte:head>

<main class="max-h-screen mx-5 my-12">
  <h1 class="font-bold text-4xl mb-4">Search</h1>
  <SearchMain bind:weather bind:astronomyData bind:forecastData bind:isVisible />
  <Favorites />
</main>

{#if isVisible}
  <PreviewCity {weather} forecast={forecastData} astronomy={astronomyData} />
{/if}
