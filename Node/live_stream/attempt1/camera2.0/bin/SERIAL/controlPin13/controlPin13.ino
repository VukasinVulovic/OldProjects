void setup() {
  Serial.begin(9600);
  pinMode(13, OUTPUT);
}

void loop() {
  if(Serial.available() > 0) {
    String data = Serial.readString();
    if(data.indexOf('\n') > -1) {
      data = data.substring(0, data.length()-1);
    }
    if(data != "") {
      if(data == "Hello!") {
        Serial.println("Hello to you as well, server!");
        digitalWrite(13, 1);
        delay(1000);
        digitalWrite(13, 0);
      }
    }
    delay(100);
  }
}
