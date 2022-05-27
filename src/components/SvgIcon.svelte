<script>
  //inspired by https://svelte.dev/repl/f649d828badf468cacad8bdc8b4088a3?version=3.29.0
  export let d = ''
</script>

<svg
  class="absolute text-white left-0 ml-4"
  xmlns="http://www.w3.org/2000/svg"
  width="50"
  height="50"
  viewBox="0 0 50 50"
  fill="none"
>
  <path {d} stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>
