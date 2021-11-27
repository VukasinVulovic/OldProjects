const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const app = express();
const httpServer = http.createServer(app);
const wsServer = new WebSocket.Server({ server: httpServer });
let connectedClients = [];
let streamer;

wsServer.on('connection', (ws, req) => {
    connectedClients.push(ws);
    ws.on('message', data => {
        if(data == '#viewer') {
            connectedClients.push(ws);
        } else if(data == '#streamer') {
            streamer = ws;
        } else {
            connectedClients.forEach((client, i) => {
                if (client.readyState === client.OPEN) {
                    client.send(data);
                } else {
                    connectedClients.splice(i, 1);
                }
            });
        }
    });
});
httpServer.listen(8080);