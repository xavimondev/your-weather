<script>
  import '../app.css'
</script>

<svelte:head>
  <title>Search</title>
</svelte:head>

<main class="max-h-screen mx-5 my-12">
  <h1 class="font-bold text-4xl mb-4">Weather</h1>
  <!-- Search box -->
  <section class="mb-8 w-full">
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
        class="pr-3 pl-10 py-2 rounded-lg w-full border border-gray-300 text-md placeholder-slate-400 outline-none"
        placeholder="Search for a city or town"
      />
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
              <span class="text-gray-500 text-sm">Trujillo</span>
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
