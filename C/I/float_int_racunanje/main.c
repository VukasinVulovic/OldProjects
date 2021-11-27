#include <stdio.h>
#include <stdlib.h>
float br1, br2; 
int celi, deci;

 int main() {
	
	printf("Unesi reealan broj: ");//ispisi poruku na konzoli
	scanf("%f", &br1);//unetu vrednost dodeli promenljivoj br1
	
	celi = (int)br1;//pretvori promenljivu iz float u int
	deci = br1 - celi;//racunaj deci
	
	br2 = deci*100 + celi/100;//racunaj br2
	
	printf("%.2f", br2);//ispisi rezultat
	return 0;
}
