# page2rss
simple node program that creates rss feeds for website that don't have them

**Instructions:**

1. Clone this repository
2. Run `yarn` or `npm install`
3. Copy `config.tpl.yaml` to `config.yaml` and edit it to configure the feeds
4. Run `node page2rss.js` in a cronjob as often as you want

Feeds will be stored in `out/` folder from where you can serve them on your website.
