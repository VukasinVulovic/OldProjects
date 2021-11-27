#include <stdio.h>
int dani;//deklarisi promenljive
int dd, mmm, yyyy;

 int main() {
 	
 	printf("broj dana: ");//ispisi poruku na konzolu
 	scanf("%d", &dani);//unetu vrednost dodeli promenljivoj dani 
	
	yyyy = dani/365;//racunaj broj godina
	mmm = (yyyy / 30) * 10;//racunaj broj meseci
	dd = (mmm/30);//racunaj broj dana
	printf("%s %d %s %d %s %d", "  dd: ", dd, "  mmm: ", mmm, "  yyyy: ", yyyy);//ispisi rezultate
		
	return 0;
}
