<script>
  import { getWeatherFrom, searchCity } from '../../services/weather'
  import Form from './Form.svelte'
  import Results from './Results.svelte'

  // Props
  export let weather
  export let astronomyData
  export let forecastData
  export let isVisible

  // Get reference to a DOM node, in this case I will use to focus input
  let city = ''
  // List of cities
  let filteredCities = []

  // Keyboard events
  let hiLiteIndex = null

  $: if (!city) {
    filteredCities = []
  }

  const handleChange = async () => {
    if (city.length > 2) {
      const response = await searchCity(city)
      filteredCities = response
    }
  }

  const getDataWeatherSelected = async (cityName) => {
    const results = await getWeatherFrom(cityName)
    const { info, astronomy, forecast } = results
    weather = info
    astronomyData = astronomy
    forecastData = forecast
  }

  const setInputValue = (citySelected) => {
    const { name, region, country } = citySelected
    city = `${name}, ${region}, ${country}`
    filteredCities = []
    hiLiteIndex = null
    isVisible = true
    getDataWeatherSelected(name)
  }
</script>

<!-- Search box -->
<section class="mb-8 w-full z-30">
  <Form bind:city {handleChange} />
  <Results {filteredCities} {setInputValue} {hiLiteIndex} />
</section>
