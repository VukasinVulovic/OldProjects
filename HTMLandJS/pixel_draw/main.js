 window.onload = function createCanvas() {    //creates the canvas in the middle

   this.canvas = document.createElement('canvas');
   this.canvas.setAttribute('style', 'position: fixed; width: 500px; height: 500px; background-color: #ffffff; left: ' + (window.innerWidth/2 - 250) + 'px; top: 10px; display: block;');
   document.body.appendChild(this.canvas);
   alreadyPainted();
   createPick();

  if(localStorage.getItem('pixelColor').length <= 0) {

    localStorage.setItem('pixelColor', '#000000');
 }
}

 function createPick() {    //creates the color picker
  for (this.i = 0; this.i <= 16; this.i++) {

    this.colors = ['#000000', '#333333', '#c4c4c4', '#ffffff', '#b80000', '#de6400', '#b84d00', ' #ffdd99', '#d8db00', '#1e9400', '#00943e', '#005e70', '#00144d', '#190047', '#6e04b0', '#82016f', '#c20619'];
    this.colorPick = document.createElement('button');
    this.colorPick.setAttribute('style', 'margin-left: 0; width: 50px; height: 50px; display: block; border: none; background-color: ' + this.colors[this.i] + ';');
    this.colorPick.value = this.colors[this.i]
    this.colorPick.setAttribute('onclick', 'localStorage.setItem("pixelColor", this.value), location.reload()');
    document.body.appendChild(this.colorPick);
 }
}

 function alreadyPainted() {   //loads already painted pixels
  $.get('http://localhost:3000/data', function (data) {

   if(data.x != undefined && data.y != undefined && data.colors != undefined) {

     this.drawnPixelsX = data.x.split(',').map(Number);
     this.drawnPixelsY = data.y.split(',').map(Number);
     this.pixelColor = data.colors.split(',').map(String);
  } else {

    this.drawnPixelsX = data.x.map(Number);
    this.drawnPixelsY = data.y.map(Number);
    this.pixelColor = data.colors.map(String);
 }

   for(this.i = 0; this.i <= this.drawnPixelsX.length-1; this.i++) {

     this.x = this.drawnPixelsX[this.i];
     this.y = this.drawnPixelsY[this.i];
     this.pColor = this.pixelColor[this.i+1];
     this.paint = document.createElement('div');
     this.paint.setAttribute('style', 'width: 4px; height: 4px; background-color: ' + this.pixelColor[this.i] + '; position: fixed;');
     this.paint.style.left = this.x + 'px';
     this.paint.style.top = this.y + 'px';
     document.body.appendChild(this.paint);
  }
 });
}

 window.onmousemove = function paint(e) {  //creates a paint element

  this.x = e.clientX - 2;
  this.y = e.clientY - 2;

 if(this.notPlaced == undefined) {

  this.notPlaced = true;
  this.move = true;
}

 if(document.body.contains(this.paint) && this.move) {
  if((window.innerWidth/2)+246 >= this.x && (window.innerWidth/2)-250 <= this.x && 10 <= this.y && (window.innerHeight/2)+53 >= this.y) {

    this.paint.style.left = this.x + 'px';
    this.paint.style.top = this.y + 'px';

  window.onclick = function placePaint() {   //place the painted pixel on a canvas and sends data

    sendJSON(this.paint.style.left.replace('px', ''), this.paint.style.top.replace('px', ''));
    this.notPlaced = false;
    this.move = false;
    }
   }
  } else if(this.notPlaced) {

   paintBrush();
 }

  function paintBrush() {

   this.paint = document.createElement('div');
   this.paint.setAttribute('style', 'width: 4px; height: 4px; background-color: ' + localStorage.getItem('pixelColor') + '; position: fixed; z-index:' + document.querySelectorAll('*').length+1);
   document.body.appendChild(this.paint);
 }
}

 function sendJSON(x,y) {   //communicates with a server
   $.get('http://localhost:3000/data', function (data) {

     this.X = data.x + '' + x + ',';
     this.Y = data.y + '' + y + ',';
     this.Colors = data.colors + '' + localStorage.getItem('pixelColor') + ',';
     this.myAdress = localStorage.getItem('myAdrr');
     this.date = new Date();
     setTimeout(function () { location.reload(); }, 100);

  if(this.X != undefined && this.Y != undefined) {
   //if(this.myAdress == this.date.getSeconds()) {

     //alert('Wait 1 minute!');
     location.reload();
//  } else {

   localStorage.setItem('myAdrr', this.date.getSeconds());
   $.post('http://localhost:3000/data', {

     x: this.X,
     y: this.Y,
     colors: this.Colors
    });
   }
  //}
 });
}

//HELLO FUTURE ME!
//THIS CODE IS SO TERRIBLE, IT'S PERFECT FOR HALOWEEN (WICH IS TOMORROW)
//MAKE ALREADY DRAWN PIXELS VISILE
//CONVERT A STRING TO AN ARRAY
//30.10.2019. - 1.11.2019
//By: Vukasin Vulovic
