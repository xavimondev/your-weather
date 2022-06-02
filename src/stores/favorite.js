import { writable } from 'svelte/store'
import { browser } from '$app/env'

const INITIAL_STATE = 'your_city'

export const cityStore = writable(
  browser && localStorage.getItem('citySelected')
    ? localStorage.getItem('citySelected')
    : INITIAL_STATE
)

cityStore.subscribe((data) => {
  if (browser) return localStorage.setItem('citySelected', data)
})

export const updateCitySelected = (cityName) => {
  cityStore.update(() => {
    return cityName
  })
}

export const resetCitySelected = () => {
  cityStore.update(() => {
    return INITIAL_STATE
  })
}
