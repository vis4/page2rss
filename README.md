# page2rss
simple node program that creates rss feeds for website that don't have them

**Instructions:**

1. Clone this repository
2. Run `yarn` or `npm install`
3. Copy `config.tpl.yaml` to `config.yaml` and edit it to configure the feeds
4. Run `node page2rss.js` in a cronjob as often as you want

Feeds will be stored in `out/` folder from where you can serve them on your website.

**Configuration:**

The config.yml supports the following

```yaml
feeds:
  bloomberg-tech:
    feed:
      url: https://www.bloomberg.com/topics/tech
      title: 'Bloomberg Tech'
      description: Tech news, business analysis, commentary, long-form features, polling, original video, interactive graphics, and more from the nation&#39;s leading business commentators.
    selectors:
      item: .index-page__item
      headline: .index-page__headline
      link: .index-page__headline a
      date: .label-and-timestamp
      #description: p.desc
      #author: div.author
      #picture: img
    date_format: MMMM DD, YYYY
```