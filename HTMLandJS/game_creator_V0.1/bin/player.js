class Player {
    constructor(startX=0, startY=0, width=105, height=100) {
        this.x = startX;
        this.y = startY;
        this.color = [255];
        this.options = {};
        this.height = height;
        this.width = width;
        this.element = {};
        this.create();
    }

    create() {
        this.element = Bodies.rectangle(this.x, this.y, this.width, this.height, this.options);
        World.add(engine.world, this.element);
        this.render();
    }

    render() {
        this.x = this.element.position.x - this.width/2;
        this.y = this.element.position.y - this.height/2;
        rectangleEl(this.x, this.y, this.width, this.height, this.element.angle, this.color);
    }

    move(speed_direction=0.05) {
            let movement = {x: speed_direction, y: 0};
            Body.applyForce(this.element, {x: this.element.position.x, y: this.element.position.y}, movement);
    }

    jump(strength=0.1) {
        let movement = {x: 0, y: -strength};
        Body.applyForce(this.element, {x: this.element.position.x, y: this.element.position.y}, movement);
    }
}
setInterval(playerControls, 10);

function playerControls() {
    if(ASCII == 39) {
        player.move(0.001);
    }
    if(ASCII == 37) {
        player.move(-0.001);
    }
    if(ASCII == 38) {
        player.jump(0.003);
        player.move(0.0001);
    }
    if(ASCII == 40) {
        player.jump(-0.003);
        player.move(-0.0001);
    }
}