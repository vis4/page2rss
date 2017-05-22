var fs = require('fs'),
    d3 = require('d3-queue'),
    rss = require('rss'),
    yaml = require('js-yaml'),
    moment = require('moment'),
    request = require('request'),
    cheerio = require('cheerio');

var config = yaml.safeLoad(fs.readFileSync('./config.yaml', 'utf-8'));

var q = d3.queue(4);

for (var id in config.feeds) {
    q.defer(loadFeed, id, config.feeds[id]);
}

q.awaitAll(function(err, results) {
    console.log('all done', err, results);
});

function loadFeed(id, cfg, callback) {
    var feed = new rss({
        site_url: cfg.feed.url,
        title: cfg.feed.title,
        description: cfg.feed.description || '',
        ttl: '30',
    });

    request.get(cfg.feed.url, function(err, res, body) {
        
        if (err) return callback(err);

        var $ = cheerio.load(body),
            sel = cfg.selectors;

        $(sel.item).each(function(i, el) {
            var headline = $(sel.headline, el).text().trim(),
                url = $(sel.link, el).attr('href'),
                desc = sel.description ? $(sel.description, el).text() : false,
                pic = sel.picture ? $(sel.picture, el).attr('src') : false,
                date = sel.date ? parseDate($(sel.date, el).text(), cfg.date_format) : false,
                author = sel.author ? $(sel.author, el).text() : false;

            var item = {
                title: headline,
                description: desc,
                url: url
            };

            if (author) item.author = author;
            if (date) item.date = date;
            if (pic) item.enclosure = { url: pic };

            feed.item(item);
        });
        console.log(id);
        fs.writeFileSync('out/'+id+'.xml', feed.xml({ indent: true }));
        callback(null, id);
    });
}

function parseDate(s, format) {
    return moment(s, format || 'YYYY-MM-DD').toDate();
}