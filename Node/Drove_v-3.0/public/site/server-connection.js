const ws = new WebSocket(`wss://${location.hostname}`);

ws.onopen = () => {
    ws.send(`{
        "action": "list",
        "url": "${location.href}"
    }`);
    itemSelection();
    ws.onmessage = (d) => {
        const data = JSON.parse(d.data);
        if(data.action != 'error') {
            switch(data.action) {
                case 'list':
                    listDir(data.data);
                    for(let f of data.data) if(f.name != 'temp')FS.push(f.name);
                    break;
                case 'new-folder':
                    location.reload();
                    break;
                case 'delete-folder':
                    location.reload();
                    break;
                case 'download-folder':
                        open(`/downloadfile/data/temp/temp-zip-file.zip/`, '_blank');
                    break;
                case 'get-storage-stats':
                    createBar(data.max, data.vals);
                    break;
                case 'log-out':
                    document.cookie = "user=0"; 
                    document.cookie = "user-id=0"; 
                    location.href = '/login';
                    break;
            }
        } else {
            console.log(`%c${data.message}`, 'color: red; font-size: 21pt;');
            location.reload();
        }
    }
}


function getUserSetings() {
    ws.send(`{
        "action": "get-user-settings"
    }`);
}

function setUserSetings(settings) {
    ws.send(`{
        "action": "set-user-settings",
        "settings": ${JSON.stringify(settings)}
    }`);
}
