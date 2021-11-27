devMode();
document.body.style.backgroundColor = 'rgb(255, 255, 255)';
let gyroscope = new Gyroscope({frequency: 60});
let prev_value = 0;
const wiggle_ammount = 100;

function setup() {
  createCanvas();
}

function loop() {
}

gyroscope.addEventListener('reading', e => {
  refresh();
  let x1 = map(gyroscope.x, 0, 50, (WIDTH/2)-200, 500+wiggle_ammount);
  let x2 = map(gyroscope.x, 0, 50, (WIDTH/2)+200, 200+wiggle_ammount);
  let y = map(gyroscope.z, 0, 50, 200, 200+wiggle_ammount);
  circleEl((WIDTH/2)-200, 200, 100, 0, [255]);
  circleEl(x1, y, 50, 0, [0]);
  circleEl((WIDTH/2)+200, 200, 100, 0, [255]);
  circleEl(x2, y, 50, 0, [0]);
  if(Math.abs(prev_value-(x1+x2+y)) > 4) {
    soundEffect(`./bin/src/sfx/shake${random(1, 3)}.mp3`);
  }
  prev_value = x1+x2+y;
});

gyroscope.start();

