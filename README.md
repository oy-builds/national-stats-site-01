[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/oy-builds/national-stats-site-01/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/oy-builds/national-stats-site-01/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
# national-stats-site-01

**Indonesia in Numbers** — a static national statistics site for Indonesia. Headline
indicators, GDP growth and inflation charts, population and age structure, foreign
trade, and a sortable province table. Every figure is a published BPS — Statistics
Indonesia series (2024–2025) labelled with its period and source. No libraries, no
network requests: hand-rolled SVG charts, vanilla JS split by job (`data.js`,
`charts.js`, `app.js`), one stylesheet.

Run it locally:

```
node serve.ts            # serves app/ at http://localhost:8080
```

Hand it in (writes `app/`, `screenshots/` and `dossier.json` to the output dir):

```
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```
