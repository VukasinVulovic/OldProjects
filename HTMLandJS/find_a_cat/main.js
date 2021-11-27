const audio = new Audio();
let x, y, image='', win_continue=true;
startButton();

 function startButton() {

   this.button = document.createElement('a');
   document.body.appendChild(this.button);
   this.button.setAttribute('class', 'start_button');
   this.button.setAttribute('onclick', 'startGame(), displayScore(), this.style.display = "none"');
   this.button.innerHTML = 'START';

   if(localStorage.getItem('game_score') == undefined) {

      localStorage.setItem('game_score', 0);
   }
}

 function displayScore() {

  if(this.scr == undefined) {

   this.scr = document.createElement('a');
   document.body.appendChild(this.scr);
   this.scr.setAttribute('class', 'score');
   }

   this.scr.innerHTML = 'Score: ' + localStorage.getItem('game_score');
   setTimeout(displayScore, 100);
}

 function startGame() {

   if(image != '') {

     image.style.display = 'none';
   }
   audio.src = 'bin\\sources\\find.mp3';
   audio.loop = true;
   audio.currentTime = 0;
   win_continue = true;
   createCat();
}

 function createCat() {

   if(this.cat == undefined) {

     this.cat = document.createElement('div');
     document.body.appendChild(this.cat);
     this.cat.innerHTML = '(:';
     this.cat.setAttribute('class', 'cat');
     this.cat.setAttribute('onclick', 'catFound()');
   }

   x = Math.floor(Math.random() * ((window.innerWidth - 10) - 0) + 0);
   y = Math.floor(Math.random() * ((window.innerHeight - 10) - 0) + 0);

   this.cat.style.left = x + 'px';
   this.cat.style.top = y + 'px';
}

 window.onmousemove = function proxDetection(e) {

   this.x = Math.abs(e.clientX - (x + 50));
   this.y = Math.abs(e.clientY - (y + 50));


   if((this.x < 10 + window.innerWidth/8) && (this.y < 10 + window.innerHeight/4) && win_continue) {

     audio.volume = (((this.x - 220) * (1 - 0.1) / (0 - 220) + 0.1) + ((this.y - 220) * (1 - 0.1) / (0 - 220) + 0.1))/2;
     audio.playbackRate = (((this.x - 220) * (2 - 1) / (0 - 220) + 1) + ((this.y - 220) * (2 - 1) / (0 - 220) + 1))/2;
     audio.play();
   } else {

     audio.pause();
     audio.currentTime = 0;
   }
}

 function catFound() {
   if(win_continue) {

     if(image == '') {

       image = document.createElement('img');
       document.body.appendChild(image);
     }

     audio.pause();
     win_continue = false;
     this.temp_score = localStorage.getItem('game_score');
     localStorage.setItem('game_score', parseInt(this.temp_score) + 1);
     image.style.display = 'block';
     image.src = 'bin\\sources\\cat_frame0.png';
     image.setAttribute('style', 'position: absolute;');
     image.style.left = x + 'px';
     image.style.top = y + 'px';
     imageAnimation();
 }
}

 function imageAnimation() {

   if(this.i == undefined) {

     this.i = 0;
   }

   if(this.i < 200) {

     if(x > window.innerWidth/2) {

       image.style.left = x - 200 + 'px';
     }

     if(y > window.innerHeight/2) {

       image.style.top = y - 200 + 'px';
     }

     image.style.width = this.i + 'px';
     image.style.height = this.i + 'px';
     this.i += 4;
     setTimeout(imageAnimation, 4);
   } else {

     setTimeout(function () {

       image.src = 'bin\\sources\\cat_frame1.png';
       audio.src = 'bin\\sources\\cat.mp3';
       audio.loop = false;
       audio.play();
       this.i = 0;
     }, 1000);
     setTimeout(startGame, 2000);
   }
}
