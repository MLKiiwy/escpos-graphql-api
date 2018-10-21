import { device, printer } from './printer';

const print = str => {
  device.open(() => {
    printer
      .font('a')
      .align('ct')
      .style('bu')
      .size(1, 1)
      .text(str)
      .cut()
      .close();
  });
};

export default print;
