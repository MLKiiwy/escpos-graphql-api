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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNvbHZlcnMvcmVzb2x2ZXJzLmpzIl0sIm5hbWVzIjpbImRldmljZSIsIlVTQiIsInByaW50ZXIiLCJQcmludGVyIiwicmVzb2x2ZXJzIiwiUXVlcnkiLCJnZXQiLCJpZCIsIk11dGF0aW9uIiwiY3JlYXRlTWVzc2FnZSIsInJvb3QiLCJhcmdzIiwiY29uc29sZSIsImxvZyIsIm9wZW4iLCJmb250IiwiYWxpZ24iLCJzdHlsZSIsInNpemUiLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7O0FBRUE7QUFDQSxJQUFNQSxTQUFVLElBQUksaUJBQU9DLEdBQVgsRUFBaEI7QUFDQTtBQUNBOztBQUVBLElBQU1DLFVBQVUsSUFBSSxpQkFBT0MsT0FBWCxDQUFtQkgsTUFBbkIsQ0FBaEI7O0FBRUEsSUFBTUksWUFBWSxTQUFaQSxTQUFZO0FBQUEsV0FBTztBQUNyQkMsZUFBTztBQUNIQyxlQURHLGVBQ0NDLEVBREQsRUFDSztBQUNKLHVCQUFPLE1BQVA7QUFDSDtBQUhFLFNBRGM7QUFNckJDLGtCQUFVO0FBQ05DLHlCQURNLHlCQUNRQyxJQURSLEVBQ2NDLElBRGQsRUFDb0I7QUFDdEJDLHdCQUFRQyxHQUFSLENBQVlGLElBQVo7O0FBRUFYLHVCQUFPYyxJQUFQLENBQVksWUFBTTtBQUNkWiw0QkFDS2EsSUFETCxDQUNVLEdBRFYsRUFFS0MsS0FGTCxDQUVXLElBRlgsRUFHS0MsS0FITCxDQUdXLElBSFgsRUFJS0MsSUFKTCxDQUlVLENBSlYsRUFJYSxDQUpiLEVBS0tDLElBTEwsQ0FLVSxjQUxWO0FBTUgsaUJBUEQ7QUFRQSx1QkFBT1IsSUFBUDtBQUNIO0FBYks7QUFOVyxLQUFQO0FBQUEsQ0FBbEI7O2tCQXVCZVAsUyIsImZpbGUiOiJyZXNvbHZlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXNjcG9zIGZyb20gJ2VzY3Bvcyc7XG5cbi8vIFNlbGVjdCB0aGUgYWRhcHRlciBiYXNlZCBvbiB5b3VyIHByaW50ZXIgdHlwZSBcbmNvbnN0IGRldmljZSAgPSBuZXcgZXNjcG9zLlVTQigpO1xuLy8gY29uc3QgZGV2aWNlICA9IG5ldyBlc2Nwb3MuTmV0d29yaygnbG9jYWxob3N0Jyk7IFxuLy8gY29uc3QgZGV2aWNlICA9IG5ldyBlc2Nwb3MuU2VyaWFsKCcvZGV2L3VzYi9scDAnKTsgXG5cbmNvbnN0IHByaW50ZXIgPSBuZXcgZXNjcG9zLlByaW50ZXIoZGV2aWNlKTtcblxuY29uc3QgcmVzb2x2ZXJzID0gKCkgPT4gKHtcbiAgICBRdWVyeToge1xuICAgICAgICBnZXQoaWQpIHtcbiAgICAgICAgICAgIHJldHVybiAncGxvcCc7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIE11dGF0aW9uOiB7XG4gICAgICAgIGNyZWF0ZU1lc3NhZ2Uocm9vdCwgYXJncykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYXJncyk7XG5cbiAgICAgICAgICAgIGRldmljZS5vcGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBwcmludGVyXG4gICAgICAgICAgICAgICAgICAgIC5mb250KCdhJylcbiAgICAgICAgICAgICAgICAgICAgLmFsaWduKCdjdCcpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnYnUnKVxuICAgICAgICAgICAgICAgICAgICAuc2l6ZSgxLCAxKVxuICAgICAgICAgICAgICAgICAgICAudGV4dCgnYXJncy5tZXNzYWdlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBhcmdzO1xuICAgICAgICB9LFxuICAgIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcmVzb2x2ZXJzO1xuIl19