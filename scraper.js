var cheerio = require('cheerio'),
    request = require('request'),
    fs      = require('fs');

var url = "http://learnxinyminutes.com";

var once = 0;

request(url, function(err, resp, body){
    if (err) throw err;
    $ = cheerio.load(body);
    var language = $('.container').children('table').first();

    language.find('tr').each(function(){
      var lang = $(this).find('td').first();
      var lang_text = lang.text().trim();
      if (lang.text() != 0){
        var lang_url = url + lang.find('a').attr('href');

        if (once < 3){ // DEBUG
          request(lang_url, function(err, resp, body){
            if (err) throw err;
            $ = cheerio.load(body);
            if ($('.filelink').length) {
              console.log("Link found for "+lang_text);
              // console.log($('.filelink a').attr('href') + ":" + $('.filelink a').text());
              request($('.filelink').attr('href')).pipe(fs.createWriteStream($('.filelink a').text()));
            } else {
              console.log("Link not found for "+lang_text);
              // fs.writeFile('languages/'+lang_text, lang_text,function(err) {
              //   if (err) throw err;
              // });
            }
          });
          once = ++once;
        }
      }
    });
});
