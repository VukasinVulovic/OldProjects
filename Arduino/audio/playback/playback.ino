#include <PCM.h>

const unsigned char sample[] PROGMEM = {
};

void setup()
{
  startPlayback(sample, sizeof(sample));
}

void loop()
{
}


