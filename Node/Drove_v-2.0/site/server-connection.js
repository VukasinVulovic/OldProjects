(() => {
    const u = getCookie('username');
    const p = getCookie('password');
    if(!u || !p || u == 'null' || p == 'null') location.href = '/register';
})();

const USER = {
    username: getCookie('username'),
    password: getCookie('password')
}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if(parts.length === 2) return parts.pop().split(';').shift();
}

const ws = new WebSocket(`wss://${location.hostname}`);

ws.onopen = () => {
    ws.send(`{
        "username": "${USER.username}",
        "password": "${USER.password}",
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
                    open(`/downloadfile/${USER.username}/temp/temp-zip-file.zip/`, '_blank');
                    break;
                case 'get-storage-stats':
                    createBar(data.max, data.vals);
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
        "username": "${USER.username}",
        "password": "${USER.password}",
        "action": "get-user-settings"
    }`);
}

function setUserSetings(settings) {
    ws.send(`{
        "username": "${USER.username}",
        "password": "${USER.password}",
        "action": "set-user-settings",
        "settings": ${JSON.stringify(settings)}
    }`);
}
