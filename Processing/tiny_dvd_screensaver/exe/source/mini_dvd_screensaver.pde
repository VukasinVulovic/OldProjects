PImage logo;
PImage icon;
float x, y, xx = 2, yy = 2, w=20, h=18;

void setup() {
  surface.setTitle("tiny dvd");
  surface.setResizable(false);
  surface.setSize(230, 130);
  icon = loadImage("src/icon.png");
  logo = loadImage("src/logo.png");
  surface.setIcon(icon);
  x = random(w, width-w);
  y = random(h, height-h);
  changeColor();
}

void draw() {
  if(x <= 0 || x >= width-w) {
    xx = -xx;
    changeColor();
  }
  
  if(y <= 0 || y >= height-h) {
    yy = -yy;
    changeColor();
  }
  x += xx;
  y += yy;
  background(50);
  noStroke();
  image(logo, x, y, w, h);
}

void changeColor() {
  tint(random(50, 255), random(50, 255), random(50, 255));
}
