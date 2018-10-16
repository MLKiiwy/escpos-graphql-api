import escpos from 'escpos';

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
    createMessage(root, args) {
      const device = new escpos.USB();
      const printer = new escpos.Printer(device);

      // eslint-disable-next-line no-console
      console.log(args);

      device.open(() => {
        printer
          .font('a')
          .align('ct')
          .style('bu')
          .size(1, 1)
          .text('args.message')
          .cut();
      });
      return args;
    },
  },
});

export default resolvers;
