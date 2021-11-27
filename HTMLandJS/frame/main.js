function setup() {
  createCanvas(WIDTH, HEIGHT, 0, 0, [255]);
  video = document.querySelector('#video');
}

function loop() {
  let index = Math.floor(map(pointerX, 0, WIDTH, 0, 661));
  let length = index.toString().length;
  let frame_index = '000';
  switch(length) {
    case 1:
      frame_index = `00${index}`;
    break;
    case 2:
      frame_index = `0${index}`
    break;
    case 3:
      frame_index = index;
    break;
  }
  imageEl(0, 0, WIDTH, HEIGHT, `./src/frames/frame${frame_index}.jpg`);
}

