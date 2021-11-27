Rect[] rectangles = new Rect[400]; 
color[][] colors = new color[401][401]; 
PImage image;

void setup() {
  size(800, 400);
  image = loadImage("src/image.jpg");
  image(image, 0, 0, 400, 400);
  for(int x = 0; x < colors.length; x++) {
    for(int y = 0; y < colors[0].length; y++) {
      colors[x][y] = get(x, y);
    }
  }
  for(int i = 0; i < rectangles.length; i++) {
    rectangles[i] = new Rect();
  }
}

void draw() {
  for(int i = 0; i < rectangles.length; i++) {
    rectangles[i].render(colors);
  }
}                  


class Rect {
  int x = (int)random(0, width/2);
  int y = (int)random(0, height);
  int xx = 1, yy = 1;
  void render(color[][] col) {
    color pixelColor = col[x][y];
    noStroke();
    fill(pixelColor);
    rect(x+(width/2), y, 1, 1);
    x += xx;
    y += yy;
    if(x+(width/2) >= width || x <= 0) {
      xx = -xx;
      if(x <= 0) {
        x += random(1, 10);
      } else {
        x -= random(1, 10);
      }  
    }
    if(y >= height || y <= 0) {
      yy = -yy;
      if(y <= 0) {
        y += random(1, 10);
      } else {
        y -= random(1, 10);
      } 
    }
  }
}
