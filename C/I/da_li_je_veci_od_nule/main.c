#include <stdio.h>
#include <stdlib.h>
int broj = 0;//deklarisi promenljivu

 int main() {
 	
 	scanf("%d", &broj);//unetu vrednost dodeli promenljivoj broj
 	
 	if(broj != 0){//ako broj nije 0
  		if(broj < 0)//ako je broj manji od 0
  			printf("negativan");//ispisi poruku na konzolu
  		else//ako je broj veci od 0
  			printf("pozitivan");//ispisi poruku na konzolu
 	} else {//ako je broj 0
 		printf("broj je 0");//ispisi poruku na konzolu
 	}
	return 0;
}
