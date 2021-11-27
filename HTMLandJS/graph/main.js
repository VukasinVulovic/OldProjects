function setup() {
  createCanvas();
  // readFile('some_file.txt', (data) => {
  //   createGraph(data.split(', '), 100, 1, [255]);
  // });
  loopSpeed(10);
}

fpsCounter();
let fps = [];

window.onmousemove = () => {
  for(let i = 0; i < 100; i++) {
    addButton(false, i, 'default');
  }
}

function loop() {
  if(window.fps_count != fps[fps.length-1]) {
    fps.push(window.fps_count);
    createGraph(fps, 0, [255]);
    current_fps = fps[fps.length-1]
  }
}

function createGraph(list, spacing=2, color=[255]) {
  refresh();
  let data = [], sorted = [];
  for(let el of list) {
    data.push(parseInt(el));
    sorted.push(parseInt(el));
  }
  sorted.sort((a, b) => {return a-b});
  for(let i = 0; i < data.length; i++) {
    let height = map(data[i], sorted[0], sorted[data.length-1], 0, window.innerHeight-10);
    let width = Math.round(window.innerWidth/data.length);
    let pos_x = i*(spacing + width);
    rectangleEl(pos_x, window.innerHeight-height, width, height, 0, color);
  } 
}