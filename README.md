# Learn X in Y Web Scraper

Node.js script to scrape the pages from [Learn X in Y
Minutes](http://learnxinyminutes.com). Either downloads the files if it exists
or scrapes the relevant content from the page.


## Usage

Clone the repository to your machine:

```bash
git clone https://github.com/geekjuice/learn_xy_scraper.git
```


Install the modules:

```bash
cd learn_xy_scraper
npm install
```

Finally, run scraper:

```bash
node learn_scraping_xy.js
```

By default, all of the files will download to __learn_xy_scraper/languages__.


## Notes

Ruby and PHP files link to Portuguese(?) and Korean versions respectively. So
edge cases can be added to prefer scraping page content over downloading the
file.

For content scraped pages, you can add an optional file extension as the scraped
content will default to saving to a file named after the language without
extensions.


