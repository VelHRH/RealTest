// @ts-nocheck

import SerialPort from "serialport";
export const runTestingForDuration = (duration) => {
 return new Promise((resolve, reject) => {
  let res = [];
  const parsers = SerialPort.parsers;
  const parser = new parsers.Readline({
   delimiter: "\r\n",
  });
  const port = new SerialPort("COM3", {
   baudRate: 9600,
   dataBits: 8,
   parity: "none",
   stopBits: 1,
   flowControl: false,
  });
  port.pipe(parser);
  parser.on("data", function (data) {
   res.push(data);
  });
  setTimeout(() => {
   resolve(res);
  }, duration);
 });
};
