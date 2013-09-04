/*
=====================================
  LEARN X IN Y MINUTES WEB SCRAPER
=====================================
*/

// Require modules
var cheerio = require('cheerio'),
    request = require('request'),
    fs      = require('fs');

// Top level variables
var url = "http://learnxinyminutes.com";
var languages_dir = "languages/";

// Make language directory
fs.stat(languages_dir, function(err,stats){
  if (err){
    fs.mkdir(languages_dir,0777,function(err){
      if (err) throw err
    });
  }
});

// Make request to LearnXinYMinutes
request(url, function(err, resp, body){
  if (err) throw err;
  $ = cheerio.load(body);

  // Parse out language table
  var language = $('.container').children('table').first();

  // Parse out languages
  language.find('tr').each(function(){
    var lang = $(this).find('td').first();
    var lang_text = lang.text().trim();
    if (lang.text() != 0){
      // Visit each language link
      var lang_url = url + lang.find('a').attr('href');
      request(lang_url, function(err, resp, body){
        if (err) throw err;
        $ = cheerio.load(body);
        // If link to file exists, download file
        if ($('.filelink').length) {
          request(url+$('.filelink a').attr('href'))
            .pipe(fs.createWriteStream(
                  languages_dir+$('.filelink a').text().toLowerCase())
            );
        }
        // Else write code block to file
        else {
          fs.writeFile( languages_dir+lang_text.toLowerCase(),
                        $('pre.highlight'),
                        function(err) { if (err) throw err; }
                      );
        }
      });
    }
  });
});
