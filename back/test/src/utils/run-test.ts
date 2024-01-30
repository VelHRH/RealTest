// @ts-nocheck

import SerialPort from 'serialport';
import { Approach } from 'types';
export const runTestingForDuration = (duration: number): Promise<Approach[]> => {
  return new Promise((resolve, reject) => {
    let res: Approach[] = [];
    const parsers = SerialPort.parsers;
    const parser = new parsers.Readline({
      delimiter: '\r\n',
    });
    const port = new SerialPort('COM3', {
      baudRate: 9600,
      dataBits: 8,
      parity: 'none',
      stopBits: 1,
      flowControl: false,
    });
    port.pipe(parser);
    parser.on('data', function (data) {
      const numbers = data.match(/\d+/g);
      console.log(data, numbers);
      res.push({ distance: numbers[0], time: numbers[1] });
    });
    setTimeout(() => {
      port.close();
      resolve(res);
    }, duration);
  });
};
