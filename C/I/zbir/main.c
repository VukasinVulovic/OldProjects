#include <stdio.h>
#include <stdlib.h>

 main() {
 	
 	int b1, b2, res;//deklarisi promenljive
 	
	printf("BR1:");//ispisi poruku na konzolu
 	scanf("%d", &b1);//unetu vrednost dodeli promenljivoj br1
 	printf("BR2:");//ispisi poruku na konzolu
 	scanf("%d", &b2);//unetu vrednost dodeli promenljivoj br2

 	res = b1 + b2;//racunaj zbir br1 i br2

 	printf("Zbir: %d", res);//stampaj rezultat
	return res;
}
