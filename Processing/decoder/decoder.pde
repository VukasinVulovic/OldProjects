void setup() {
  size(100, 100);
  background(255);
  String text = stringFromImage("input.png");
  saveString(text);
}

String stringFromImage(String name) {
  PImage input = loadImage(name, "png");  
  image(input, 0, 0);
  loadPixels();
  
  String text = "";
  for(int i = 0; i < 10000; i++) {// 100 * 100 = 10000
    int pixel = (int)brightness(pixels[i]);
    text += char(pixel);  
  }
  return text;
} 

void saveString(String string) {
  String[] strings = string.split("\n");
  saveStrings("./data/output.txt", strings);
}
