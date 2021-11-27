#include <stdio.h>
#include <stdlib.h>
int b1,b2,b3,b4,zbir;//deklarisanje promenljivih
float ars;

 main() {
 	
 	printf("Uneti br1 ");//ispisi poruku na konzolu
 	scanf("%d", &b1);//unetu vrednost dodeli promenljivoj br1
	printf("Uneti br2 ");//ispisi poruku na konzolu
	scanf("%d",&b2);//unetu vrednost dodeli promenljivoj br2
	printf("Uneti br3 ");//ispisi poruku na konzolu
	scanf("%d",&b3);//unetu vrednost dodeli promenljivoj br3
	printf("Uneti br4 ");//ispisi poruku na konzolu
	scanf("%d",&b4);//unetu vrednost dodeli promenljivoj br4
	
	zbir = b1 + b2 + b3 + b4;//racunaj zbir
	ars = zbir / 4;//racunaj aritmeticku sredinu
	
	printf("Zbir: %d", zbir);//ispisi rezultat
	printf(" ars: %.2f", ars);//ispisi rezultat
	return 0;
}
