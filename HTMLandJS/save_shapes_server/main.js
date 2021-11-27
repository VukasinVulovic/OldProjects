devMode();
let map_data = {
  type: [],
  x: [],
  y: [],
  r: [],
  width: [],
  height: [],
  color: []
};

function setup() {
  loadMap();
  createCanvas(window.innerWidth/2, window.innerHeight);
}

addButton(false, 'SAVE', 'default', saveMap).style.zIndex = 10;
addButton(false, 'RAND', 'default', function () {
  set_temp_map(
    random(['ball', 'rectangle']), 
    random(0, 500), 
    random(0, 500),
    random(0, 10),
    random(0, 100),
    random(0, 100),
    [random(), random(), random()]
  );
}).style.zIndex = 10;

function loadMap() {
  receive('http://localhost:3000/map', (data) => {
    for(let i = 0; i < data.type.length; i++) {
      map_data.type.push(data.type[i]);
      map_data.x.push(data.x[i]);
      map_data.y.push(data.y[i]);
      map_data.r.push(data.r[i]);
      map_data.width.push(data.width[i]);
      map_data.height.push(data.height[i]);
      map_data.color.push(data.color[i]);
    }
    console.info('MAP LOADED!');
  });
}

function set_temp_map(type='ball', x=0, y=0, r=10, height=0, width=0, color=[255]) {
  map_data.type.push(type);
  map_data.x.push(x);
  map_data.y.push(y);
  map_data.r.push(r);
  map_data.width.push(width);
  map_data.height.push(height);
  map_data.color.push(color);
}

function saveMap() {
  transmit('http://localhost:3000/map', map_data, () => {
    console.info('MAP SAVED!');
    receive('http://localhost:3000/map', (data) => {
      console.log(data);
    });
  });
}

function loop() {
  if(map_data.type.length >= 0) {
    for(let i = 0; i < map_data.type.length; i++) {
      if(map_data.type[i] == 'rectangle') {
        rectangleEl(  
          map_data.x[i],
          map_data.y[i],
          map_data.width[i],
          map_data.height[i],
          0,
          map_data.color[i]
        );
      } else {
        circleEl(  
          map_data.x[i],
          map_data.y[i],
          map_data.r[i],
          0,
          map_data.color[i]
        );
      }
    }
  }
}