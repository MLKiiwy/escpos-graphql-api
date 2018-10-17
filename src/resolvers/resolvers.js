import escpos from 'escpos';
import Printer from 'escpos-print/Printer';
import Image from 'escpos-print/Image';
import {
  Barcode,
  CodeTable,
  Font,
  Justification,
  Position,
  QRErrorCorrectLevel,
  RasterMode,
  TextMode,
} from 'escpos-print/Commands';
import { Usb } from 'escpos-print/Adapters';

// Select the adapter based on your printer type
// const device  = new escpos.Network('localhost');
// const device  = new escpos.Serial('/dev/usb/lp0');

const resolvers = () => ({
  Query: {
    get() {
      return 'plop';
    },
  },
  Mutation: {
    createMessage(root, { message }) {
      const device = new escpos.USB();
      const printer = new escpos.Printer(device);

      // eslint-disable-next-line no-console
      console.log(message);

      device.open(() => {
        printer
          .font('a')
          .align('ct')
          .style('bu')
          .size(1, 1)
          .text(message)
          .cut();
      });
      return { message };
    },
    async createMessage2(root, { message }) {
      const usbAdapter = new Usb();
      const printer = await new Printer(usbAdapter).open();

      const image = await Image.load('http://i.imgur.com/uJUPbC3.png');
      const values = [
        {
          text: 'Hello',
          text2: 'World',
        },
        {
          text: 'Foo',
          text2: 'Bar',
        },
      ];

      await printer
        .setFont(Font.A)
        .setJustification(Justification.Center)
        .setTextMode(TextMode.DualWidthAndHeight)
        .writeLine(message)
        .setTextMode(TextMode.Normal)
        .setJustification(Justification.Left)
        .writeLine(message)
        .setCodeTable(CodeTable.PC865)
        .setJustification(Justification.Center)
        .raster(image, RasterMode.Normal)
        .setJustification(Justification.Right)
        .writeLine(message)
        .raster(image, RasterMode.DualWidthAndHeight)
        .barcode('1234567890123', Barcode.EAN13, 50, 2, Font.A, Position.Below)
        .qr('http://www.plop.com', QRErrorCorrectLevel.M, 8)
        .writeList(values.map(v => `${v.text} ... ${v.text2}`)) // Prints one entry per line
        .feed(4)
        .close();

      return { message };
    },
  },
});

export default resolvers;
