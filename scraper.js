var cheerio = require('cheerio'),
    request = require('request'),
    fs      = require('fs');

var url = "http://learnxinyminutes.com";

request(url, function(err, resp, body){
    if (err) throw err;
    $ = cheerio.load(body);
    var language = $('.container').children('table').first();
    console.log(language.find('.name').text().trim());
});
