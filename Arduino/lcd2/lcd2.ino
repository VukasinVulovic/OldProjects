const int RS = 12;
const int RW = 10;
const int E = 11;
const int A[8] = { 9, 8, 7, 6, 5, 4, 3, 2 };
const int CLK_DELAY = 10;

void setup() {
  Serial.begin(9600);
  initializeDisplay();
    
  setDisplayCursor(0, 0);
  displayString("Hello, World!");
  delay(1000);
  displayCharacter("0111011111111111111111111111111111101110", 7, 1);
}

void loop() {}

void setDisplayCursor(int x, int y) {
  y = (y == 0) ? 0x00 : 0x40;//set y to hex value
  INS(0x80 + x + y);//calculate rows and colls
  delayMicroseconds(CLK_DELAY);
}

void displayCharacter(String p, int x, int y) {
  INS(0x48);//CG RAM location 1
  for(int i = 0; i < 8; i++) {
    String l = p.substring(i*5, (i*5)+5);//get 5 bits of a character
    SET(binStringVal(l));//send a byte of character data
  }
  INS(0x86);//CG RAM location 1
  setDisplayCursor(x, y);//set position of the character
  SET(0x1);//Write character from position1 in RAM to display
}

void displayString(String string) {
  for(int i = 0; i < string.length(); i++)
    SET((int)string[i]);
}

void initializeDisplay() {
  pinMode(RS, OUTPUT);
  pinMode(RW, OUTPUT);
  pinMode(E, OUTPUT);
  digitalWrite(RW, 0);//set write mode
  for (int i = 0; i < 8; i++) {
    pinMode(A[i], OUTPUT);
    digitalWrite(A[i], 0);//set all adress lines to 0
  }
  delayMicroseconds(CLK_DELAY);
  INS(0x0C);//display on, cursor off
  delayMicroseconds(CLK_DELAY);
  INS(0x38);//2Line 5x7, 8bit mode 
  delayMicroseconds(CLK_DELAY);
  clearDisplay();
  delayMicroseconds(CLK_DELAY*2);
  INS(0x30);//entry mode
  delay(5);
}

void clearDisplay() {
  INS(0x01);//clear
}

void SET(byte state) {//Data mode
  digitalWrite(RS, 1);
  for(int i = 0; i < 8; i++) 
       digitalWrite(A[i], ((state >> i) & 0x01));//set a bit from a hex intiger from an index
  delayMicroseconds(CLK_DELAY*2);
  digitalWrite(E, 1);
  delayMicroseconds(CLK_DELAY*2);//enable
  digitalWrite(E, 0);
}

void INS(byte state) {//Instruction mode
  digitalWrite(RS, 0);
  for(int i = 0; i < 8; i++) 
     digitalWrite(A[i], ((state >> i) & 0x01));//set a bit from a hex intiger from an index
  delayMicroseconds(CLK_DELAY*2);
  digitalWrite(E, 1);
  delayMicroseconds(CLK_DELAY);//enable
  digitalWrite(E, 0);
}

int binStringVal(String x) {//get value from a string of a byte 
    int value = 0;
    for (int j = 0; j < x.length(); j++) {
      value *= 2;
      if(x[j] == '1') value++;
    }
    return value;
}
