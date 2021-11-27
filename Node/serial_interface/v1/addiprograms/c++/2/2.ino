#include <LiquidCrystal.h>
LiquidCrystal lcd(7, 6, 5, 4, 3, 2);
String data = "", data_prev = "";

void setup() {

  lcd.begin(16, 2);
  Serial.begin(9600);
  pinMode(A0, OUTPUT);
  pinMode(A1, OUTPUT);
  analogWrite(A1, 0 );
}

void loop() {
  
  data = Serial.readString();

 if(data == "BOOM") {

  analogWrite(A0, 1023);
  delay(1000);
  analogWrite(A0, 0);
 }
 
 if(data_prev != data && data != "") {

  lcd.clear();
  
 if(data.length() <= 16) {

  lcd.setCursor(0, 0);  
  lcd.print(data.substring(0, 16)); 
  } else {
  
  lcd.setCursor(0, 0);  
  lcd.print(data.substring(0, 16)); 
  lcd.setCursor(0, 1);  
  lcd.print(data.substring(16, data.length()));
  }
  
  data_prev = data;
 }

  delay(100);
}
