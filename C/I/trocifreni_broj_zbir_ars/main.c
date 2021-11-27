#include <stdio.h>
#include <stdlib.h>
int broj, j, d, s, zbir;//deklarisi promenljive
float ars;

 main() {
 	printf("unesi trocifreni broj: ");//ispisi poruku na konzolu
 	scanf("%d", &broj);//unetu vrednost dodeli promenljivoj broj
 	
 	s = (broj / 100);//racunaj stotinu
 	d = (broj % 100)/10;//racunaj desteticu
 	j = (broj % 100)%10;//racunaj jedinicu 
	zbir = s + d + j;//racunaj zbir 
	ars = zbir/3;//racunaj aritmeticku sredinu
	
	printf("zbir je %d, ars je %.2f", zbir, ars);//ispisi zbir iz ars	
	return 0;
}
