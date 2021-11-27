let canvas = [], input = [];
let recorder, chunks = [];
const feather = {
  r: 13,
  g: 255, 
  b: 13
}
createElements();

function createElements() {
  canvas = [
    Element('canvas', 'c1'),
    Element('canvas', 'c2'),
    createCanvas(400, 225, 218, 300, [255])
  ];

  input = [
    Element('video', 'background'),
    Element('video', 'green_screen')
  ];

  input[0].src = './src/background_input.mp4';
  input[1].src = './src/green_screen_input.mp4';

  input[0].width = 0;
  input[0].height = 0;
  input[1].width = 0;
  input[1].height = 0;

  input[0].muted = true;
  input[1].muted = true;
  input[0].autoplay = true;
  input[1].autoplay = true;
  input[1].loop = true;

  canvas[0].width = '401';
  canvas[0].height = '225';
  canvas[1].width = '401';
  canvas[1].height = '225';
  
  canvas[0] = canvas[0].getContext('2d');
  canvas[1] = canvas[1].getContext('2d');

  input[0].onloadedmetadata = () => {
    applyEffect();
  }  
}

function applyEffect() {
  recorder = new MediaRecorder(canvas[2].captureStream(60));
  recorder.start();

  let loop = setInterval(() => {
    if(!input[0].ended) {
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
    } else {
      console.log('end');
      recorder.stop();
      clearInterval(loop);
      recorder.ondataavailable = (e) => {
        let url = URL.createObjectURL(new Blob([e.data], {type: 'video/webm'}));
        let link = Element('a');
        link.download = `video_${random(0, 100000)}.webm`;
        link.href = url;
        let button = addButton('download', 'DOWNLOAD', 'color: #0c0109;font-style: normal;text-shadow: 0px 0px 0px #000000;font-weight: bold;text-align: center;font-size: 67px;background-color: #ffffff;border-radius: 30px;box-shadow: 4px 4px4px#fefefe;height: 112px;width: 369px;border: none;', () => {return;});
        link.appendChild(button);
        document.body.removeChild(input[0]);
        document.body.removeChild(input[1]);
        document.body.removeChild(grab('c1'));
        document.body.removeChild(grab('c2'));
        document.body.removeChild(grab('canvas0'));
      }
    }
  }, 1000/60);
}