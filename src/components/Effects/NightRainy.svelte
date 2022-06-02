<script>
  import { onMount } from 'svelte'
  let frontRow
  let backRow
  const startRain = () => {
    let increment = 0

    while (increment < 500) {
      //couple random numbers to use for various randomizations
      //random number between 98 and 1
      let randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1)
      //random number between 5 and 2
      let randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2)
      //increment
      increment += randoFiver
      //add in a new raindrop with various randomizations to certain CSS properties
      let drop = document.createElement('div')
      drop.classList.add('drop')
      drop.style.left = `${increment}%`
      drop.style.bottom = `${randoFiver + randoFiver - 1 + 100}%`
      drop.style.animationDelay = `0.${randoHundo}s`
      drop.style.animationDuration = `0.5${randoHundo}s`

      let stem = document.createElement('div')
      stem.classList.add('stem')
      stem.style.animationDelay = `0.${randoHundo}s`
      stem.style.animationDuration = `0.5${randoHundo}s`
      drop.appendChild(stem)

      let backDrops = document.createElement('div')
      backDrops.classList.add('drop')
      backDrops.style.right = `${increment}%`
      backDrops.style.bottom = `${randoFiver + randoFiver - 1 + 100}%`
      backDrops.style.animationDelay = `0.${randoHundo}s`
      backDrops.style.animationDuration = `0.5${randoHundo}s`

      let stem1 = document.createElement('div')
      stem1.classList.add('stem')
      stem1.style.animationDelay = `0.${randoHundo}s`
      stem1.style.animationDuration = `0.5${randoHundo}s`

      backDrops.appendChild(stem1)

      frontRow.appendChild(drop)
      backRow.appendChild(backDrops)
    }
  }
  onMount(() => {
    startRain()
  })
</script>

<div class="rainy">
  <div class="rain front-row" bind:this={frontRow} />
  <div class="rain back-row" bind:this={backRow} />
</div>

<style>
  div.rainy {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #484848, #181822);
    overflow: hidden;
    color: white;
    z-index: 0;
  }

  :global(.back-row-toggle .rain.back-row) {
    display: block;
  }

  :global(.rain) {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  :global(.rain.back-row) {
    display: none;
    z-index: 0;
    bottom: 90px;
    opacity: 0.5;
  }

  :global(.drop) {
    position: absolute;
    bottom: 100%;
    width: 15px;
    height: 190px;
    pointer-events: none;
    animation: drop 0.6s linear infinite;
  }

  @keyframes drop {
    0% {
      transform: translateY(0vh);
    }
    75% {
      transform: translateY(90vh);
    }
    100% {
      transform: translateY(90vh);
    }
  }

  :global(.stem) {
    width: 1px;
    height: 60%;
    margin-left: 7px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.28));
    animation: stem 0.5s linear infinite;
  }

  @keyframes stem {
    0% {
      opacity: 1;
    }
    65% {
      opacity: 1;
    }
    75% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
</style>
