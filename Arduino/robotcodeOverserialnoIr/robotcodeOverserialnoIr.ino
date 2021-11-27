 int m11=5;
 int m12=6;
 int m21=9;
 int m22=10;
 int relay=A1;
 int lights=12;
 int x;
 int y;
 int u;
 int strung;
void setup() {
 pinMode(m11,OUTPUT);
 pinMode(m12,OUTPUT);
 pinMode(m21,OUTPUT);
 pinMode(m22,OUTPUT);
 pinMode(relay,OUTPUT);
 pinMode(lights,OUTPUT);
 Serial.begin(9600);
 }
void f(){
 digitalWrite(m11,1);
 digitalWrite(m12,0);   
 digitalWrite(m21,1);   
 digitalWrite(m22,0); 
}
void aoff(){
 digitalWrite(m11,0);
 digitalWrite(m12,0);   
 digitalWrite(m21,0);   
 digitalWrite(m22,0);
}
void b(){
 digitalWrite(m11,0);
 digitalWrite(m12,1);   
 digitalWrite(m21,0);   
 digitalWrite(m22,1);
}
void l(){
 digitalWrite(m11,1);
 digitalWrite(m12,0);   
 digitalWrite(m21,0);   
 digitalWrite(m22,1);
}
void r(){
 digitalWrite(m11,0);
 digitalWrite(m12,1);   
 digitalWrite(m21,1);   
 digitalWrite(m22,0); 
  }
void fs(){
   aoff();
   delay(15);
   f();
   delay(50);
   aoff();
}
void bs(){
   aoff();
   delay(15);
   b();
   delay(50);
   aoff();
}
void ls(){
   aoff();
   delay(15);
   l();
   delay(50);
   aoff();
}
void rs(){
   aoff();
   delay(15);
   r();
   delay(50);
   aoff();
}
void loop() {
strung=Serial.parseInt();
  digitalWrite(relay,1);
    if(Serial.available()){
 if(strung==1){
  Serial.println("SLOWF");
fs();
  }
 if(strung==3){
  Serial.println("SLOWB");
bs();
  }
 if(strung==8){
  Serial.println("SLOWL");
ls();
  }
 if(strung==7){
  Serial.println("SLOWR");
rs();
  }
 if(strung==55){
  Serial.println("LIGHT");
x++;
  }
  if(x==2){
    x=0;
  }
  if(x==0){
    digitalWrite(lights,1);
  }
  if(x==1){
    digitalWrite(lights,0);
  }
  }
   
  if(strung==8){
      Serial.println("FOWARDS");
f();
delay(300);
aoff();
  }
    if(strung==2){
      Serial.println("BACKWARDS");
b();
delay(300);
aoff();
  }
    if(strung==4){
      Serial.println("LEFT");
l();
delay(300);
aoff();
  }
    if(strung==6){
      Serial.println("RIGHT");
r();
delay(300);
aoff();
  }
    if(strung==5){
      Serial.println("FIRE");
digitalWrite(relay,0);
delay(1000);
digitalWrite(relay,1);
  }
}
