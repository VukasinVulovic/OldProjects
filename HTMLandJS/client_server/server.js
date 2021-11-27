const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({port:8080});

wss.on('connection', function connection(ws) {
  console.log(`client connected.`);  
  ws.on('message', (message) => {
    console.log(`client sent a message`);
    ws.send(`client sent: ${JSON.stringify(message)}`);
  });
});