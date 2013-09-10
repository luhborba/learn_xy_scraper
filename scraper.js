
// Require modules
var cheerio = require('cheerio'),
    request = require('request'),
    fs      = require('fs');

// Exceptions to scrape over download (locale issue)
var force_scrape = ['ruby','php'];

// Filetype extensions for scraped
var file_type    = {'ruby':'rb',
                    'php':'php',
                    'matlab':'m',
                    'haskell':'hs',
                    'brainfuck':'bf'};

// Make language directory
function mklangdir(lang_dir){
  fs.stat(lang_dir, function(err,stats){
    if (err){
      fs.mkdir(lang_dir,777,function(err){
        if (err) throw err;
      });
    }
  });
}


// Make request to LearnXinYMinutes
function start_scraping(url, lang_dir){
  request(url, function(err, resp, body){
    if (err) throw err;
    $ = cheerio.load(body);

    // Parse out language table
    var lang_table = $('.container').children('table').first();

    // Parse out languages
    var count = lang_table.find('tr').length;
    lang_table.find('tr').each(function(){
      var $lang = $(this).find('td').first();
      var lang = $lang.text().trim().toLowerCase();
      if (lang.length !== 0){
        // Visit each language link
        var lang_url = url + $lang.find('a').attr('href');
        request(lang_url, function(err, resp, body){
          if (err) throw err;
          $ = cheerio.load(body);

          // If link to file exists, download file
          var filename = '';
          if ($('.filelink').length && force_scrape.indexOf(lang) < 0) {
            console.log('Downloading '+lang+'...');
            filename = $('.filelink a').text();
            filename = 'learn_' + lang + filename.slice(filename.indexOf('.'));
            request(url+$('.filelink a').attr('href')).pipe(fs.createWriteStream(lang_dir+filename));
          }
          // Else write code block to file
          else {
            console.log('Scraping '+lang+'...');
            filename='learn_'+lang+(file_type[lang] ? '.'+file_type[lang] : '');
            fs.writeFile( lang_dir+filename,
                          $('pre.highlight').text(),
                          function(err) { if (err) throw err; }
                        );
          }

          // Finished Scraping (NOTE: Pseudo-finish due to async nature)
          count = count - 1;
          if (count == 1){
            console.log('\n=================================\n');
            console.log('       Download complete!        ');
            console.log('\n=================================\n');
          }
        });
      }
    });
  });
}

exports.init = mklangdir;
exports.start = start_scraping;
exports.force = force_scrape;
