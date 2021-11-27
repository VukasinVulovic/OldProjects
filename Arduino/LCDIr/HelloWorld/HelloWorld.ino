#include <LiquidCrystal.h>
LiquidCrystal lcd(7, 6, 5, 4, 3, 2);
int b1=A6,b2=A7,butt1,butt2;
#include <IRremote.h>
int RECV_PIN = 11;
IRrecv irrecv(RECV_PIN);
decode_results results;


void setup() {

  Serial.begin(9600);
  lcd.begin(16, 2);
  irrecv.enableIRIn();
  lcd.clear();
  lcd.print("Ready!");
  pinMode(b1, INPUT);
  pinMode(b2, INPUT);
}

void loop() {

  butt1 = analogRead(b1);
  butt2 = analogRead(b2);

 if(irrecv.decode(&results)) {
   switch(results.value) {
    
    case 0xF7C03F: 
      lcd.clear();
      lcd.print("on");     
    break;

    case 0xF740BF: 
      lcd.clear();
      lcd.print("off");      
    break;

    case 0xF700FF: 
      lcd.clear();
      lcd.print("up");  
    break;

    case 0xF7807F: 
      lcd.clear();
      lcd.print("down");    
    break;
    
    case 0xF720DF: 
      lcd.clear();
      lcd.print("r");   
    break;

    case 0xF7A05F: 
      lcd.clear();
      lcd.print("g");     
    break;

    case 0xF3FE39F2: 
      lcd.clear();
      lcd.print("b");
    break; 
  }
    irrecv.resume();
 }
  delay(100);  
}
