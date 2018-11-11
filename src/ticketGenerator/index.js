import puppeteer from 'puppeteer';
import { resolve } from 'path';
import config from 'config';

export default async messageId => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:${config.get('api.port')}/#/${messageId}`);
  page.setViewport({
    width: config.get('printer.viewport.width'),
    height: 10, // Don't care here its infinite
  });
  const imagePath = resolve(
    `${config.get('database.generatedTicketPath')}/${messageId}.png`
  );
  await page.screenshot({
    fullPage: true,
    path: imagePath,
  });

  await browser.close();

  return imagePath;
};
