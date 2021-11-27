#include <LiquidCrystal.h>
LiquidCrystal lcd(7, 6, 5, 4, 3, 2);
String data = "";
bool req = false;
int num = 0;

void setup() {

  lcd.begin(16, 2);
  Serial.begin(9600);
  pinMode(A5, INPUT);
}

void loop() {
  
  data = Serial.readString();
  
  lcd.clear();
  num = map(analogRead(A5), 0, 1023, 0, 255);
  lcd.setCursor(0, 0);  
  lcd.print(num);
  Serial.println(String(num)); 
  
  delay(50);
}
