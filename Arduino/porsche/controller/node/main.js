console.clear();
const http = require('http');


function sendCommand(power, steer) {
    const url = `/?power=${power}&steer=${steer}`;
    console.log(`sent command: [ ${url} ];`);
    http.request({
        hostname: '192.168.1.35',
        path: url
    }, () => {
        console.log('ok');
    }).end();
}