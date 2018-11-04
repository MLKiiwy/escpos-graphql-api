import { device, printer } from './printer';
import { Image } from 'escpos';
import path from 'path';

const getImage = async path => {
  return new Promise((resolves, reject) => {
    Image.load(path, image => {
      if (image.toBitmap) {
        resolves(image);
      } else {
        reject(image);
      }
    });
  });
};

const printImage = async (printer, filepath) => {
  const image = await getImage(path.resolve(filepath));
  printer.image(image);
};

const print = async path => {
  return new Promise((resolves, reject) => {
    device.open(async () => {
      try {
        printer.style('NORMAL');
        printImage(printer, path);
        printer.close();
        resolves(true);
      } catch (err) {
        printer.close();
        reject(false);
      }
    });
  });
};

export default print;
