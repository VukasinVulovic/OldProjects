const http = require('http');
const express = require('express');
const app = express();

const server = http.createServer(app);

app.use('/', (req, res, next) => {
    const subdomain = req.hostname.slice(0, req.hostname.indexOf('.'));
    if(subdomain === 'en')
        express.static(`${__dirname}/public/en`)(req, res, next);
    else 
        express.static(`${__dirname}/public/sr`)(req, res, next);
});

server.listen(80, () => console.log('Listening at port 80.'));