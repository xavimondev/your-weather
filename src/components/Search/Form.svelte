<script>
  export let city
  export let handleChange
  export let searchInput
</script>

<form autocomplete="off" on:submit={(e) => e.preventDefault()}>
  <div class="relative flex items-center focus-within:text-gray-300">
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
      class="pr-3 pl-10 py-2 rounded-t-lg w-full text-gray-300 text-md placeholder-zinc-300 outline-none bg-zinc-800"
      placeholder="Search for a city or town"
    />
  </div>
</form>
