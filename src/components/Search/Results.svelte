<script>
  export let filteredCities = []
  export let setInputValue
  export let hiLiteIndex
  /* Navigating over the list of countries using keyboard */
  const classes =
    'mb-2 py-1 px-2 text-sm cursor-pointer font-medium hover:bg-slate-200 hover:rounded-md'

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

<svelte:window on:keydown={navigateList} />

<div class="relative z-10">
  {#if filteredCities.length > 0}
    <ul class="p-3 w-full border border-solid bg-slate-100 rounded-b-lg shadow-sm list-results">
      {#each filteredCities as city, i}
        <li
          class={`${classes} ${i === hiLiteIndex ? 'bg-slate-200' : ''}`}
          on:click={() => setInputValue(city)}
        >
          {city.name}, {city.region}, {city.country}
        </li>
      {/each}
    </ul>
  {/if}
</div>
