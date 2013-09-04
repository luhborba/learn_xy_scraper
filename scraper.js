var cheerio = require('cheerio'),
    request = require('request'),
    fs      = require('fs');

var url = "http://learnxinyminutes.com";
var languages_dir = "languages";


fs.stat(languages_dir, function(err,stats){
  if (err){
    fs.mkdir(languages_dir,0777,function(err){
      if (err) throw err
    });
  }
});

// var once = 0;

// request(url, function(err, resp, body){
//     if (err) throw err;
//     $ = cheerio.load(body);
//     var language = $('.container').children('table').first();

//     language.find('tr').each(function(){
//       var lang = $(this).find('td').first();
//       var lang_text = lang.text().trim();
//       if (lang.text() != 0){
//         var lang_url = url + lang.find('a').attr('href');

//         if (once < 3){ // DEBUG
//           request(lang_url, function(err, resp, body){
//             if (err) throw err;
//             $ = cheerio.load(body);
//             // if ($('.filelink').length) {
//             //   request(url+$('.filelink a').attr('href')).pipe(fs.createWriteStream('languages/'+$('.filelink a').text()));
//             // } else {
//             //   fs.writeFile('languages/'+lang_text, $('pre.highlight'),function(err) {
//             //     if (err) throw err;
//             //   });
//             // }
//           });
//           once = ++once;
//         }
//       }
//     });
// });
