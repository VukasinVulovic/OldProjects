const request = require('request');
const WebSocket = require('ws');

const ws = new WebSocket.Server({
  port: 80
});

ws.on('connection', connection => {
    connection.on('message', query => {
        request(`https://www.google.com/search?hl=en&gl=ar&tbm=isch&sxsrf=ALeKk03HGhidZKdEUEsNSM5BNMfnpJ-lhQ%3A1589183291446&source=hp&biw=1680&bih=907&ei=OwO5XuPbGPmbjLsPmO6amAo&q=${query}&oq=${query}&gs_lcp=CgNpbWcQAzICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADICCAA6BAgjECdQ-BBYhRNgrhRoAHAAeACAAUiIAc0BkgEBM5gBAKABAaoBC2d3cy13aXotaW1n&sclient=img&ved=0ahUKEwij5cSMqavpAhX5DWMBHRi3BqMQ4dUDCAc&uact=5`, (error, response, data) => {
            let first_image = data.slice(data.indexOf('<input type="text"'));
            first_image = first_image.slice(first_image.indexOf('src="'));
            first_image = first_image.slice(5, first_image.indexOf('">'));
            connection.send(JSON.stringify({
                url: first_image,
                query: query 
            }));
        });
    }); 
});


