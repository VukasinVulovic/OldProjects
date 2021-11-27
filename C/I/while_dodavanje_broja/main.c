#include <stdio.h>
#include <stdlib.h>

main() {
	int br, zbir = 0;//deklarisi promenljive
	printf("Upisi prvi broj:");//ispisi poruku na konzolu
	scanf("%d", &br);//dodeli vrednost unetog broja, promenljivoj br
	
	while(br != 0) {//dok je vrednost promenljive br veca od 0
		zbir += br;//dodaj vrednost promenljive br na vrednost promenljive zbir
		printf("Upisi novi broj:");//ispisi poruku na konzolu
		scanf("%d", &br);//dodeli vrednost unetog broja, promenljivoj br
	}
	
	printf("\n Zbir je: %d", zbir);//ako je broj manji od 0, ispisi vrednost promenljive zbir
}

