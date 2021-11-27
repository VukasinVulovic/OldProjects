const uuid = grab('uuid');
const title = grab('title');
const html = grab('html');
const email = grab('email');
const ws = new WebSocket('ws://hacker-interface.mywire.org');

ws.onmessage = (e) => grab('timeout').innerText = e.data;
ws.onopen = () => {
    document.querySelector('.send_button').addEventListener('click', () => {        
        if(uuid.value.length > 3) uuid.style = '';
        else {
            uuid.style = 'outline: solid 1px #000000';
            return;
        }
        
        if(email.value.length > 3) email.style = '';
        else {
            email.style = 'outline: solid 1px #000000';
            return;
        }

        if(title.value.length > 3) title.style = '';
        else {
            title.style = 'outline: solid 1px #000000';
            return;
        }
        
        if(html.value.length > 3) html.style = '';
        else {
            html.style = 'outline: solid 1px #000000';
            return;
        }
        grab('timeout').innerText = '';
        let now = new Date().getTime();
        let prev = parseInt(localStorage.getItem('timeout-time')) || 0;
        let diff = now - prev;
        if(diff > 10000) {
            localStorage.setItem('timeout-time', now);
            ws.send(JSON.stringify({
                uuid: uuid.value,
                to: email.value,
                title: title.value,
                html: html.value
            })); 
        } else grab('timeout').innerText = `You need to wait 10 seconds.`;        
    });
}
