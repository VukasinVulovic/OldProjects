#include <LiquidCrystal.h>
LiquidCrystal lcd(7, 6, 5, 4, 3, 2);
String data = "";
bool req = false;
int num = 0, num_prev = 0;

void setup() {

  lcd.begin(16, 2);
  Serial.begin(9600);
  pinMode(A0, INPUT);
}

void loop() {
  
  data = Serial.readString();
  num = map(analogRead(A0), 0, 1023, 0, 100);

 if(num != num_prev) {

  lcd.clear();
  lcd.setCursor(0, 0);  
  lcd.print(String(num) + '%');
  Serial.println(String(num) + '%'); 
  num_prev = num;
 }
  delay(2);
}
