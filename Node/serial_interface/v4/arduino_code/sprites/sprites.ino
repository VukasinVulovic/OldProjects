#include <LiquidCrystal.h>
LiquidCrystal lcd(2, 3, 4, 5, 6, 7);
bool readyState = false;

String readSerial() {
    String data = Serial.readString();
    data.replace("\n", "");
    data.replace("\r", "");
    if(!readyState) Serial.println("#ready"), readyState = true;
    if(data == "#ping") 
      Serial.println("#pong");
    else return data;
    return "";
}

void charFromBinaryString(String binary_char, int x, int y) {
  byte a[8];
  for(int i = 0; i < 8; i++) {
    String character = binary_char.substring(i*5, (i*5)+5); 
    a[i] = (HEX, binToInt(character));
  }
  lcd.createChar(0, a);
  lcd.setCursor(x, y);
  lcd.write(byte(0));
}

int binToInt(String character) {
  const int len = character.length()+1;
  char a[len];
  character.toCharArray(a, len);
  char* s = a;
  int num = 0;
  while(*s) {
    num <<= 1;
    if(*s++ == '1') num |= 1;
  }
  return num;
}

void setup() {
  lcd.begin(16, 2);
  Serial.begin(9600);// 
}

void loop() {
  if(Serial.available() > -1) {
    String data = readSerial();
    if(data.length() > 0) {
      String CHAR = data.substring(2, data.length());
      int x = (data.substring(0, 1)).toInt();
      int y = (data.substring(1, 2)).toInt();
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.begin(16, 2);
      charFromBinaryString(CHAR, x, y);
    }
  }
}
 
