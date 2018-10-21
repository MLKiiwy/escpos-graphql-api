import escpos from 'escpos';

export const device = new escpos.USB();
export const printer = new escpos.Printer(device);
