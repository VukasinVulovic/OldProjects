createBoxes();

function createBoxes() {
    for(let i = 0; i < 40; i++) {
        const box = document.createElement('input');
        box.type = 'checkbox';
        document.querySelector('.canvas').appendChild(box);
    }
}

function send() {
    let data = '00';
    const boxes = document.querySelectorAll('input');
    boxes.forEach(box => {
        data += box.checked ? '1' : '0';
    });
    ws.send(data);
}

const ws = new WebSocket('ws://localhost:30');

ws.onopen = () => {
    ws.onmessage = (m) => {
        console.log(m.data);
    }
}