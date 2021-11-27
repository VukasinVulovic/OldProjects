 window.onload = function paint() {
   for(this.i = 0; this.i <= 100*100; this.i++) {

  if(this.x == undefined) {

    this.x = 6;
    this.y = 4;
    this.m = 1;
  } else {

    this.x += 6;
  }

    this.paint = document.createElement('span');
    document.body.appendChild(this.paint);
    this.paint.setAttribute('style', 'display: block; width: 4px; height: 4px; position: absolute; border-radius: 2px; border: none; background-color: #FF0000; opacity: 0.2;');
    this.paint.setAttribute('id', 'id-' + this.i);
    this.paint.setAttribute('onclick', 'console.log(this.id), paintPixel(document.getElementById(this.id))');
    this.paint.style.top = this.x - (window.innerHeight/2)+300 + 'px';
    this.paint.style.left = this.y + (window.innerWidth/2)-300 + 'px';

  if(this.i >= 100*this.m) {

    this.m ++;
    this.x = 0;
    this.y += 6;
  }
 }
}

 function paintPixel(id) {
  if(id.style.opacity == 0.2) {

     id.style.opacity = 1;
   } else {

     id.style.opacity = 0.2;
 }
}
