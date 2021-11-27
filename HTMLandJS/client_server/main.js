devMode();

addButton(false, 'send', 'default', () => {
  server(WRITE, 'Hello, Server!', () => {
    print('---message sent to server---');
  });
});

function setup() {
}

function loop() {
}

server(READ, (data) => {
  print('---message received from server---');
  addText('message', data, 40, '#ffffff', 0, 0, 'center');
});

function server(mode=WRITE, data_or_function='noData', fun=noFunction, adress='ws://192.168.1.2:8080/') {
  if(!window.serialSocket0) {
    window.serialSocket0 = new WebSocket(adress);
  }
  if(mode() == 'write') {
    if(typeof data_or_function == 'object') {
      window.serialSocket0.send(JSON.stringify(data_or_function));
    } else {
      window.serialSocket0.send(data_or_function.toString());
    }
  } else if(mode() == 'read') {
    window.serialSocket0.onmessage = function(e) {
      if(data_or_function != 'noData') {
        data_or_function(e.data);
      }
    } 
  }
}
