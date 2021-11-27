document.body.style.backgroundColor = '#000000';
 class display {
   constructor(size=200, x=400, y=0) { //size = 200 x = 400 y = 0
     this.size = size;
     this.x = x;
     this.y = y;
     this.width = Math.floor(this.size);
     this.height = Math.floor(this.size/4);
     this.display_size = this.width*5 + (Math.floor((this.size*4) + (this.size/2)) + this.size*2)*4;
     this.segments = {
       0: { id: 'top', width: this.width, height: this.height, x: this.height + x, y: y },
       1: { id: 'left_top', width: this.height, height: this.width, x: x, y: this.height + y },
       2: { id: 'right_top', width: this.height, height: this.width, x: this.height + this.width + x, y: this.height + y },
       3: { id: 'middle', width: this.width, height: this.height, x: this.height + x, y: this.height + this.width + y },
       4: { id: 'left_bottom', width: this.height, height: this.width, x: x, y: (this.height*2) + this.width + y },
       5: { id: 'right_bottom', width: this.height, height: this.width, x: this.height + this.width + x, y: (this.height*2) + this.width + y },
       6: { id: 'bottom', width: this.width, height: this.height, x: this.height + x, y: (this.height*2) + (this.width*2) + y  }
     };
     this.sequence = {
       0: '1110111',
       1: '0010010',
       2: '1011101',
       3: '1011011',
       4: '0111010',
       5: '1101011',
       6: '1101111',
       7: '1010010',
       8: '1111111',
       9: '1111011'
     };
   }

   print(number1, number2) {
     if(number1.toString().length > 1) {
       this.number1 = parseInt(number1.toString().slice(0, 1));
       this.number2 = parseInt(number1.toString().slice(1, 2));
     } else {
       this.number1 = 0;
       this.number2 = parseInt(number1.toString().slice(0, 1));
     }

     if(number2.toString().length > 1) {
       this.number3 = parseInt(number2.toString().slice(0, 1));
       this.number4 = parseInt(number2.toString().slice(1, 2));
     } else {
       this.number3 = 0;
       this.number4 = parseInt(number2.toString().slice(0, 1));
     }

      for(let i = 0; i < 7; i++) {
        document.getElementById(this.segments[i].id + '_1').style.opacity = this.sequence[this.number1].slice(i, i+1);
        document.getElementById(this.segments[i].id + '_2').style.opacity = this.sequence[this.number2].slice(i, i+1);
        document.getElementById(this.segments[i].id + '_3').style.opacity = this.sequence[this.number3].slice(i, i+1);
        document.getElementById(this.segments[i].id + '_4').style.opacity = this.sequence[this.number4].slice(i, i+1);
      }
   }

   create() {
      for(let i = 0; i <= 6; i++) {
        new pill(this.segments[i].id + '_1', this.segments[i].width, this.segments[i].height, ((this.segments[i].width + this.segments[i].height)/8), this.segments[i].x, this.segments[i].y, 0, 'absolute', '#ff0000');
      }

      for(let i = 0; i <= 6; i++) {
        new pill(this.segments[i].id + '_2', this.segments[i].width, this.segments[i].height, 25, this.segments[i].x + this.size*2, this.segments[i].y, 0, 'absolute', '#ff0000');
      }

      new circle('dot1', this.height, Math.floor((this.width*4 + this.x*4) - this.width/4 + this.height/2), this.width, 1, 'absolute', '#ff0000');//this.width + this.height
      new circle('dot2', this.height, Math.floor((this.width*4 + this.x*4) - this.width/4 + this.height/2), this.width + this.height*2, 1, 'absolute', '#ff0000');//
      
      for(let i = 0; i <= 6; i++) {
        new pill(this.segments[i].id + '_3', this.segments[i].width, this.segments[i].height, Math.floor((this.segments[i].width + this.segments[i].height)/8), this.segments[i].x + Math.floor((this.size*4) + (this.size/2)), this.segments[i].y, 0, 'absolute', '#ff0000');
      }

      for(let i = 0; i <= 6; i++) {
        new pill(this.segments[i].id + '_4', this.segments[i].width, this.segments[i].height, 25, this.segments[i].x + Math.floor((this.size*4) + (this.size/2)) + this.size*2, this.segments[i].y, 0, 'absolute', '#ff0000');
      }
    }
}


let x = 0;
let y = 0;
let disp = new display(100, 0, 0);
disp.create();
setInterval(counter, 10);

 function counter() {
   let date = new Date();
   disp.print(date.getHours(), date.getMinutes());
}
