# your–weather ⚡️

**your–weather** web application to know the weather.
I've build this app to participate in hackaton organized by 👨‍💻 [midudev](https://twitch.tv/midudev) 

# Stack ❤️

- **Development**: [SvelteKit](https://kit.svelte.dev/)
- **Styles**: [Tailwind CSS](https://chakra-ui.com/guides/first-steps)
- **Uptash - Redis**: [Uptash](https://upstash.com/)
- **Deployment**: [Vercel](https://vercel.com)

# RapidAPI - Project API Keys

1. Sign Up on RapiAPI
2. Subscribe on [WeatherAPI](https://rapidapi.com/weatherapi/api/weatherapi-com/)
3. Then, go to [Dashboard](https://rapidapi.com/developer/dashboard)
4. Finally, in the sidebar there will be security option and there you can copy your *Application key*

# Final Steps ✅

1. Clone this repo to a directory and then run `npm install`
2. Set-up your environment variables following the `.env.example` file.
  - You can get the `VITE_RAPID_KEY` following **RapidAPI - Project API Keys**
3. Set-up your environment variable following the `.env.example` file. 
  - You can follow this [guide of Uptash](https://docs.upstash.com/redis/account/developerapi) to set `VITE_UPSTASH_REDIS_REST_URL`, `VITE_UPSTASH_REDIS_REST_TOKEN`
4. Run `npm run dev` to start developing mode.
