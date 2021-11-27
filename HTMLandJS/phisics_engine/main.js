fpsCounter();
let ball;
let options = {
  canvas: {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    color: [0, 0, 0, 255]
  }
}

function setup() {

  let canvas = createCanvas(options.canvas.width, options.canvas.height);
  canvas.position(0, 0);

  ball = new Ball(mouseX, mouseY);
  runEngine();
}

function draw() {

  background(options.canvas.color[0], options.canvas.color[1], options.canvas.color[2], options.canvas.color[3]);

  ball.updateSliders();
  ball.update();

  push();
  noStroke();
  fill(ball.options.color);
  ellipseMode(RADIUS);
  ellipse(mouseX, mouseY, ball.options.r);
  pop();
}

window.onkeydown = function makeBall(e) {
  if(e.keyCode == 32) {

    ball.x = mouseX;
    ball.y = mouseY;

    let ball_element = ball.create();
    ball.balls.push(ball_element);
  }
}
