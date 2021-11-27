const Readline = require('@serialport/parser-readline');
const SerialPort = require('serialport');
const WebSocket = require('ws');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json', 'UTF-8'));

const port = new SerialPort(config.serial_port, { 
    baudRate: config.rate 
});
const parser = port.pipe(new Readline());
let clients = [];

const server = new WebSocket.Server({
    port: config.port
});

server.on('connection', (client) => {
    client.on('message', (msg) => port.write(msg));
    clients.push(client);
});

parser.on('data', d => {
    const data = d.replace(/\n|\r/g, ''); 
    if(data === '#ready')serialStarted();
    else if(data.length > 0) gotData(data);
});

function gotData(data) {
    clients.forEach(client => {
        if(client.readyState === 3) {
            clients.filter((e) => { 
                return e != client; 
            });
        } else client.send(data);
    });
}

function serialStarted() {
    clients.forEach(client => {
        if(client.readyState === 3) {
            clients.filter((e) => { 
                return e != client; 
            });
        } else {
            client.send("#ready");
            console.log('Device ready.');
        }
    });
}

console.log(config);