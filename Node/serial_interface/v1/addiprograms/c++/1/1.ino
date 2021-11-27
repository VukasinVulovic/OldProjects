#include <LiquidCrystal.h>
LiquidCrystal lcd(7, 6, 5, 4, 3, 2);
String data = "", data_prev = "";
int timer = 0;

void setup() {

  lcd.begin(16, 2);
  Serial.begin(9600);
  Serial.println("STARTED");
}

void loop() {
  
  data = Serial.readString();
  
 if(data_prev != data) {

  lcd.clear();
  Serial.println(data);
  
  lcd.setCursor(0, 2);
  lcd.print(data);   
  
  data_prev = data;
  timer = 0;
 } else {

  timer++;
 }
 
 if(timer >= 5) {

  lcd.clear();
  lcd.setCursor(5, 0);
  lcd.print("(- _ -)"); 
 } else {

  lcd.setCursor(5, 0);
  lcd.print("(0 _ 0)");  
 }
  delay(1000);
}
