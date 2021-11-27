let d1, d2, h1, h2, m1, m2, s1, s2;
let w = 20, h = 60, x = (WIDTH/2)-((h*2)+w*8), y = 3;
let DATE = new Date('Apr 21, 2020 5:00:00').getTime();

function setup() {
  createCanvas(WIDTH, HEIGHT, 0, 0, [255]);
  d1 = new Display(x, y, w, h);
  d2 = new Display(x+h+(w*4), y, w, h);
  h1 = new Display(x, y+(h*4), w, h);
  h2 = new Display(x+h+(w*4), y+(h*4), w, h);
  m1 = new Display(x, y+(h*8), w, h);
  m2 = new Display(x+h+(w*4), y+(h*8), w, h);
  s1 = new Display(x, y+(h*12), w, h);
  s2 = new Display(x+h+(w*4), y+(h*12), w, h);
  loopSpeed(1000);
}

function loop() {
  refresh();
  let date = new Date().getTime();
  let day = Math.floor((DATE-date) / (1000 * 60 * 60 * 24)),
      hrs = Math.floor(((DATE-date) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      min = Math.floor(((DATE-date) % (1000 * 60 * 60)) / (1000 * 60)),
      sec = Math.floor(((DATE-date) % (1000 * 60)) / 1000);
  if(day.toString().length < 2) day = `0${day.toString()}`;
  if(hrs.toString().length < 2) hrs = `0${hrs.toString()}`;
  if(min.toString().length < 2) min = `0${min.toString()}`;
  if(sec.toString().length < 2) sec = `0${sec.toString()}`;
  d1.number = parseInt(day.toString().slice(0, 1));
  d2.number = parseInt(day.toString().slice(1, 2));
  h1.number = parseInt(hrs.toString().slice(0, 1));
  h2.number = parseInt(hrs.toString().slice(1, 2));
  m1.number = parseInt(min.toString().slice(0, 1));
  m2.number = parseInt(min.toString().slice(1, 2));
  s1.number = parseInt(sec.toString().slice(0, 1));
  s2.number = parseInt(sec.toString().slice(1, 2));
  d1.render();
  d2.render();
  h1.render();
  h2.render();
  m1.render();
  m2.render();
  s1.render();
  s2.render();
  textEl(x+w*14, y+w+(h*2), 80, 'dana,', 'undertale');
  textEl(x+w*14, y+w+(h*6), 80, 'sati,', 'undertale');
  textEl(x+w*14, y+w+(h*10), 80, 'minuta,', 'undertale');
  textEl(x+w*14, y+w+(h*14), 80, 'sekundi ostalo.', 'undertale');
  if(hrs == 0 && min == 1 && sec == 15) {
    new soundEffect('bin/src/crabs.mp3');
  } else {
    new soundEffect('bin/src/tick.mp3');
  }
}

class Display {
  constructor(x, y, segment_width, segment_height) {
    this.x = x;
    this.y = y;
    this.width = segment_width;
    this.height = segment_height;
    this.number = 0;
    this.color = [0];
  }
  render() {
    let bit = this.convert();
    if(bit[0])rectangleEl(this.x+this.width, this.y, this.height, this.width, 0, this.color);//top
    if(bit[1])rectangleEl(this.x, this.y+this.width, this.width, this.height, 0, this.color);//top left
    if(bit[2])rectangleEl(this.x+this.height+this.width, this.y+this.width, this.width, this.height, 0, 2);//top right
    if(bit[3])rectangleEl(this.x+this.width, this.y+this.height+this.width, this.height, this.width, 0, this.color);//middle
    if(bit[4])rectangleEl(this.x, this.y+this.height+this.width*2, this.width, this.height, 0, this.color);//bottom left
    if(bit[5])rectangleEl(this.x+this.height+this.width, this.y+this.height+this.width*2, this.width, this.height, 0, this.color);//bottom right
    if(bit[6])rectangleEl(this.x+this.width, this.y+this.width*2+this.height*2, this.height, this.width, 0, this.color);//bottom
  }
  convert() {
    let bit = new Array(8);
    switch(this.number) {
      case 0:
        bit[0] = 1, bit[1] = 1, bit[2] = 1, bit[3] = 0, bit[4] = 1, bit[5] = 1, bit[6] = 1;
      break;
      case 1:
        bit[0] = 0, bit[1] = 1, bit[2] = 0, bit[3] = 0, bit[4] = 1, bit[5] = 0, bit[6] = 0;
      break;
      case 2:
        bit[0] = 1, bit[1] = 0, bit[2] = 1, bit[3] = 1, bit[4] = 1, bit[5] = 0, bit[6] = 1;
      break;
      case 3:
        bit[0] = 1, bit[1] = 0, bit[2] = 1, bit[3] = 1, bit[4] = 0, bit[5] = 1, bit[6] = 1;
      break;
      case 4:
        bit[0] = 0, bit[1] = 1, bit[2] = 1, bit[3] = 1, bit[4] = 0, bit[5] = 1, bit[6] = 0;
      break;
      case 5:
        bit[0] = 1, bit[1] = 1, bit[2] = 0, bit[3] = 1, bit[4] = 0, bit[5] = 1, bit[6] = 1;
      break;
      case 6:
        bit[0] = 1, bit[1] = 1, bit[2] = 0, bit[3] = 1, bit[4] = 1, bit[5] = 1, bit[6] = 1;
      break;
      case 7:
        bit[0] = 1, bit[1] = 0, bit[2] = 1, bit[3] = 0, bit[4] = 0, bit[5] = 1, bit[6] = 0;
      break;
      case 8:
        bit[0] = 1, bit[1] = 1, bit[2] = 1, bit[3] = 1, bit[4] = 1, bit[5] = 1, bit[6] = 1;
      break;
      case 9:
        bit[0] = 1, bit[1] = 1, bit[2] = 1, bit[3] = 1, bit[4] = 0, bit[5] = 1, bit[6] = 1;
      break;
      default:
        bit[0] = 1, bit[1] = 1, bit[2] = 1, bit[3] = 0, bit[4] = 1, bit[5] = 1, bit[6] = 1;
    }
    return bit;
  }
}