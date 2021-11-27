#include <stdio.h>
#include <stdlib.h>
int broj = 0;//deklarisi promenljivu

 int main() {
 		
 	scanf("%d", &broj);//unetu vrednost dodeli promenljivoj broj
 	
  	if(broj%2 == 0)//ako je broj paran
		printf("broj je paran");//ispisi poruku na konzolu
  	else//ako je broj neparan
  		printf("broj je neparan");//ispisi poruku na konzolu
		
	return 0;
}
