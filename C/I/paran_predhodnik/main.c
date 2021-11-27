#include <stdio.h>
#include <stdlib.h>
int broj = 0;//deklarisi promenljivu

 int main() {
 		
 	scanf("%d", &broj);//unetu vrednost dodeli promenljivoj broj
 	
	if(broj != 0) {//ako broj nije 0
  		if(broj < 0)//ako je broj manji od 0
			printf("predhodnik je %d ", broj-1);//ispisi rezultat
  		else//ako je broj veci od 0
  			printf("sledbenik je %d ", broj+1);//ispisi rezultat
    } else 	{
    	printf("broj je 0");
	}
	return 0;
}
