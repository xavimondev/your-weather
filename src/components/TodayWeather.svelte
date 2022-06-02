<script>
  export let cityName
  export let temperature
  export let condition
</script>

<!-- mt-6 -->
<section class="text-center mt-6 flex flex-col gap-4 mb-10">
  <h2 class="text-3xl">{cityName}</h2>
  <h1 class="text-6xl">{temperature}º</h1>
  <h4>{condition}</h4>
</section>
