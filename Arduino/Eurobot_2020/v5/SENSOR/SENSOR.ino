const int sensor_pins[2][2] = {{12, 13}, {8, 8}};//Trig, Echo

void setup() {
  Serial.begin(115200);
  pinMode(sensor_pins[0][0], INPUT);
  pinMode(sensor_pins[0][1], OUTPUT);
}

void loop() {
  sendDistance();
  delay(1000);
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
}
