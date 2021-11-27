#include <stdio.h>
int br1 = 12, //deklarisi promenljive
	br2 = 22,
	x = 0;
	
void main() {
	printf("%s", "broj1: ");//ispisi poruku na konzolu
	scanf("%d", &br1);//unetu vrednost dodeli promenljivoj br1
	printf("%s", "broj2: ");//ispisi poruku na konzolu
	scanf("%d", &br2);//unetu vrednost dodeli promenljivoj br2
	x = br1;//promanljivoj x dodaj vredonst promenljive br1
	
	while(x <= br2) {//dok je vrednost x manja ili vrednost br2
		printf("%d%s", x, " ");//ispisi x
		x++;//dodaj 1 na vrednost promenljive x2
	}
}
