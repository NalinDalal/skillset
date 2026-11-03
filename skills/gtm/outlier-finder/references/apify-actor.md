# Apify Actor: LinkedIn Profile Posts Scraper

Use only this Actor:

```text
harvestapi/linkedin-profile-posts
```

It accepts LinkedIn profile or company URLs in `targetUrls` and returns post data, including engagement information when it is available. The Actor can limit posts to a recent period with `postedLimit` and limit posts per account with `maxPosts`.

Use this input shape:

```json
{
  "targetUrls": [
    "https://www.linkedin.com/in/example/",
    "https://www.linkedin.com/company/example/"
  ],
  "postedLimit": "month",
  "maxPosts": 30,
  "includeQuotePosts": false,
  "includeReposts": false
}
```

Before running it:

1. Confirm the target URLs are public LinkedIn profile or company URLs.
2. Tell the member how many accounts and posts per account will be requested.
3. Ask for a clear yes because Apify may charge credits.

Do not add reaction or comment scraping. This skill does not need it.

The Actor's returned field names can change. Inspect the actual run results before calculating engagement. Never assume missing values are zero.

Source: [Apify Actor documentation](https://apify.com/harvestapi/linkedin-profile-posts)

