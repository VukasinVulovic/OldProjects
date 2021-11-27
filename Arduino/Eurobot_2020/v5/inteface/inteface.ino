#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <Servo.h>
#include "index.h"   
const int motor_pins[2][2] = {{16, 5}, {0, 2}};
const int sensor_pins[2][2] = {{12, 13}, {8, 8}};//Trig, Echo
const char* ssid = "Vulovic";
const char* password = "12111953";
int pos = 90;
Servo servo1;
ESP8266WebServer server(80);

void setup() {
  servo1.attach(14);
  Serial.begin(115200);
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
  server.on("/forwards", forwards);
  server.on("/backwards", backwards);
  server.on("/message", handler);
  server.on("/left", left);
  server.on("/right", right);
  server.on("/stop", STOP);
  server.on("/distance", sendDistance);
  server.on("/status", stuff);
  server.on("/whatisyourpurpose", purpose);
  server.on("/", start_page);
  server.on("/servo1", Servo1);
  //motor setup
  pinMode(motor_pins[0][0], OUTPUT);
  pinMode(motor_pins[0][1], OUTPUT);
  pinMode(motor_pins[1][0], OUTPUT);
  pinMode(motor_pins[1][1], OUTPUT);
  //sensor setup 
  pinMode(sensor_pins[0][0], INPUT);
  pinMode(sensor_pins[0][1], OUTPUT);
  //reset pins
  digitalWrite(motor_pins[0][0], 0);
  digitalWrite(motor_pins[0][1], 0);
  digitalWrite(motor_pins[1][0], 0);
  digitalWrite(motor_pins[1][1], 0);
  Servo1();
}

void loop() {
  server.handleClient();
}

void start_page() {
  server.send(200, "text/html", html_code);
}

void respond() {
  server.send(200, "text/plain", "OK");
}

void forwards() {
  Serial.println("---------Forwards-----------");
  respond();
  digitalWrite(motor_pins[0][0], 1);
  digitalWrite(motor_pins[0][1], 0);
  digitalWrite(motor_pins[1][0], 1);
  digitalWrite(motor_pins[1][1], 0);
  Serial.println("---------------------------");
}

void backwards() {
  Serial.println("---------Backwards-----------");
  respond();
  digitalWrite(motor_pins[0][0], 0);
  digitalWrite(motor_pins[0][1], 1);
  digitalWrite(motor_pins[1][0], 0);
  digitalWrite(motor_pins[1][1], 1);
  Serial.println("---------------------------");
}

void left() {
  Serial.println("---------Left-----------");
  respond();
  digitalWrite(motor_pins[0][0], 0);
  digitalWrite(motor_pins[0][1], 1);
  digitalWrite(motor_pins[1][0], 1);
  digitalWrite(motor_pins[1][1], 0);
  Serial.println("---------------------------");
}

void stuff() {
  server.send(200, "text/html", easter_data);  
}

void right() {
  Serial.println("---------Right-----------");
  respond();
  digitalWrite(motor_pins[0][0], 1);
  digitalWrite(motor_pins[0][1], 0);
  digitalWrite(motor_pins[1][0], 0);
  digitalWrite(motor_pins[1][1], 1);
  Serial.println("---------------------------");
}

void STOP() {
  Serial.println("---------STOP-----------");
  respond();
  digitalWrite(motor_pins[0][0], 0);
  digitalWrite(motor_pins[0][1], 0);
  digitalWrite(motor_pins[1][0], 0);
  digitalWrite(motor_pins[1][1], 0);                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
  Serial.println("---------------------------");
}

void sendDistance() {
  digitalWrite(sensor_pins[0][1], 0);
  delayMicroseconds(2);
  digitalWrite(sensor_pins[0][1], 1);
  delayMicroseconds(10);
  digitalWrite(sensor_pins[0][1], 0);
  int dist = pulseIn(sensor_pins[0][0], 1)*0.034/2;
  Serial.println("---------DISTANCE-----------");
  Serial.println(dist);
  Serial.println("----------------------------");
  server.send(200, "text/plain", String(dist));
}

void handler() {
  server.send(200, "text/html", handle_data);
}

void purpose () {
  server.send(200, "text/html", purpose_data);
}
  
void Servo1() {
  Serial.println("---------Backwards-----------");
  respond();
  servo1.write(pos);
  pos = -pos;
  Serial.println("----------------------------");
}
