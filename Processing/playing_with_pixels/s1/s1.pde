color[][] colors = new color[400][400]; 
PImage image;

void setup() {
  size(800, 400);
  image = loadImage("src/image.jpg");
  image(image, 0, 0, 400, 400);
  for(int x = 0; x < 400; x++) {
    for(int y = 0; y < 400; y++) {
      colors[x][y] = get(x, y);
    }
  }
}

void draw() {
  for(int x = 0; x < colors.length; x++) {
    for(int y = 0; y < colors[0].length; y++) {
      noStroke();
      fill(colors[x][y]);
      rect(x+400, y, 1, 1);
    }
  }
}                                                                                                                                                                                                               
