devMode();
loopSpeed(10);

let X=0, Y=0;
let ball, balls = [];
let rectangle, rectangles = [];
let element_type = 'rectangle';
let player;

let map_data = {
  player: {
    x: 100,
    y: 500,
    height: 50,
    width: 50,
    color: [205, 0, 55],
    options: {}
  },
  type: [],
  x: [],
  y: [],
  r: [],
  width: [],
  height: [],
  color: [],
  options: []
};

loadMap();

let ball_options = {
  r: 10,
  x: pointerX,
  y: pointerY,
  color: [255],
  properties: {
    restitution: 1,
    isStatic: false
  }
};

let rectangle_options = {
  height: 100,
  width: 10,
  x: 0,
  y: 0,
  color: [255],
  properties: {
    restitution: 0,
    density: 1,
    isStatic: true
  }
};

function setup() {
  runEngine();
  createCanvas();
  ball = new Ball();
  rectangle = new Rectangle();
  setTimeout(() => { 
    drawMapObjects();
    player = new Player(map_data.player.x, map_data.player.y, map_data.player.width, map_data.player.height);
    player.color = map_data.player.color;
  }, 400);
}
  
function loop() {
  refresh();

  if(player) {
    player.render();
  }

  ball_options.x = pointerX;
  ball_options.y = pointerY;

  rectangle_options.x = pointerX;
  rectangle_options.y = pointerY;

  if(WHEEL > 0) {
    element_type = 'rectangle';
  } else if(WHEEL < 0) {
    element_type = 'ball';
  }

  if(element_type == 'rectangle') {
    rectangleEl(
      rectangle_options.x - rectangle_options.width/2, 
      rectangle_options.y - rectangle_options.height/2,
      rectangle_options.width, 
      rectangle_options.height,
      0, 
      rectangle_options.color
    );
  } else {
    circleEl(
      ball_options.x, 
      ball_options.y, 
      ball_options.r,
      0, 
      ball_options.color
    );
  }

  if(balls.length > 0) {
    ball.update(balls);  
  }

  if(rectangles.length > 0) {
    rectangle.update(rectangles);  
  }
}

window.onkeydown = function () {
  if(KEY == 'e') {
    ball.erase(balls);
    rectangle.erase(rectangles);
  }
  if(KEY == 'i') {
    element_type = (element_type == 'ball') ? 'rectangle' : 'ball';
  }
  if(KEY == 's') {
    setTimeout(() => { 
      saveMap();
    }, 400);
  }
}

window.onclick = function () {
  create(element_type);
}

function loadMap() {
  receive('http://localhost:3000/map', (data) => {
    for(let i = 0; i < data.type.length; i++) {
      map_data.player.x = data.player.x;
      map_data.player.y = data.player.x;
      map_data.player.height = data.player.height;
      map_data.player.width = data.player.width;
      map_data.player.color = data.player.color;
      map_data.player.options = data.player.options;

      map_data.type.push(data.type[i]);
      map_data.x.push(data.x[i]);
      map_data.y.push(data.y[i]);
      map_data.r.push(data.r[i]);
      map_data.width.push(data.width[i]);
      map_data.height.push(data.height[i]);
      map_data.color.push(data.color[i]);
      map_data.options.push(data.options[i]);
    }
    console.info('MAP LOADED!');
  });
}

function saveMap() {
  transmit('http://localhost:3000/map', map_data, () => {
    console.info('MAP SAVED!');
    receive('http://localhost:3000/map', (data) => {
      console.table(data);
    });
  });
}

function create(shape) {
  switch(shape) {
    case 'ball':
      map_data.options.push(ball_options.properties);
      balls.push(
        ball.create(    
          ball_options.x,
          ball_options.y,
          ball_options.r,
          ball_options.color,
          ball_options.properties
        )
      );

    break;

    case 'rectangle':
      map_data.options.push(rectangle_options.properties);
      rectangles.push(
        rectangle.create(
          rectangle_options.x,
          rectangle_options.y,
          rectangle_options.width,
          rectangle_options.height,
          rectangle_options.color,
          rectangle_options.properties
        )
      );
    break;
  }
    map_data.type.push(shape);
    map_data.x.push(rectangle_options.x);
    map_data.y.push(rectangle_options.y);
    map_data.r.push(ball_options.r);
    map_data.width.push(rectangle_options.width);
    map_data.height.push(rectangle_options.height);
    map_data.color.push(rectangle_options.color);
}

function drawMapObjects() {
  if(map_data.type.length >= 0) {
    for(let i = 0; i < map_data.type.length; i++) {
      switch(map_data.type[i]) {
        case 'ball':
          balls.push(
            ball.create(    
              map_data.x[i],
              map_data.y[i],
              map_data.r[i],
              map_data.color[i],
              map_data.options[i]
            )
          );
        break;
        case 'rectangle':
          rectangles.push(
            rectangle.create(
              map_data.x[i],
              map_data.y[i],
              map_data.width[i],
              map_data.height[i],
              map_data.color[i],
              map_data.options[i]
            )
          );
        break;
      }
    }
  }
}

