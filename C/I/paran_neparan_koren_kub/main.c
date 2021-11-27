#include <stdio.h>
#include <stdlib.h>
int input;//deklaracija globalne promenljive "input"

main() {
	printf("Unesi neki broj: ");//ispisi poruku na konzolu
	scanf("%d", &input);//procitaju unesen broj
	while(input > 0) {//dok je promenljiva "input" veca od 0
		printf("%.2f \n", (input%2 == 0) ? sqrt(input) : (input*input*input));//ispisi koren broja, ako je paran ili kvadrat, ako je neparan
		printf("Unesi neki broj, ponovo: ");//ispisi poruku na konzolu
		scanf("%d", &input);//procitaju unesen broj
	}
}
