import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class mini_dvd_screensaver extends PApplet {

PImage logo;
PImage icon;
float x, y, xx = 2, yy = 2, w=20, h=18;

public void setup() {
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

public void draw() {
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

public void changeColor() {
  tint(random(50, 255), random(50, 255), random(50, 255));
}
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "mini_dvd_screensaver" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
