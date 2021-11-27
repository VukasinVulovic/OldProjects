const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({port:8080});
let clients_connected = {
  sockets: [],
  data: []
};
wss.on('connection', function connection(ws) {
  clients_connected.sockets = [];    
  wss.clients.forEach((client) => {
    clients_connected.sockets.push(client);
  });
  console.log(`client-${clients_connected.sockets.length} connected.`);  
  if(clients_connected.sockets.length == 2) {
    ws.on('message', (message) => {
      if(ws == clients_connected.sockets[1]) {
        console.log('client1 sent a message');
        clients_connected.sockets[0].send(JSON.stringify(message));
      } else {
        console.log('client2 sent a message');
        clients_connected.sockets[1].send(JSON.stringify(message));
      }
    });
  } else {
    if(!clients_connected.sockets[0]) {
      clients_connected.sockets[1].send('%FFF');
    }
    if(!clients_connected.sockets[1]) {
      clients_connected.sockets[0].send('%FFF');
    }
  }
});