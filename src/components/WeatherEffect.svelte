<script>
  import { convert12to24 } from '../utils/weather'
  import NightCloudy from './Effects/NightCloudy.svelte'
  import NightRainy from './Effects/NightRainy.svelte'
  import NightClear from './Effects/NightClear.svelte'
  import SunsetCloudy from './Effects/SunsetCloudy.svelte'
  import MorningCloudy from './Effects/MorningCloudy.svelte'

  export let info
  export let astronomy

  let componentSelected
  let hourSunset = convert12to24(astronomy.sunset)
  let currentHour = parseInt(info.weirdHour)
  let isSunset = hourSunset === currentHour

  if (isSunset) {
    console.log('Render sunset')
    componentSelected = SunsetCloudy
  } else {
    const { isDay, condition } = info
    let weatherConditions = [
      { is_day: 0, conditions: ['cloudy', 'fog', 'overcast'], component: NightCloudy },
      { is_day: 0, conditions: ['rain', 'drizzle'], component: NightRainy },
      { is_day: 0, conditions: ['clear', 'light'], component: NightClear },
      { is_day: 1, conditions: ['cloudy', 'fog'], component: MorningCloudy }
      // Missing [snow, heavysleet], light
      // { is_day: 0, conditions: ['thundery', 'thunder'], component: MorningCloudy },
    ]
    componentSelected = weatherConditions.find(
      ({ is_day, conditions }) => is_day === isDay && conditions.includes(condition.toLowerCase())
    ).component
  }
</script>

<!-- Render weather component dinamically -->
<svelte:component this={componentSelected} />
