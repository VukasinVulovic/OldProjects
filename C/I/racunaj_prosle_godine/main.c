#include <stdio.h>

int yyyy, god;//deklarisi promenljive

 int main() {
 	
 	printf("unesi godinu: ");//ispisi poruku na konzolu
 	scanf("%d", &yyyy);//unetu vrednost dodeli promenljivoj yyyy
 	
 	god = 2019 - yyyy;//dodeli izracunatu vredonst promenljivoj god
 	printf("rezultat: %d", god);//ispisi rezultat na konzolu
	return 88;
}
