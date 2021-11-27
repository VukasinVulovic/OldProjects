let source;
fpsCounter();

function setup() {
  createCanvas(400*2, 400*2, 0, 0, [50]);
  source = Element('video');
  source.src = 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4';
  source.muted = 'true';
  source.autoplay = 'true';
  source.width = 0;
  source.heignt = 0;
}

function loop() {
  
}

setInterval(() => {
  CANVAS.drawImage(source, 0, 0, 400, 400);
  addText('60', '60fps', 20, '#ff0000', 0, 0, '-');
}, 16);//60 fps

setInterval(() => {
  CANVAS.drawImage(source, 400, 0, 400, 400);
  addText('30', '30fps', 20, '#ff0000', 400, 0, '-');
}, 32);//30 fps

setInterval(() => {
  CANVAS.drawImage(source, 0, 400, 400, 400);
  addText('25', '25fps', 20, '#ff0000', 0, 400, '-');
}, 40);//25 fps

setInterval(() => {
  CANVAS.drawImage(source, 400, 400, 400, 400);
  addText('15', '15fps', 20, '#ff0000', 400, 400, '-');
}, 66);//15 fps
