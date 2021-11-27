const ws = require('ws');
const fs = require('fs');

const ws_server = new ws.Server({
    port: 433
});

ws_server.on('connection', connection =>{
    connection.on('message', (data) => {
        if(data == '!video_list') {
            fs.readdir('videos/src', {}, (err, files) => {
                fs.readFile('./videos/metadata.json', (err, data) => {   
                    connection.send(JSON.stringify(
                        {
                            "videos": files, 
                            "metadata": JSON.parse(data)
                        }
                    ));
                });
            });
        }
    });
});