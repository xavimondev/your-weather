// Sources I followed: https://svelte.dev/repl/354bfb3b58be4e1994901059ee787c2b?version=3.48.0
import { writable } from 'svelte/store'
import { browser } from '$app/env'

export const weatherStore = writable(
  browser && localStorage.getItem('weatherData')
    ? JSON.parse(localStorage.getItem('weatherData'))
    : []
)
weatherStore.subscribe((data) => {
  if (browser) return localStorage.setItem('weatherData', JSON.stringify(data))
})

export const addFavorite = (newFavorite) => {
  weatherStore.update((data) => {
    return [...data, newFavorite]
  })
}

export const removeFavorite = (favoriteId) => {
  weatherStore.update((data) => {
    return data.filter((item) => item.id !== favoriteId)
  })
}
