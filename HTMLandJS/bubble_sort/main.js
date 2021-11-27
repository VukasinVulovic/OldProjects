document.body.style.backgroundColor = '#000000';
document.body.style.overflow = 'hidden';
let line_number = 100;
let lines = new Lines(line_number, window.innerWidth/line_number, window.innerHeight);
let fps_record = [];

lines.create();
fpsCounter();
draw();
setInterval(draw, 4);

 function draw() {
   lines.checkSize();
   fps_record.push(window.fps_count||0);
   addText('loopNum', 'number of lines: ' + lines.number, 80, '#ff0000', 0, (window.innerHeight/2) + 10, '-').style.opacity = 0.7;
   addText('end', 'average fps: ' + average(fps_record), 80, '#00ff00', 0, (window.innerHeight/2) + 100, '-').style.opacity = 0.7;
}
