#define CS_BAR  10 // SS  
#define DO 11 // MOSI 
#define DIO 12 // MISO  
#define CLK 13 // SCK 
byte clr;
bool started = false;


char spi_transfer(volatile char data) {
  SPDR = data;
  while (!(SPSR & (1 << SPIF)));
  return SPDR;
}

void setup() {
  Serial.begin(2000000);
  pinMode(DO, OUTPUT);
  pinMode(DIO, INPUT);
  pinMode(CLK, OUTPUT);
  pinMode(CS_BAR, OUTPUT);
  digitalWrite(CS_BAR, 1);
  SPCR = (1 << SPE) | (1 << MSTR);
  clr = SPSR;
  clr = SPDR;
  delay(10);
}

void readAdress(long starting_address) {
  for(long i = starting_address; i < starting_address + 160; i += 16) {
    digitalWrite(CS_BAR, 0);
    spi_transfer(0x0B);
    spi_transfer((byte)((i >> 16) & 0x0000FF));
    spi_transfer((byte)((i >> 8) & 0x0000FF));
    spi_transfer((byte)((i) & 0x0000FF));
    spi_transfer(0xFF);
    for (int j = 0; j < 16; j++) 
      Serial.print(spi_transfer(0xFF), HEX);//160 cahracters
  }
}

void blockErase(long address) {
  digitalWrite(CS_BAR, 0);
  spi_transfer(0x06);
  digitalWrite(CS_BAR, 1);
  digitalWrite(CS_BAR, 0);
  spi_transfer(0xD8);
  spi_transfer((byte) (address >> 16));
  spi_transfer((byte) (address >> 8)); 
  spi_transfer((byte) address); 
  digitalWrite(CS_BAR, 1);
  delay(1000); // tBE = 0.4-1s
  digitalWrite(CS_BAR, 0);
  spi_transfer(0x04); //write disable
  digitalWrite(CS_BAR, 1);
  Serial.println("#erased");
}

void writeEeprom(long address, byte data[]) {
  blockErase(address);
  delay(10);
  digitalWrite(CS_BAR, 0);
  spi_transfer(0x06);
  digitalWrite(CS_BAR, 1);
  delayMicroseconds(5);
  digitalWrite(CS_BAR, 0);
  spi_transfer(0x02);
  spi_transfer((byte)((address >> 16) & 0x0000FF));
  spi_transfer((byte)((address >> 8) & 0x0000FF));
  spi_transfer((byte)((address) & 0x0000FF));  
  for(int i = 0; i < 256; i++) 
    spi_transfer(data[i]);
  digitalWrite(CS_BAR, 1);
  delay(3);
  digitalWrite(CS_BAR, 0);
  spi_transfer(0x04);
  digitalWrite(CS_BAR, 1);
  Serial.println("#wrote_data");
}

void writeString(String text) {
  int s = text.length();
  byte buffer[256];
  byte c[s]; 
  for(int i = 0; i < s; i++) 
    c[i] = (int)text.charAt(i);
  for (int i = 0; i < 256; i++) {
    if(i < s)
      buffer[i] = c[i];
    else 
      buffer[i] = 0;
  }
  writeEeprom(0x000000, buffer);
  delay(100);
}

void loop() {
  if(Serial.available() > -1) {
    if(!started) {
      Serial.println("#ready");
      started = true;
    }
    String c = Serial.readString();
    c.replace("\n", "");
    c.replace("\r", "");
    if(c == "e")
      blockErase(0x000000);
    else if(c == "r")
      readAdress(0x000000);
    else if(c.substring(0, 1) == "w") {
      String text = c.substring(2, c.length());
      writeString(text);
    }
  }
}
