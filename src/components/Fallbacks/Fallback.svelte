<script>
  import Sun from '../Icons/Sun.svelte'
  import CloudSun from '../Icons/CloudSun.svelte'
  import Cloudy from '../Icons/Cloudy.svelte'

  let icons = [Sun, CloudSun, Cloudy]
  let linears = [
    'linear-gradient(0deg,rgb(198 157 92) 0%,rgb(126 116 101) 40%,rgb(37 87 134) 100%)',
    'linear-gradient(315deg, #4093c0 0%, #408bb6 74%)',
    'linear-gradient(#111425, #1e3b70)'
  ]
  let pos = Math.floor(Math.random() * 3)
  let linearGradient = linears[pos]
  let component = icons[pos]
</script>

<div class="absolute w-full h-full overflow-hidden" style={`background-image: ${linearGradient}`}>
  <section class="text-center mt-6 flex flex-col gap-4 mb-10">
    <h1 class="text-6xl">--</h1>
  </section>

  <section class="rounded-2xl p-4 mb-3 h-40 flex items-center justify-center">
    <svelte:component this={component} />
  </section>
</div>
