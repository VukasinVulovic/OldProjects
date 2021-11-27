let cam, 
    canvas,
    prev = 0;
let COUNT = 0;
let DONE = false;
let prev_date = new Date().getTime();

function setup() {
    canvas = createCanvas([255]);
    cam = capture.camera();
}

function loop() {
    refresh();
    CANVAS.drawImage(cam, 0, 0 , 100, 100);

    const diff = checkData();
    
    if(diff >= 1.2) {
        pulseHeart();
        if(!DONE) COUNT++;
        soundEffect('./bin/src/sfx/beat.mp3');
    }

    print(diff);
    
    const curr_date = new Date().getTime();
    if((curr_date-prev_date) > 60000) displayPulse();
}   

function checkData() {
    const avg = average(CANVAS.getImageData(0, 0, 100, 100).data);
    const diff = Math.abs(prev-avg);
    prev = avg;
    return diff;
}

function pulseHeart() {
    const x = WIDTH/2;
    const y = (HEIGHT/2) - 200;
    CANVAS.save();
    CANVAS.beginPath();
    const topCurveHeight = 400 * 0.3;
    CANVAS.moveTo(x, y + topCurveHeight);
    CANVAS.bezierCurveTo(x, y, x - 400 / 2, y, x - 400 / 2, y + topCurveHeight);
    CANVAS.bezierCurveTo(x - 400 / 2, y + (400 + topCurveHeight) / 2, x, y + (400 + topCurveHeight) / 2, x, y + 400);
    CANVAS.bezierCurveTo(x, y + (400 + topCurveHeight) / 2, x + 400 / 2, y + (400 + topCurveHeight) / 2, x + 400 / 2, y + topCurveHeight);
    CANVAS.bezierCurveTo(x + 400 / 2, y, x, y, x, y + topCurveHeight);
    CANVAS.closePath();
    CANVAS.fillStyle = toRGB(255, 0);
    CANVAS.fill();
    CANVAS.restore();
}

function displayPulse() {
    CANVAS.font = '60px Arial';
    CANVAS.fillText(`${COUNT}bpm`, 130, 50);
    CANVAS.fillStyle = 'red';
    DONE = true;
}
