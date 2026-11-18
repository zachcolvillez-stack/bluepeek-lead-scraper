# bluepeek-lead-scraper

Scheduled jobs that add Australian small businesses to BluePeek's lead pipeline.

- **Daily lead scrape** (06:00 AEST): [gosom/google-maps-scraper](https://github.com/gosom/google-maps-scraper) in fast mode over a rotating grid of areas and trades; results go to the pipeline through token-protected database functions.
- **Write personal texts** (every 2 h, 08:30–18:30 AEST): drafts the opening SMS for newly prepared leads. Nothing is sent from here.

`dist/` holds generated bundles; the source lives in a private repository. The only credential is the `SCRAPER_TOKEN` Actions secret.
