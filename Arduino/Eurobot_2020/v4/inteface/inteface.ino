#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include "index.h"
const int motor_pins[2][2] = {{16, 5}, {0, 2}};
const char* ssid = "Robot";
const char* password = "pass1234";

ESP8266WebServer server(80);

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
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
  server.on("/left", left);
  server.on("/right", right);
  server.on("/stop", STOP);
  server.on("/", start_page);
  //motor setup
  pinMode(motor_pins[0][0], OUTPUT);
  pinMode(motor_pins[0][1], OUTPUT);
  pinMode(motor_pins[1][0], OUTPUT);
  pinMode(motor_pins[1][1], OUTPUT);
  //reset pins
  digitalWrite(motor_pins[0][0], 0);
  digitalWrite(motor_pins[0][1], 0);
  digitalWrite(motor_pins[1][0], 0);
  digitalWrite(motor_pins[1][1], 0);
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
