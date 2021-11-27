class Ball {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.options = {
      r: 10,
      color: [255]
    }
  }
  create(x=0, y=0, r=10, color=[255], opt={}) {
    this.x = x;
    this.y = y;
    this.options = {
      r: r,
      color: color,
    }
    let ell = Bodies.circle(this.x, this.y, this.options.r, Object.assign(this.options, opt));
    World.add(engine.world, ell);
    this.update();
    return ell;
  }
  erase(arr) {
    if(arr[arr.length-1] != undefined) {
      World.remove(engine.world, arr[arr.length-1]);
      arr.pop();
      map_data.type.pop();
      map_data.x.pop();
      map_data.y.pop();
      map_data.r.pop();
      map_data.width.pop();
      map_data.height.pop();
      map_data.color.pop();
      map_data.options.pop();
    }
  }
  update(arr = []) {
    for(let i = 0; i < arr.length; i++) {
      circleEl(arr[i].position.x, arr[i].position.y, arr[i].r, arr[i].angle, arr[i].color);
    }
  }
}

class Rectangle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.options = {
      width: 10,
      height: 100,
      color: [255],
      friction: 0,
      restitution: 0
    }
  }
  create(x=0, y=0, width=10, height=100, color=[255], opt={}) {
    this.x = x;
    this.y = y;
    this.options = {
      width: width,
      height: height,
      color: color,
      friction: 0.7
    }
    let ell = Bodies.rectangle(this.x, this.y, this.options.width, this.options.height, Object.assign(this.options, opt));
    World.add(engine.world, ell);
    this.update();
    return ell;
  }
  erase(arr) {
    if(arr[arr.length-1] != undefined) {
      World.remove(engine.world, arr[arr.length-1]);
      arr.pop();
      map_data.type.pop();
      map_data.x.pop();
      map_data.y.pop();
      map_data.r.pop();
      map_data.width.pop();
      map_data.height.pop();
      map_data.color.pop();
      map_data.options.pop();
    }
  }
  update(arr = []) {
    for(let i = 0; i < arr.length; i++) {
      rectangleEl(arr[i].position.x - (arr[i].width/2), arr[i].position.y - (arr[i].height/2), arr[i].width, arr[i].height, arr[i].angle, arr[i].color);
    }
  } 
}
  