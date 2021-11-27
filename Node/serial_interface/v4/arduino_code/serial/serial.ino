#include <LiquidCrystal.h>
LiquidCrystal lcd(2, 3, 4, 5, 6, 7);

void setup() {
  lcd.begin(16, 2);
  Serial.begin(9600);
}

void loop() {
  if(Serial.available() > -1) {
    String data = readSerial();
    if(data.length() > 0) {
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print(data);
    }
  }
}
