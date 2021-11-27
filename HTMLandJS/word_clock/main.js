darkMode();
let start_margin = {
  x: 200,
  y: 0
};

function setup() {
  createCanvas();
  loopSpeed(100);
}

function loop() {
  refresh();
  clock();
  for(let y = 0; y < letters.length; y++) {
    for(let x = 0; x < letters[0].length; x++) {
      let color = [255];
      if(sequence[y][x] == 1) {
        color = [255];
      } else {
        color = [50];
      }
      textEl(letters[y][x], x*100+start_margin.x, y*100+start_margin.y, 100, color);
    }
  }
}

