<script>
  import { resetCitySelected } from '../stores/favorite'

  const requestMyLocation = async () => {
    // The idea is request the user's location again,
    // however I can reset data on local storage and simulate the change as long as
    // geolocation is enabled
    resetCitySelected()
  }
</script>

<nav class="fixed bottom-0 z-50 flex w-full gap-6 p-2 bg-white/5 back-filter justify-between">
  <button
    class="ring-gray-900 p-2 bg-none rounded-lg flex text-xs flex-col items-center gap-1 transition hover:text-yellow-300 text-white"
    on:click={requestMyLocation}
  >
    <svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"
      ><g
        fill="none"
        fill-rule="evenodd"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        transform="translate(4 2)"
        ><path
          d="m6.5 16.5407715.6311176-.7118691c.71585099-.8191184 1.36011688-1.5983525 1.93279767-2.3377022l.4733382-.6239608c1.97516433-2.6615039 2.96274653-4.77276704 2.96274653-6.33378943 0-3.33218241-2.6862915-6.03344997-6-6.03344997s-6 2.70126756-6 6.03344997c0 1.56102239.98758218 3.67228553 2.96274653 6.33378943l.4733382.6239608c.73630387.9505925 1.5909423 1.9671163 2.56391527 3.0495713z"
        /><circle cx="6.5" cy="6.5" r="2.5" /></g
      ></svg
    >
  </button>
  <a
    class="ring-gray-900 p-2 rounded-lg flex text-xs flex-col items-center gap-1 transition hover:text-yellow-300 text-white"
    href="/search"
  >
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
  </a>
</nav>
