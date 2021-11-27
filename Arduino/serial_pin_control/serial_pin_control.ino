int pin;

void setup() {
  for(int i = 2; i <= 13; i++) {
      pinMode(i, OUTPUT);    
  }
  Serial.begin(96000);
}

void loop() {
  if(Serial.available() > 0) {
    String temp = Serial.readString();
    if(temp == "2"){ pin = 2; }
    if(temp == "3"){ pin = 3; }
    if(temp == "4"){ pin = 4; }
    if(temp == "5"){ pin = 5; }
    if(temp == "6"){ pin = 6; }
    if(temp == "7"){ pin = 7; }
    if(temp == "8"){ pin = 8; }
    if(temp == "9"){ pin = 9; }
    if(temp == "10"){ pin = 10; }
    if(temp == "11"){ pin = 11; }
    if(temp == "12"){ pin = 12; }
    if(temp == "13"){ pin = 13; }

    if(pin > 1 && pin < 14) {
      Serial.println(temp);
      digitalWrite(pin, 1);
      delay(100);
      digitalWrite(pin, 0);
    }
    delay(100);
  }
  pin = 0;
}
