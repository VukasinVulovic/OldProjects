devMode();
let capture_client = {video: 0, audio: 0};
let compressed_image = [];
let data_recognized = '';
let data_recognized_prev = '-';
let processing_canvas = process_canvas(100, 100);
let write = false;
let pixel_size = 10;
let size = {
  width: 20,
  height: 20
}

addButton('speak', 'speak', 'default', () => {
  recognize((data) => {
    data_recognized = data;
  });
});


window.onclick = () => {
  write = true;
}

function process_canvas(width, height) {
  let canvas = Element('canvas');
  canvas.style.display = 'none';
  canvas.width = width;
  canvas.height = height;
  canvas = canvas.getContext('2d');
  return canvas;
}

function setup() {
    createCanvas(size.width*10, size.height*10, 0, 0, [50]);
    loopSpeed(100);
    capture_client.video = capture(CAMERA);
}

function loop() {
  if(capture_client.video.srcObject) {
    applayCompression();
  }
}

function applayCompression() {
  processing_canvas.drawImage(capture_client.video, 0, 0, size.width, size.height);
  let temp_data = processing_canvas.getImageData(0, 0, size.width, size.height);
  let colors = {
    'r': [],
    'g': [],
    'b': []  
  };
  let pixels_position = {
      x: 0,
      y: 0
  };
  for(let i = 0; i < size.width*size.height; i++) {
    if(pixels_position.x < size.width) {
      pixels_position.x++;
    } 
    if(pixels_position.x >= size.width){
      pixels_position.x = 0;
      pixels_position.y++;
    }
    let r = temp_data.data[i*4];
    let g = temp_data.data[(i*4) + 1];
    let b = temp_data.data[(i*4) + 2];
    colors.r.push(r);
    colors.g.push(g);
    colors.b.push(b);
  }
  if(write) {
    server(WRITE, {
      r: colors.r,
      g: colors.g,
      b: colors.b,
      audio: data_recognized
    });
  }
}

function server(mode=WRITE, data_or_function='noData', fun=noFunction, adress='ws://localhost:8080') {
  if(!window.serialSocket0) {
    window.serialSocket0 = new WebSocket(adress);
  }
  if(mode() == 'write') {
    if(typeof data_or_function == 'object') {
      window.serialSocket0.send(JSON.stringify(data_or_function));
    } else {
      window.serialSocket0.send(data_or_function.toString());
    }
  } else if(mode() == 'read') {
    window.serialSocket0.onmessage = function(e) {
      if(data_or_function != 'noData') {
        data_or_function(e.data);
      }
    } 
  }
}

server(READ, (data) => {
  drawReceived(JSON.parse(data));
});

function drawReceived(data){
  let temp_data = JSON.parse(data);
  let pixels_position = {
    x: 0,
    y: 0
  };
  for(let i = 0; i < size.width*size.height; i++) {
    let data_temp = JSON.parse(data);
    let r = data_temp.r[i];
    let g = data_temp.g[i];
    let b = data_temp.b[i];
    rectangleEl(pixels_position.x*pixel_size, pixels_position.y, pixel_size, pixel_size, 0, [r, g, b]);
    if(pixels_position.x < size.width) {
      pixels_position.x ++;
    } 
    if(pixels_position.x >= size.width) {
      pixels_position.x = 0;
      pixels_position.y += pixel_size;
    }
  }
  if(JSON.parse(data).audio != data_recognized_prev) {
    if(JSON.parse(data).audio != '') {
      speak(JSON.parse(data).audio)
      data_recognized_prev = JSON.parse(data).audio;
    }
  }
}