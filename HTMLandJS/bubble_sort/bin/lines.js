 class Lines {
   constructor(number, width, maxHeight) {
     this.number = number;
     this.maxHeight = maxHeight;
     this.height = [];
     this.width = width;
     this.color = [];
     this.x = [];
     this.y = 0;
     this.loops = 0;
   }

   create () {
     for(let i = 0; i < this.number; i++) {
       this.current_height = random(10, window.innerHeight/2);
       this.x.push(i*this.width);
       this.height.push(this.current_height);
     }
}

  checkSize () {
    for(let i = 1; i <= this.number; i++) {
      if(this.height[i] > this.height[i-1]) {
        let temp = this.height[i];
        this.height[i] = this.height[i-1];
        this.height[i-1] = temp;
        rectangle('scanner1', this.width, this.height[i], this.x[i], this.y, 1, '#ff0000');
        rectangle('scanner2', this.width, this.height[i-1], this.x[i-1], this.y, 1, '#00ff00');
      }
        rectangle(i-1, this.width, this.height[i-1], this.x[i-1], this.y, 0, '#ffffff');
    }
  }
}