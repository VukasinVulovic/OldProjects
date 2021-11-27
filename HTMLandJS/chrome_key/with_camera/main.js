const feather = {
  r: 200,
  g: 255, 
  b: 50
}
let canvas = [];
let input = [
  0,
  document.querySelector('#background')
];

function setup() {
  canvas = [
    Element('canvas', 'c1'),
    Element('canvas', 'c2')
  ];

  input[0] = capture(CAMERA);

  canvas[0].width = '401';
  canvas[0].height = '225';
  canvas[1].width = '401';
  canvas[1].height = '225';
  
  canvas[0] = canvas[0].getContext('2d');
  canvas[1] = canvas[1].getContext('2d');

  createCanvas(400, 225, 218, 300, [255]);
  loopSpeed(1000/60);
}

function loop() {
  canvas[0].drawImage(input[0], 0, 0, 400, 225);
  canvas[1].drawImage(input[1], 0, 0, 400, 225);

  let pixels = [
    canvas[0].getImageData(0, 0, 400, 300),
    canvas[1].getImageData(0, 0, 400, 300)
  ];

  for(let i = 0; i < pixels[0].data.length; i += 4) {
    let colors = [
      {
        r: pixels[0].data[i + 0],
        g: pixels[0].data[i + 1],
        b: pixels[0].data[i + 2],
        a: pixels[0].data[i + 3]
      }, 
      {
        r: pixels[1].data[i + 0],
        g: pixels[1].data[i + 1],
        b: pixels[1].data[i + 2],
        a: pixels[1].data[i + 3]
      }
    ];
    if(colors[1].r <= feather.r && colors[1].g <= feather.g && colors[1].b <= feather.b) {
      pixels[1].data[i + 0] = colors[0].r;
      pixels[1].data[i + 1] = colors[0].g; 
      pixels[1].data[i + 2] = colors[0].b; 
      pixels[1].data[i + 3] = colors[0].a; 
    }
  }  
  CANVAS.putImageData(pixels[1], 0, 0); 
}