Elip[] circles = new Elip[100];

void setup() {
  size(400, 400);
}
  
void draw() {
  background(50);
  for(int i = 0; i < 100; i++) {
   circles[i] = new Elip();
  }
  for(Elip circle: circles) {
    circle.create();
  }
}

class Elip {
  float x = random(0, width), 
        y = random(0, height),
        w = random(10, 100), 
        h = random(10, 100);
  void create() {
    float[] colr = {
      random(0, 255), 
      random(0, 255), 
      random(0, 255)
    };
    fill(colr[0], colr[1], colr[2]);
    noStroke();
    ellipse(this.x, this.y, this.w, this.h);
  }
}
