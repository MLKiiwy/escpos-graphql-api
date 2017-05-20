'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _escpos = require('escpos');

var _escpos2 = _interopRequireDefault(_escpos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Select the adapter based on your printer type 
var device = new _escpos2.default.USB();
// const device  = new escpos.Network('localhost'); 
// const device  = new escpos.Serial('/dev/usb/lp0'); 

var printer = new _escpos2.default.Printer(device);

var resolvers = function resolvers() {
    return {
        Query: {
            get: function get(id) {
                return 'plop';
            }
        },
        Mutation: {
            createMessage: function createMessage(root, args) {
                console.log(args);

                device.open(function () {
                    printer.font('a').align('ct').style('bu').size(1, 1).text('args.message');
                });
                return args;
            }
        }
    };
};

exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map