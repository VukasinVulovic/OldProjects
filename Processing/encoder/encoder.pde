void setup() {
  size(100, 100);
  background(255);
  
  String text = readTextFile("input.txt");//get text lines from file... as string
  drawFromString(text);
  
  save("./data/output.png");
}

void drawFromString(String text) {
  loadPixels();
  
  String padded_text = padString(text);//pad text
  
  for(int i = 0; i < padded_text.length(); i++) {
    int ascii = (int)padded_text.charAt(i);//get char code ascii
    pixels[i] = color(ascii);//set pixel color
  }
  
  updatePixels();
}

String readTextFile(String name) {
  String[] lines = loadStrings(name);
  String text = "";
  for(int i = 0 ; i < lines.length; i++) 
    text += lines[i] + "*";
  return text;
} 

String padString(String input) {
 String padded = input;
 for(int i = 0; i < 10000-input.length(); i++) //100 * 100 = 10000
    padded += " ";  
  return padded;
}
