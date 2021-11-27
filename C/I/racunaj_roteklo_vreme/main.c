#include <stdio.h>
#include <stdlib.h>
int dd, mm, yy, prot_dana, prot_god;//deklarisi globalne promenljive 

int main() {
	
	printf("%s", "Dan: ");//ispisi poruku na konzolu
	scanf("%d", &dd);//unetu vrednsot dodeli promenljivoj dd
	
	printf("%s", "Mesec: ");//ispisi poruku na konzolu
	scanf("%d", &mm);//unetu vrednsot dodeli promenljivoj mm
	
	printf("%s", "God: ");//ispisi poruku na konzolu
	scanf("%d", &yy);//unetu vrednsot dodeli promenljivoj yy
	
	if(yy >= 2020) {//ako je vrednost promenljive yy veca od ili 2020
		prot_god = yy - 2020;//oduzmi 2020 od vrednosti yy
		prot_dana = (mm - 1) * 30 + (dd - 1);//izracunaj broj dana
	} else {//ako je vrednost promenljive yy manja od 2020
		prot_god = 2019 - yy;//oduzmi vrednost yy od 2020
		prot_dana = (12 - mm) * 30*2 - (dd + 1);//izracunaj broj dana
	}
	
	printf("%s %d", "Protekla godina: ", prot_god);//ispisi broj proteklih godina
	printf("%s %d", "\n Protekli dani: ", prot_dana);//ispisi broj proteklih dana
	
	return 0;
}
