devMode();
document.body.style.backgroundColor = 'rgb(255, 255, 255)';
let x = WIDTH/2, xx;
let start_x = x;
let space = 200;
let y = HEIGHT-100;
let line_size = 100;

function setup() {
  createCanvas(WIDTH, HEIGHT, 0, 0, [255]);
  xx = random([-1, 1]);
}

function loop() {
  refresh();
  //colision detection
  let sensor0_x = x-200;
  let sensor1_x = x+200;
  let border0_x = start_x-space;
  let border1_x = start_x+space;

  if(sensor0_x-border0_x < -10) {
    lineEl([x, y], [x-200, y-200], 10, [255, 0, 0]);
    xx = 1; 
  } else {
    lineEl([x, y], [x-200, y-200], 10, [0, 255, 0]); 
  }
  if(sensor1_x-border1_x > 10) {
    lineEl([x, y], [x+200, y-200], 10, [255, 0, 0]);
    xx = -1;
  } else {
    lineEl([x, y], [x+200, y-200], 10, [0, 255, 0]);
  }

  //player
  rectangleEl(x-50, y, 100, 100, 0, [0]);
  y -= 2;
  x += xx;
  //borders
  lineEl([start_x-space, HEIGHT], [start_x-space, 0], 10, [0, 255, 0]);
  lineEl([start_x+space, HEIGHT], [start_x+space, 0], 10, [0, 255, 0]);
}