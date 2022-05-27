import { Redis } from '@upstash/redis'
import { getSecondsUntilEndDay } from '../../utils/dates'

const redis = new Redis({
  url: import.meta.env.VITE_UPSTASH_REDIS_REST_URL,
  token: import.meta.env.VITE_UPSTASH_REDIS_REST_TOKEN
})

export const get = async ({ url }) => {
  try {
    const { searchParams } = url
    const key = searchParams.get('key')
    // Look up on redis database
    const result = await redis.get(key)
    return {
      status: 200,
      body: {
        ok: true,
        result
      }
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      body: {
        ok: false
      }
    }
  }
}

export const post = async ({ request }) => {
  try {
    const data = await request.json()
    const { key, value } = data
    // Get seconds remaining until end of the day
    const seconds = getSecondsUntilEndDay()
    // Will expire at the end of today
    await redis.setex(key, seconds, JSON.stringify(value))

    return {
      status: 200,
      body: {
        ok: true
      }
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      body: { ok: false }
    }
  }
}
