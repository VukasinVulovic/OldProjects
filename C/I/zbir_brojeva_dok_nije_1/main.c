#include <stdio.h>
#include <stdlib.h>

void main() {
	int x = 0, //deklarisi promenljive
		zbir = 0,
		i = 0;
		
	printf("Unesi neki broj: ");//ispisi poruku na konzolu
	scanf("%d", &x);//Unetu vrednsot dodeli promenljivoj x
	
	while(x != 1) {//dok x nije 1
		
		zbir += x;//promenljivoj zbir dodaj vrendost promenljive x
		i++;//daodaj 1 na vrednsot promenljive i
		
		printf("Unesi neki broj: ");//ispisi poruku na konzolu
		scanf("%d", &x);//Unetu vrednsot dodeli promenljivoj x
		
	}
	printf("%s %d %s %d", "zbir ", i, " brojeva je ", zbir);//ispisi zbir
}
