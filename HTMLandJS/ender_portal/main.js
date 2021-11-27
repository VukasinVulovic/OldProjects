document.body.style.overflow = 'hidden';
document.body.style.cursor = 'none';
let canvas;
let particle_array = [];
let portal_config = {
    x: 0,
    y: 0,
    width: window.innerWidth*4,
    height: window.innerHeight*4
}

window.onmousemove = () => {
    let x = pointerX - (WIDTH/2);
    let y = pointerY - (HEIGHT/2);
    canvas.style.left = `${x}px`;
    canvas.style.top = `${y}px`;
}

function setup() {    
    canvas = createCanvas(portal_config.width, portal_config.height, portal_config.x, portal_config.y, [0]); 
    for(let i = 0; i < 5000; i++) {
        particle_array.push(new Particle());
    }
}

function loop() {
    refresh();
    for(let i = 0; i < particle_array.length; i++) {
        particle_array[i].render(particle_array, i);
    }
}

class Particle {
    constructor() {
        this.width = portal_config.width;
        this.height = portal_config.height;
        this.dir = random([-1, 1]);
        this.speed = random(90, 120);
        this.x = random(0, this.width);
        this.y = random(0, this.height);
        this.w = random(1, 2);
        this.h = random(1, 2);
        this.intensity = [random(0, 100), 100, 255];
        this.move = random([true, false]);
    } 
    render(particle_array, i) {
        if(this.x <= this.width-4 && this.x >= 0) {
        } else {
            this.dir = -this.dir;
        }
        rectangleEl(this.x, this.y, this.w, this.h, 0, this.intensity);
        if(this.move) {
            this.x += this.dir*(this.speed/100);
        }
    } 
}