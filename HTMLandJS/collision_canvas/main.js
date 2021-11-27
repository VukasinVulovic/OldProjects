devMode();
loopSpeed(10);

function setup() {
  createCanvas();
}

function loop() {
  refresh();
  line([0, 0], [pointerX, pointerY], 10, [50, 50, 50]);
  square(0, 0, 400, [255]);
  square(pointerX-200, pointerY-200, 400, [255, 0, 0]);
  let coll = collisionDetectionCanvas([0, 0], [pointerX-200, pointerY-200], [400, 400], [400, 400], 0);
  print(coll);
  grab('canvas0').style.backgroundColor = (coll) ?  '#ffffff': '#000000';
}