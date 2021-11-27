function setup() {
  createCanvas(WIDTH, HEIGHT, 0, 0, [255]);
  video = document.querySelector('#video');
}

function loop() {
  let frame = Math.floor(map(pointerX, 0, WIDTH, 1, 25));
  imageEl(0, 0, WIDTH, HEIGHT, `./src/frames/frame-${frame}.jpg`)
}

