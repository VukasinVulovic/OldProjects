const static = require('node-static');
const https = require('https');
const http = require('http');
const fs = require('fs');
let file = new(static.Server)();

https.createServer({
    cert: fs.readFileSync('security-noN6mipbj1lZBHdD5EmM/certificate.crt'),
    key: fs.readFileSync('security-noN6mipbj1lZBHdD5EmM/private.key')
}, (req, res) => {
    file.serve(req, res);
}).listen(80);

http.createServer((req, res) => {
    file.serve(req, res);
}).listen(8080);

console.log('------------------------------------------------main server started-------------------------------------------------');