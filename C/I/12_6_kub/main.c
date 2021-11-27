#include <stdio.h>
#include <stdlib.h>
int a, izlaz, o, p, v;//deklarisi promenljive

 main() {
	
	printf("koliko je a: ");//ispisi poruku na konzolu
	scanf("%d", &a);//unetu vrednost dati promenljivoj a
	
	o = 12*a;//racunaj 12 puta vrednost a
	p = 6*a*a;//racunaj 6 puta vrednost a
	v = a*a*a;//racunaj kub vrednosti a
	
	printf("REZULTATI: %d %d %d", o, p, v);
	return 0; 
}
