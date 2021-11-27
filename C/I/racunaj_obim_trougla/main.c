#include <stdio.h>
int a, b, c, o;//deklarisi promenljive

int main() {
 	printf("UNESI 3 STRANICE! ");//ispisi poruku na konzolu
 	scanf("%d", &a);//unetu vrednost dodeliti promenljivoj a
 	scanf("%d", &b);//unetu vrednost dodeliti promenljivoj b
 	scanf("%d", &c);//unetu vrednost dodeliti promenljivoj c
 	
 	o = a + b + c;//promeljioj 0 dodeli zbir vrednonst promenljivih a, b, c
 	
	printf("Obim je: %d", o);//ispisi vrednost promenljive o 
	return 0;
}
