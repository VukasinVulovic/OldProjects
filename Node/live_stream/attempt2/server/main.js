let movement_score_temp=0, movement_score_prev=0;
let chunk = {
    frames: 60,
    data: [],
    size: 4
}

function setup() {
    let socket = new WebSocket('ws://localhost:8080');
    let cam = capture(CAMERA);
    let canvas = createCanvas(300, 300, 0, 0, [20]);
    movement_score_temp = 0;
    socket.onopen = () => {
        socket.send('#streamer');
        setInterval(() => {
            let pixels = CANVAS.getImageData(0, 0, WIDTH, HEIGHT).data;
            CANVAS.drawImage(cam, 0, 0);
            for(let pixel of pixels) {
                movement_score_temp += pixel;
            }
            movement_score_temp = parseInt(movement_score_temp.toString().slice(0, 2)); 
            if(Math.abs(movement_score_temp - movement_score_prev) > 0) {
                chunk.data.push(canvas.toDataURL('image/jpg'));
            }
            if(chunk.data.length > chunk.size) {
                socket.send(JSON.stringify(chunk));
                chunk.data = [];
            }
            movement_score_prev = movement_score_temp;
        }, 1000/chunk.frames);      
    }      
}
