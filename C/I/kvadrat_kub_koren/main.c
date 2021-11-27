#include <stdio.h>
#include <stdlib.h>
#include <math.h>//potrebna promenljiva za funkciju sqrt
int broj,kv,kb,kor = 0;

 main() {

	printf("broj:");//ispisi poruku na konzolu
	scanf("%d", &broj);//unetu vrednost dodeliti promenljivoj broj
	
	kv = broj*broj;//racunaj kvadrat vrednosti promenljive broj
	kb = broj*broj*broj;//racunaj kub vrednosti promenljive broj
	kor = sqrt(broj);// racunaj koren vrednosti promenljive broj
	
	printf("%d %d %d", kv, kb, kor);//ispisi rezultate
	return 0;
}
