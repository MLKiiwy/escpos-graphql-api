const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:8888');
  page.setViewport({
    width: 384, // Max width of a ticket print on a thermal printer (see spec of ZJ-58)
    height: 100,
  });
  await page.screenshot({ fullPage: true, path: 'ticket.png' });

  await browser.close();
})();
