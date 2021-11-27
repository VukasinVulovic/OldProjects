PImage image;
float picked_r = 255,
      picked_g = 255,
      picked_b = 255;
float feather_r = 0,
      feather_g = 0,
      feather_b = 0;

void setup() {
    size(640, 480);
    image = loadImage("src/image.jpg");
}

void draw() {
  background(0);
  image(image, 0, 0, 640, 480);
  loadPixels(); 
  for(int y = 0; y < height; y++) {
    for(int x = 0; x < width; x++) {
      color col = get(x, y);
      float r = red(col);
      float g = green(col);
      float b = blue(col);
      if(r >= picked_r+feather_r && g >= picked_g+feather_g && b >= picked_b+feather_b) {
        r = 255-r;
        g = 255-g;
        b = 255-b;
      }
      pixels[y*width+x] = color(r, g, b);
    }
  }
  updatePixels();
}

void mousePressed() {
  loadPixels();
  color col = get(mouseX, mouseY);
  picked_r = red(col);
  picked_g = green(col);
  picked_b = blue(col);
}
