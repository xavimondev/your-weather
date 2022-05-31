import { browser } from '$app/env'
import { ENDPOINT_API } from '../constants'

export const updateCache = async (data) => {
  if (browser) {
    const OPTIONS_FETCH = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const resapi = await fetch(ENDPOINT_API, OPTIONS_FETCH)
    const { ok } = await resapi.json()
    return ok
  }
}

export const searchCache = async (key) => {
  if (browser) {
    const resapi = await fetch(`${ENDPOINT_API}?key=${key}`)
    const { result } = await resapi.json()
    return result
  }
}
