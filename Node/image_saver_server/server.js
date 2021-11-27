const WebSocket = require('ws');
const fs = require('fs');
const static = require('node-static');
const https = require('https');
let file = new(static.Server)();
const ws = new WebSocket.Server({port: 69});

https.createServer({
  key: fs.readFileSync('security/key.key'),
  cert: fs.readFileSync('security/cert.crt')
}, (req, res) => {
  file.serve(req, res);
}).listen(8080);

ws.on('connection', connection => {
  connection.on('message', (message) => {
    if(message != '%get_images') {
      let label = `${JSON.parse(message).label}_${random()}.png`;
      fs.writeFile(`./local_data/images/${label}`, JSON.parse(message).image.replace(/^data:image\/png;base64,/, ''), {encoding: 'base64'}, () => {return;});
      fs.readFile('./local_data/users.json', 'utf8', (err, d) => {
        let data = JSON.parse(d);
        data.push({
          "name": JSON.parse(message).name,
          "label": label,
          "ip": "none"
        }); 
        fs.writeFile('./local_data/users.json', JSON.stringify(data), () => {return;});
      });
    } else {
      fs.readFile('./local_data/users.json', 'utf8', (err, d) => {
        connection.send(d);
      });
    }
  });
});

function random() {
  let str = '';
  for(let i = 0; i < 3; i++) {
    str += Math.floor(Math.random()*100).toString();
  }
  return str;
}