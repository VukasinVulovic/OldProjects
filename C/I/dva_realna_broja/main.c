#include <stdio.h>
#include <stdlib.h>
float x, y, rez, min, max;//deklarisi promenljive

int main() {
	
	printf("Unesi dva realna broja: ");//ispisi poruku na konzolu
	scanf("%f %f", &x, &y);//dodeli unete vrednosti promenljivoj x i y 
	
	min = (x<y) ? x : y;//ako je x manje od y, promenljiva min dobija vrednost x; ako je vece, dobija vrednost y 
	max = (x>y) ? x : y;//ako je x vece od y, promenljiva max dobija vrednost x; ako je manje, dobija vrednost y
	
	rez = (min + 0.5)/(1 + (max*max));//izracunaj rezultat
	
	printf("rezultat je: %f", rez);//ispisi rezultat na konzolu
	return 420;
}
