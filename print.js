const print = require('./src/escpos');

(async () => {
  await print('./ticket.png');
})();
