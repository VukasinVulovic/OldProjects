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
