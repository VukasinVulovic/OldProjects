String key = "";
int num = 0, gen_mode = 0;
int i = 0;
char hashes[] = {'!', '@', '#', '$', '%', '^', '&', '*', '(', ')', ':', '|', '{', '}', '<', '>', '?', '_', '+', '-', '=', ']', '[', ';', '.', ','};

void setup() {
  
  Serial.begin(9600);
  pinMode(A5, INPUT);
}

void loop() {
  

      key = "";
      
     for(i = 0; i <= map(analogRead(A5), 0, 1023, 13, 100); i++) {

          num = map(analogRead(A5), 0, 1023, 0, 25);
          key += hashes[num];
   }
  
  Serial.println(String(key)); 
  delay(2000);
}
