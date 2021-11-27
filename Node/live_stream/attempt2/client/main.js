let i = 0;
let chunk = {
    frames: 10,
    data: [],
    size: 0
}
function setup() {
    let socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
        socket.send('#viewer');
    }
    socket.onmessage = (message) => {        
        chunk = JSON.parse(message.data);
        i = 0;
    }
    setInterval(() => {
        if(chunk.data.length == chunk.size+1 && i < chunk.size+1) {
            let img = Element('img', 'img');
            img.style.position = 'absolute';
            img.src = chunk.data[i];
            i++;
        }
    }, 1000/chunk.frames);
}

