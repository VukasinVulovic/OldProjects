class Ball {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.options = {};
    this.balls = [];
  }

  create() {
    let ell = Bodies.circle(this.x, this.y, this.options.r, this.options);
    World.add(engine.world, ell);
    this.update();
    return ell;
  }

  // erase(arr) {
  //   arr.forEach(function(item) {
  //     World.remove(engine.world, item);
  //   });
  //   arr = [];
  //   return arr;
  // }

  update() {
    for(let i = 0; i < this.balls.length; i++) {
      noStroke();
      fill(this.balls[i].color);
      ellipseMode(RADIUS);
      ellipse(this.balls[i].position.x, this.balls[i].position.y, this.balls[i].r);
      rotate(this.balls[i].rotation);
    }
  }

  updateSliders() {

    this.options = {
      r: addSlider('R_slider', 0, 100, 100, 10, 0, 10, 10),
      torque: addSlider('t_slider', 0, 100, 100, 10, 0, 30, 0),
      restitution: addSlider('r_slider', 0.000, 1, 100, 10, 0, 50, 0.2),
      friction: addSlider('f1_slider', 0.000, 1, 100, 10, 0, 70, 0.002),
      frictionStatic: addSlider('f2_slider', 0.000, 1, 100, 10, 0, 90, 0.5),
      frictionAir: addSlider('f3_slider', 0.002, 1, 100, 10, 0, 110, 0.002),
      inertia: addSlider('i_slider', 0, 10000, 100, 10, 0, 130, 5000),
      mass: addSlider('m_slider', 0, 1000, 100, 10, 0, 150, 263),
      color: [randomNum(), randomNum(), randomNum(), 255]
    }

    addText('s_value', 'size= ' + this.options.r, 20, '#ff0000', 110, 0);
    addText('t_value', 'torque= ' + this.options.torque, 20, '#ff0000', 110, 20);
    addText('r_value', 'restitution= ' + this.options.restitution, 20, '#ff0000', 110, 40);
    addText('f1_value', 'friction= ' + this.options.friction, 20, '#ff0000', 110, 60);
    addText('f2_value', 'frictionStatic= ' + this.options.frictionStatic, 20, '#ff0000', 110, 80);
    addText('f3_value', 'frictionAir= ' + this.options.frictionAir, 20, '#ff0000', 110, 100);
    addText('i_value', 'inertia= ' + this.options.inertia, 20, '#ff0000', 110, 120);
    addText('m_value', 'mass= ' + this.options.mass, 20, '#ff0000', 110, 140);
  }
}
