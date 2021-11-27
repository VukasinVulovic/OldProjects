devMode();
document.body.style.backgroundColor = 'rgb(255, 255, 255)';
let canvas = grab('processor');
let video = grab('video');
let display;
let noise;
let left_pixel = {
  r: 0,
  g: 0,
  b: 0
}

function setup() {
  noise = addImage('img', 'src/noise.png');
  noise.style.display = 'none';
  canvas = canvas.getContext('2d');
  display = createCanvas(400, 200, 840, 8, [255]);
  loopSpeed(1000/20);
}

function loop() {
  canvas.drawImage(video, 0, 0, 400, 200);
  let pixels = canvas.getImageData(0, 0, 400, 200);
  if(random([true, false, false])) {
    for(let j = 0; j < 2; j++) {
      for(let i = 0; i < pixels.data.length; i += 4) {
        let right_pixel = {
          r: pixels.data[i + 0],
          g: pixels.data[i + 1], 
          b: pixels.data[i + 2]
        }

        right_pixel.r = (left_pixel.r+right_pixel.r)/2;
        right_pixel.g = (left_pixel.g+right_pixel.g)/2;
        right_pixel.b = (left_pixel.b+right_pixel.b)/2;

        pixels.data[i + 0] = right_pixel.r;
        pixels.data[i + 1] = right_pixel.g;
        pixels.data[i + 2] = right_pixel.b;
        pixels.data[i + 3] = 255;
        left_pixel = right_pixel;
      }
    }
    CANVAS.putImageData(pixels, 0, 0);
    CANVAS.globalAlpha = 0.15;
    CANVAS.drawImage(noise, 0, 0, random(400, 600), random(200, 600));
  }
}

