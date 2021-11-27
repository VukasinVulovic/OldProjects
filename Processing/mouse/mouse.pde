import java.awt.Robot;
int x, y;
int xx = 100, yy = 100;
Robot rbt;
 
void setup() {
  size(10, 10);
  try {
    rbt = new Robot();
  } catch(Exception e) {
    e.printStackTrace();
  }
  x = (int)random(0, displayWidth-1);
  y = (int)random(0, displayHeight-1);
}
 
void draw() {
  if(x < 0 || x >= displayWidth-1) {
    xx = -xx;
  }
  if(y < 0 || y > displayHeight-1) {
    yy = -yy;
  }
  x += xx;
  y += yy;
  rbt.mouseMove(x, y);  
}

void keyPressed() {
  exit();
}
