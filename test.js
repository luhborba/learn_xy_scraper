var should = require('should'),
    scraper = require('./scraper');

describe('Scraper', function(){
  it('should have ruby as a forced scrape',function(){
    scraper.force.indexOf('ruby').should.not.equal(-1);
  })
  it('should have php as a forced scrape',function(){
    scraper.force.indexOf('php').should.not.equal(-1);
  })
})

