const http = require('http');
const WebSocketServer = require('websocket').server;
const server = http.createServer();
server.listen(3000);

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);
    connection.on('message', function(message) {
      console.log(message.utf8Data);
      console.log('----------------------------------------');
    });
});
