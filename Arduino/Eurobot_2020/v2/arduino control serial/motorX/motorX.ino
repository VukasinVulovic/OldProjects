#include<Servo.h>
Servo servo1;
Servo servo2;
int mPins[] = {5, 6, 9, 10};
int Speed = 255;

 void setup() {
 
  pinMode(mPins[0], OUTPUT);
  pinMode(mPins[1], OUTPUT);
  pinMode(mPins[2], OUTPUT);
  pinMode(mPins[3], OUTPUT);
  servo1.attach(3);
  servo2.attach(11);
  Serial.begin(9600);
}

 void loop() {

   switch(Serial.read()) {

   //servo up
   case '+':
   Serial.println("UP");
   servo1.write(0);
   servo2.write(180);
   break;

   //servo down
   case '-':
   Serial.println("DOWN");
   servo1.write(100);
   servo2.write(100);
   break;
   
   //forwards
   case 'w':
   Move('F', Speed);
   break;   

   //backwards
   case 's':
   Move('B', Speed);
   break;
   
   //left
   case 'a':
   Move('L', Speed);
   break;
   
   //right
   case 'd':
   Move('R', Speed);
   break;
   
   //stop
   case ' ':
   Move('-', 0);
   break;
   
   //boom
   case '0':
   Serial.println("BOOM");
   digitalWrite(2, 1);
   delay(1000);
   digitalWrite(2, 0);
   break;
 }
   delay(100);
}

 void Move(char dir, int mSpeed) {
   switch(dir) {

   //stop 
   case '-':
   case '/':
   Serial.println("FMxSTOP");
   analogWrite(mPins[0], 0);
   analogWrite(mPins[1], 0);
   analogWrite(mPins[2], 0);
   analogWrite(mPins[3], 0);
   break;
   
   //forwards 
   case 'F':
   case 'f':
   Serial.println("FMxFORWARDS");
   analogWrite(mPins[0], mSpeed - 10);
   analogWrite(mPins[1], 0);
   analogWrite(mPins[2], mSpeed);
   analogWrite(mPins[3], 0);
   break;

   //backwards 
   case 'B':
   case 'b':
   Serial.println("FMxBACKWARDS");
   analogWrite(mPins[0], 0);
   analogWrite(mPins[1], mSpeed);
   analogWrite(mPins[2], 0);
   analogWrite(mPins[3], mSpeed);
   break;

   //left
   case 'L':
   case 'l':
   Serial.println("FMxLEFT");
   analogWrite(mPins[0], 0);
   analogWrite(mPins[1], mSpeed);
   analogWrite(mPins[2], mSpeed);
   analogWrite(mPins[3], 0);
   break;
   
   //right 
   case 'R':
   case 'r':
   Serial.println("FMxRIGHT");
   analogWrite(mPins[0], mSpeed);
   analogWrite(mPins[1], 0);
   analogWrite(mPins[2], 0);
   analogWrite(mPins[3], mSpeed);
   break;
 }
}
