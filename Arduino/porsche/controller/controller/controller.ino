#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <Servo.h>
const int motor_pins[2][2] = {{16, 5}, {0, 2}};
const int pwm_pins[2] = {12, 14};
const char* ssid = "Vulovic";
const char* password = "12111953";
ESP8266WebServer server(80);

void setup() {
  Serial.begin(9600);
  WiFi.mode(WIFI_STA);
  WiFi.hostname("UwU");
  WiFi.begin(ssid, password);
  Serial.print("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Server IP address: ");
  Serial.println(WiFi.localIP());
  server.begin();
  Serial.println("HTTP server started.");
  Serial.println("--------------------------------------------------------");
  server.begin();
  server.on("/", processRequest);
  //motor setup
  pinMode(motor_pins[0][0], OUTPUT);
  pinMode(motor_pins[0][1], OUTPUT);
  pinMode(motor_pins[1][0], OUTPUT);
  pinMode(motor_pins[1][1], OUTPUT);
  //pwm setup
  pinMode(pwm_pins[0], OUTPUT);
  pinMode(pwm_pins[1], OUTPUT);
  //reset pins
  digitalWrite(motor_pins[0][0], 0);
  digitalWrite(motor_pins[0][1], 0);
  digitalWrite(motor_pins[1][0], 0);
  digitalWrite(motor_pins[1][1], 0);
  //reset pwm pins
  digitalWrite(pwm_pins[0], 0);
  digitalWrite(pwm_pins[1], 0);
}

void loop() {
  server.handleClient();
}

void processRequest() {
  if(!server.hasArg("power") || !server.hasArg("steer")) 
    return server.send(200, "text/plain", "wrong arguments use [?power=(-255 - 255)&steer=(-90 - 90)");
  int power = server.arg("power").toInt();
  int steer = server.arg("steer").toInt();
  controlMotor(power, steer);
}

void controlMotor(int p, int s) {
  int power = map(abs(p), 0, 100, 0, 1024);
  int steer = map(abs(s), 0, 100, 0, 1024);
  if(p == 0) {
    Serial.println("---------STOP-----------");
    server.send(200, "text/plain", "OK");
    digitalWrite(motor_pins[1][0], 0);
    digitalWrite(motor_pins[1][1], 0);  
    analogWrite(pwm_pins[0], 0);
    Serial.println("---------------------------");
  } else if(p < 0) {
    Serial.println("---------Backwards-----------");
    server.send(200, "text/plain", "OK");
    digitalWrite(motor_pins[1][0], 0);
    digitalWrite(motor_pins[1][1], 1);
    analogWrite(pwm_pins[0], power);
    Serial.println("---------------------------");
  } else if(p > 0) {
    Serial.println("---------Forwards-----------");
    server.send(200, "text/plain", "OK");
    digitalWrite(motor_pins[1][0], 1);
    digitalWrite(motor_pins[1][1], 0);
    analogWrite(pwm_pins[0], power);
    Serial.println("---------------------------");
  }
  //steer stuff
  if(s == 0) {
    Serial.println("---------STOP-----------");
    server.send(200, "text/plain", "OK");
    digitalWrite(motor_pins[0][0], 0);
    digitalWrite(motor_pins[0][1], 0); 
    analogWrite(pwm_pins[1], 0);
    Serial.println("---------------------------");
  } else if(s < 0) {
    Serial.println("---------Left-----------");
    server.send(200, "text/plain", "OK");
    digitalWrite(motor_pins[0][0], 0);
    digitalWrite(motor_pins[0][1], 1);
    analogWrite(pwm_pins[1], steer);
    Serial.println("---------------------------");
  } else if(s > 0) {
    Serial.println("---------Right-----------");
    server.send(200, "text/plain", "OK");
    digitalWrite(motor_pins[0][0], 1);
    digitalWrite(motor_pins[0][1], 0);
    analogWrite(pwm_pins[1], steer);
    Serial.println("---------------------------");
  }
}
