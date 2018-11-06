import puppeteer from 'puppeteer';
import { resolve } from 'path';

export default async messageId => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:3000/#/${messageId}`);
  page.setViewport({
    width: 384, // Max width of a ticket print on a thermal printer (see spec of ZJ-58)
    height: 100,
  });
  const imagePath = resolve(__dirname + '/../../ticket.png');
  await page.screenshot({
    fullPage: true,
    path: imagePath,
  });

  await browser.close();

  return imagePath;
};
