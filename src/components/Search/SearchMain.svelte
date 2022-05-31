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
  let searchInput
  let city = ''
  // List of cities
  let filteredCities = []

  // Keyboard events
  let hiLiteIndex = null

  $: if (!city) {
    filteredCities = []
  }

  // When user close the modal, it's time to reset input and all weather data
  $: if (!isVisible) {
    if (searchInput) {
      console.log('Closing modal and resetting input')
      searchInput.value = ''
      searchInput.focus()

      weather = null
      astronomyData = null
      forecastData = null
    }
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
<section class="relative z-10">
  <div class="absolute w-full">
    <Form bind:searchInput bind:city {handleChange} />
    <Results {filteredCities} {setInputValue} {hiLiteIndex} />
  </div>
</section>
