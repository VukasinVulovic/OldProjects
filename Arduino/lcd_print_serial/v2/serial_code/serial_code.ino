#include <LiquidCrystal.h>
LiquidCrystal lcd(7, 6, 5, 4, 3, 2);
String data = "", data_prev = "";

byte zChar[] = {

    B01111,
    B00010,
    B00100,
    B11110,
    B00000,
    B00000,
    B00000,
    B00000
};

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
  lcd.setCursor(2, 0);
  lcd.print("(- _ -)");
  lcd.createChar(0, zChar);
  lcd.home();
  
  lcd.setCursor(10, 0);
  lcd.write(byte(0));
  delay(300);
  lcd.setCursor(11, 0);
  lcd.write(byte(0));
  delay(300);
  lcd.setCursor(12, 0);
  lcd.write(byte(0));
  delay(300);
 } else {

  lcd.setCursor(5, 0);
  lcd.print("(0 _ 0)");  
 }
  delay(1000);
}
