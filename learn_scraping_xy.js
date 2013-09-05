/*
=====================================
  LEARN X IN Y MINUTES WEB SCRAPER
=====================================
*/

var scrape = require('./scraper');

// Top level variables
var url = "http://learnxinyminutes.com";
var lang_dir = "languages/";

// Start Scraping
scrape.init(lang_dir);
scrape.start(url,lang_dir);

console.log('\n=================================\n');
console.log(' Learn X in Y Minute Web Scraper ');
console.log('\n=================================\n');
console.log("Files downloaded to '"+lang_dir+"'\n");

