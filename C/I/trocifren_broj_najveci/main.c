#include <stdio.h>
#include <stdlib.h>
int broj, sto, des, jed, najveci;//deklarisi promenljive

int main() {
	
	printf("Unesi neki trocifreni broj:");//ispisi poruku na konzolu
	scanf("%d", &broj);//unetu vrednst, dodeli promenljivoj broj
	
	sto = broj/100;//stotina
	jed = broj%10;//desetica
	des = (broj%100)/10;//jedinica
		
	najveci = jed;//dodeli vrednost promenljive jed, promenljivoj najveci
	
	if(najveci < des) {//ako je vrednost promenljive najveci manja od vrednosti promenljive des
		najveci = des;//dodeli vrednost promenljive des, promenljivoj najveci
	}
	
	if(najveci < sto) {//ako je vrednost promenljive najveci manja od vrednosti promenljive sto
		najveci = sto;//dodeli vrednost promenljive sto, promenljivoj najveci
	}

	printf("%s %d", "Najveci je:", najveci);//ispisi poruku na konzolu
	
	return 0;
}
