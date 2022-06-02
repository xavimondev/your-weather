<script>
  import Favorites from '../components/Favorites.svelte'
  import PreviewWeather from '../components/PreviewWeather.svelte'
  import SearchMain from '../components/Search/SearchMain.svelte'

  // Result of promises
  let weather
  let astronomyData
  let forecastData
  let isVisible = false
</script>

<svelte:head>
  <title>Search</title>
  <style>
    body {
      background: #111111;
      overflow: hidden;
    }
  </style>
</svelte:head>

<main class="max-h-screen mx-5 my-12">
  <h1 class="font-bold text-4xl mb-4 text-white">Search</h1>
  <SearchMain bind:weather bind:astronomyData bind:forecastData bind:isVisible />
  <Favorites />
</main>

{#if isVisible}
  <PreviewWeather {weather} forecast={forecastData} astronomy={astronomyData} bind:isVisible />
{/if}
