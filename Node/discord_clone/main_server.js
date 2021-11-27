const static = require('node-static');
const https = require('https');
const fs = require('fs');
let file = new(static.Server)();

server = https.createServer({
    key: fs.readFileSync('security/key.key'),
    cert: fs.readFileSync('security/cert.crt')
}, (req, res) => {
    file.serve(req, res);
}).listen(5500);
console.log('------------------------------------------------main server started-------------------------------------------------');