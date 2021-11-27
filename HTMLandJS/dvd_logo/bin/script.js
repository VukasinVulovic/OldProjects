let x = 0; 
let y = 0; 
let wayX = 1;
let wayY = 1;
let color = 0; 
let imageEl;
createImg();
startPos();
setTimeout(Move, 100);

 function createImg() {

	this.el = document.createElement('img');
	this.el.setAttribute('id', 'image');
	this.el.src = 'bin/dvd_logo.png';
	document.body.appendChild(this.el);
}

 function startPos() {
	  
	imageEl = document.getElementById('image');
	x = Math.round(Math.random() * (400 - 160) + 400);
	y = Math.round(Math.random() * (600 - 200) + 600);
	imageEl.style.top = x + 'px';
	imageEl.style.left = y + 'px';
	changeColor();
}
 
 function Move() {
	 
	x += wayX;
	y += wayY;
	if(x >= window.innerHeight - 160) { wayX = -1; changeColor(); }
	if(x <= 0) { wayX = 1; changeColor(); }
	if(y >= window.innerWidth - 200) { wayY = -1; changeColor(); }
	if(y <= 0) { wayY = 1; changeColor(); }
	imageEl.style.top = x + 'px';
	imageEl.style.left = y + 'px';	
	setTimeout(Move, 4);
}

 function changeColor() {

   color = Math.round(Math.random() * (360 - 0) + 360);
   imageEl.style.filter = 'hue-rotate(' + color + 'deg)';
}
 