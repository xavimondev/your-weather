# Cache storage 𝌏

I had implemented cache on redis using uptash to persist data **every day** and renew it on the next day. However, I realized some data from RapiAPI changes almost every hour, so I doesn't make sense( at the moment 👀 ) to renew information every hour because Uptash offers a free plan and that wouldn't be enough

Anyways, you can read and follow README.md of this repo to get Uptash API Keys