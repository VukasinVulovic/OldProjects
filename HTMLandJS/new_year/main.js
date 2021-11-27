document.body.style.backgroundColor = '#000000';
let countDownDate = new Date("Aug 25, 2020 20:25:00").getTime(), now, hours, minutes, seconds, display = true;
const spacing = 150, spacing2 = 980, spacing3 = 1380;
let segments = {
  0: { id: 'top', width: 200, height: 50, x: 50, y: 0 },
  1: { id: 'left_top', width: 50, height: 200, x: 0, y: 50 },
  2: { id: 'right_top', width: 50, height: 200, x: 250, y: 50 },
  3: { id: 'middle', width: 200, height: 50, x: 50, y: 250 },
  4: { id: 'left_bottom', width: 50, height: 200, x: 0, y: 300 },
  5: { id: 'right_bottom', width: 50, height: 200, x: 250, y: 300 },
  6: { id: 'bottom', width: 200, height: 50, x: 50, y: 500 }
};//75220

createDisplayMin();
createDisplaySec();
checkTime();

 function createDisplayMin() {
   for(this.i = 0; this.i <= 6; this.i++) {

     new pill(segments[this.i].id + '_1', segments[this.i].width, segments[this.i].height, ((segments[this.i].width + segments[this.i].height)/8), segments[this.i].x, segments[this.i].y, 0, 'absolute', color='#ff0000');
   }

   for(this.i = 0; this.i <= 6; this.i++) {

     new pill(segments[this.i].id + '_2', segments[this.i].width, segments[this.i].height, 25, segments[this.i].x + segments[5].x + spacing, segments[this.i].y, 0, 'absolute', color='#ff0000');
   }
}

 new circle('circle_1', 60, (window.innerWidth/2) - 24, (segments[1].y + segments[2].height) - 100, 1, 'absolute', color='#ff0000');
 new circle('circle_2', 60, (window.innerWidth/2) - 24, (segments[1].y + segments[2].height) + 150, 1, 'absolute', color='#ff0000');

 function createDisplaySec() {

  for(this.i = 0; this.i <= 6; this.i++) {

    new pill(segments[this.i].id + '_3', segments[this.i].width, segments[this.i].height, ((segments[this.i].width + segments[this.i].height)/8), segments[this.i].x + spacing2, segments[this.i].y, 0, 'absolute', color='#ff0000');
  }

  for(this.i = 0; this.i <= 6; this.i++) {

    new pill(segments[this.i].id + '_4', segments[this.i].width, segments[this.i].height, 25, segments[this.i].x + spacing3, segments[this.i].y, 0, 'absolute', color='#ff0000');
  }
}

 function decodeNumber(number, display_select) {
   switch (number) {

     case 0:
     document.getElementById('top_' + display_select).style.opacity = 1;
     document.getElementById('left_top_' + display_select).style.opacity = 1;
     document.getElementById('right_top_' + display_select).style.opacity = 1;
     document.getElementById('middle_' + display_select).style.opacity = 0;
     document.getElementById('left_bottom_' + display_select).style.opacity = 1;
     document.getElementById('right_bottom_' + display_select).style.opacity = 1;
     document.getElementById('bottom_' + display_select).style.opacity = 1;
     break;

     case 1:
     document.getElementById('top_' + display_select).style.opacity = 0;
     document.getElementById('left_top_' + display_select).style.opacity = 0;
     document.getElementById('right_top_' + display_select).style.opacity = 1;
     document.getElementById('middle_' + display_select).style.opacity = 0;
     document.getElementById('left_bottom_' + display_select).style.opacity = 0;
     document.getElementById('right_bottom_' + display_select).style.opacity = 1;
     document.getElementById('bottom_' + display_select).style.opacity = 0;
     break;

     case 2:
     document.getElementById('top_' + display_select).style.opacity = 1;
     document.getElementById('left_top_' + display_select).style.opacity = 0;
     document.getElementById('right_top_' + display_select).style.opacity = 1;
     document.getElementById('middle_' + display_select).style.opacity = 1;
     document.getElementById('left_bottom_' + display_select).style.opacity = 1;
     document.getElementById('right_bottom_' + display_select).style.opacity = 0;
     document.getElementById('bottom_' + display_select).style.opacity = 1;
     break;

     case 3:
     document.getElementById('top_' + display_select).style.opacity = 1;
     document.getElementById('left_top_' + display_select).style.opacity = 0;
     document.getElementById('right_top_' + display_select).style.opacity = 1;
     document.getElementById('middle_' + display_select).style.opacity = 1;
     document.getElementById('left_bottom_' + display_select).style.opacity = 0;
     document.getElementById('right_bottom_' + display_select).style.opacity = 1;
     document.getElementById('bottom_' + display_select).style.opacity = 1;
     break;

     case 4:
     document.getElementById('top_' + display_select).style.opacity = 0;
     document.getElementById('left_top_' + display_select).style.opacity = 1;
     document.getElementById('right_top_' + display_select).style.opacity = 1;
     document.getElementById('middle_' + display_select).style.opacity = 1;
     document.getElementById('left_bottom_' + display_select).style.opacity = 0;
     document.getElementById('right_bottom_' + display_select).style.opacity = 1;
     document.getElementById('bottom_' + display_select).style.opacity = 0;
     break;

     case 5:
     document.getElementById('top_' + display_select).style.opacity = 1;
     document.getElementById('left_top_' + display_select).style.opacity = 1;
     document.getElementById('right_top_' + display_select).style.opacity = 0;
     document.getElementById('middle_' + display_select).style.opacity = 1;
     document.getElementById('left_bottom_' + display_select).style.opacity = 0;
     document.getElementById('right_bottom_' + display_select).style.opacity = 1;
     document.getElementById('bottom_' + display_select).style.opacity = 1;
     break;

     case 6:
     document.getElementById('top_' + display_select).style.opacity = 1;
     document.getElementById('left_top_' + display_select).style.opacity = 1;
     document.getElementById('right_top_' + display_select).style.opacity = 0;
     document.getElementById('middle_' + display_select).style.opacity = 1;
     document.getElementById('left_bottom_' + display_select).style.opacity = 1;
     document.getElementById('right_bottom_' + display_select).style.opacity = 1;
     document.getElementById('bottom_' + display_select).style.opacity = 1;
     break;

     case 7:
     document.getElementById('top_' + display_select).style.opacity = 1;
     document.getElementById('left_top_' + display_select).style.opacity = 0;
     document.getElementById('right_top_' + display_select).style.opacity = 1;
     document.getElementById('middle_' + display_select).style.opacity = 0;
     document.getElementById('left_bottom_' + display_select).style.opacity = 0;
     document.getElementById('right_bottom_' + display_select).style.opacity = 1;
     document.getElementById('bottom_' + display_select).style.opacity = 0;
     break;

     case 8:
     document.getElementById('top_' + display_select).style.opacity = 1;
     document.getElementById('left_top_'+ display_select).style.opacity = 1;
     document.getElementById('right_top_' + display_select).style.opacity = 1;
     document.getElementById('middle_'+ display_select).style.opacity = 1;
     document.getElementById('left_bottom_' + display_select).style.opacity = 1;
     document.getElementById('right_bottom_' + display_select).style.opacity = 1;
     document.getElementById('bottom_' + display_select).style.opacity = 1;
     break;

     case 9:
     document.getElementById('top_' + display_select).style.opacity = 1;
     document.getElementById('left_top_' + display_select).style.opacity = 1;
     document.getElementById('right_top_' + display_select).style.opacity = 1;
     document.getElementById('middle_' + display_select).style.opacity = 1;
     document.getElementById('left_bottom_' + display_select).style.opacity = 0;
     document.getElementById('right_bottom_' + display_select).style.opacity = 1;
     document.getElementById('bottom_' + display_select).style.opacity = 1;
     break;
   }
}

 function checkTime() {
  if(display) {

   now = new Date().getTime();

   hours = Math.floor(((countDownDate - now) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   minutes = Math.floor(((countDownDate - now) % (1000 * 60 * 60)) / (1000 * 60));
   seconds = Math.floor(((countDownDate - now) % (1000 * 60)) / 1000);

   console.log('Time left: ' + hours + ', ' + minutes + ', ' + seconds);

   if(minutes.toString().length > 1) {

     this.minute_1 = parseInt(minutes.toString().slice(0, 1));
     this.minute_2 = parseInt(minutes.toString().slice(1, 2));
   } else {

     this.minute_1 = 0;
     this.minute_2 = parseInt(minutes.toString().slice(0, 1));
   }

   if(seconds.toString().length > 1) {

     this.second_1 = parseInt(seconds.toString().slice(0, 1));
     this.second_2 = parseInt(seconds.toString().slice(1, 2));
   } else {

     this.second_1 = 0;
     this.second_2 = parseInt(seconds.toString().slice(0, 1));
   }

   decodeNumber(this.minute_1, 1);
   decodeNumber(this.minute_2, 2);
   decodeNumber(this.second_1, 3);
   decodeNumber(this.second_2, 4);

   new soundEffect('bin//sources//tick.mp3');

   if(hours == 0 && minutes == 1 && seconds == 15) {


     new soundEffect('bin//sources//crabs.mp3');
   }

   if(hours == 0 && minutes == 0 && seconds == 0) {

     console.log('Happy new year!');
     display = false;

     for(this.i = 0; this.i < (7*4) + 2; this.i ++) {

        document.body.removeChild(document.querySelector('div'));
     }
	   fun();
   }

  setTimeout(checkTime, 1000);
 }
}

 // addButton('', 'START', 'default', fun);

 function fun() {

   new firework();
   setTimeout(fun, 2000);
};

 function firework() {

   if(document.getElementById('image_1') != undefined) {
     for(this.i = 0; this.i <= 100; this.i ++) {

       document.body.removeChild(document.getElementById('image_' + this.i));
     }
   }

   for(this.i = 0; this.i <= 100; this.i ++) {

     this.object = addImage('image_' + this.i, 'bin//sources//fireworks.gif', 'width: 100px; height: 100px;');
     this.object.style.position = 'absolute';
     this.object.style.left = random(100, window.innerWidth - 100) + 'px';
     this.object.style.top = random(100, window.innerHeight - 100) + 'px';
     this.object.style.filter = 'hue-rotate(' + random() + 'deg)';
   }
}
