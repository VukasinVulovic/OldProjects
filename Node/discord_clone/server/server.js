const WebSocket = require('ws');
const https = require('https');
const fs = require('fs');
let express = require('express');  
let server;
let connected_users = [];

server = https.createServer({
  key: fs.readFileSync('key.key'),
  cert: fs.readFileSync('cert.crt')
});
server.listen(8080);
 
const ws = new WebSocket.Server({server});

ws.on('connection', connection => {
  connected_users.push(connection);
  connection.on('message', (message) => {
    for(let i = 0; i < connected_users.length; i++) {
      if(connected_users[i].readyState == WebSocket.OPEN) {
        if(connected_users[i] != connection) {
          connected_users[i].send(message);
        }
      } else {
        connected_users.slice(i, 1);
      }
    }
  });
});
