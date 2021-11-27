let ws = new WebSocket('ws://localhost');
let index = 0,
    send_data = true;
let images = [];

function process(data) {
    let transcript = data.replace(/[.,*+?^${}()|[\]\\]/g, '').toLowerCase().split(' ');//puts all words in array
    transcript.filter(x => x !== '');//removes empty stuff
    let x = setInterval(() => {
        if(send_data && transcript) {
            if(index >= transcript.length) {
                index = 0;
                send_data = true;
                gotImages(transcript.length);
                clearInterval(x);
            } else if(transcript) {
                ws.send(transcript[index]);//sends query
                send_data = false;
                index++;
            }
        }
    }, 10);
}

ws.onopen = () => {
    readFile('./script.txt', (data) => process(data));//reads text file
}

ws.onmessage = (res) => {
    let data = JSON.parse(res.data);
    images.push(data.url);
    send_data = true;
}

function gotImages() {
    let img = grab('slideshow_image', 'class')[0];
    let i = 0;
    img.src = images[0];
    window.onclick = () => {
        let left = Math.round(map(pointerX, 0, WIDTH, 0, 100)) <= 50;
        if(left && i > 0) i--;
        if(!left && i < images.length-1) i++;
        img.src = images[i];
    }
    addButton('download', 'download all image links', '', () => {
        download(JSON.stringify(images), 'text', `result${random(0, 5600)}.json`);
    });
}