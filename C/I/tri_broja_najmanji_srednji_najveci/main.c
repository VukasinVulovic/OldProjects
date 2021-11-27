#include <stdio.h>
#include <stdlib.h>
int br1,//deklarisanje globalnih promenljivih
	br2,
	br3,
	min,
	sre,
	max;

main() {
	printf("Unesi tri broja:\n");//napisi ovo na konzolu
	scanf("%d%d%d", &br1, &br2, &br3);//stavi vrednosti koje je korisnik uneo, u promenljive
	if(br1 != br2 && br2 != br3 && br3 != br2) {//da li su vrednosti promenljivih drugacije
		//max
		max = br1;//promenljivoj max se dodaje vrednsot br1 
		if(br2 > max)//ako je br2 vece od max
			max = br2;//promenljiva max dobija vrednost promenljive br2 
		if(br3 > max)//ako je br3 vece od max 
			max = br3;//promenljiva max dobija vrednost promenljive br3
		//min
		min = br1;//promenljivoj min se dodaje vrednsot br1 
		if(br2 < min)//ako je br2 manja od min
			min = br2;//promenljiva min dobija vrednost promenljive br2 
		if(br3 < min)//ako je br3 manja od min
			min = br3;//promenljiva min dobija vrednost promenljive br3 
		sre = (br1 + br2 + br3) - (min + max);//izracunaj srednju vrednost
		printf("\n %d < %d < %d", min, sre, max);//ispisi vrednost promenljivih min, sre i max
	} else {//ako su promenljive br1, br2 i br3 iste
		printf("Ne.");//ispisi Ne. na konzolu
	}
}
