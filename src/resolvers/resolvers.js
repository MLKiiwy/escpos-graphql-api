import escpos from 'escpos';

// Select the adapter based on your printer type 
const device  = new escpos.USB();
// const device  = new escpos.Network('localhost'); 
// const device  = new escpos.Serial('/dev/usb/lp0'); 

const printer = new escpos.Printer(device);

const resolvers = () => ({
    Query: {
        get(id) {
            return 'plop';
        }
    },
    Mutation: {
        createMessage(root, args) {
            console.log(args);

            device.open(() => {
                printer
                    .font('a')
                    .align('ct')
                    .style('bu')
                    .size(1, 1)
                    .text('args.message');
            });
            return args;
        },
    },
});

export default resolvers;
