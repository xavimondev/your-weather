<script>
  import { onMount } from 'svelte'
  let container
  onMount(() => {
    let count = 500
    let i = 0
    while (i < count) {
      let star = document.createElement('i')
      let x = Math.floor(Math.random() * window.innerWidth)
      let y = Math.floor(Math.random() * window.innerHeight)
      let duration = Math.random() * 10
      let size = Math.random() * 2

      star.style.left = `${x}px`
      star.style.top = `${y}px`
      star.style.width = `${1 + size}px`
      star.style.height = `${1 + size}px`

      star.style.animationDuration = `${5 + duration}s`
      star.style.animationDelay = `${duration}s`

      console.log('Generating starts')
      container.appendChild(star)
      i++
    }
  })
</script>

<div class="night-clear">
  <div class="starts" bind:this={container} />
</div>

<style>
  div.night-clear {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(#111425, #1e3b70);
    background-attachment: fixed;
    overflow: hidden;
    color: white;
    z-index: 0;
  }

  :global(.starts i) {
    position: absolute;
    background: #fff;
    border-radius: 50%;
    animation: star linear infinite;
  }

  @keyframes star {
    0% {
      opacity: 0;
      transform: translateY(0);
    }
    10%,
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(-100px);
    }
  }
</style>
