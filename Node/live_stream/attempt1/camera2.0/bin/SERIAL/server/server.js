const http = require('http');
const WebSocketServer = require('websocket').server;
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const port = new SerialPort('COM1');
const parser = new Readline();

const server = http.createServer();
server.listen(8080);

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);
    connection.on('message', function(message) {
      console.log(`Transmitting: ${message.utf8Data}`);
      port.write(message.utf8Data);
    });
    port.pipe(parser); 
    parser.on('data', function (data) {
        console.log(`Receiving: ${data}`); 
        connection.sendUTF(data);
    });
});
