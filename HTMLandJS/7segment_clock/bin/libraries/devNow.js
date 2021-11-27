 function noFunction() {

   console.log('No function!');
}

 function square(id='squareElement', size=100, x=50, y=50, z=-1, pos='absolute', color='#ff0000') {

   if(document.getElementById(id) == undefined) {

   this.object = document.createElement('div');
   this.object.id = id;
   this.object.setAttribute('style', 'height: ' + size + 'px; width: ' + size + 'px; background-color: ' + color + '; position: ' + pos + '; left: ' + x + 'px; top: ' + y + 'px; z-index:' + z + ';');
   document.body.appendChild(this.object);
   return this.object;
 } else {

   this.obj = document.getElementById(id);
   this.obj.style.left = x + 'px';
   this.obj.style.top = y + 'px';
   this.obj.style.width = size + 'px';
   this.obj.style.height = size + 'px';
   this.obj.style.zIndex = z;
   this.obj.style.backgroundColor = color;
   return this.obj;
 }
}

 function rectangle(id='rectElement', width=100, height=100, x=50, y=50, z=0, pos='absolute', color='#ff0000') {

  if(document.getElementById(id) == undefined) {

  this.object = document.createElement('div');
  this.object.id = id;
  this.object.setAttribute('style', 'height: ' + height + 'px; width: ' + width + 'px; background-color: ' + color + '; position: ' + pos + '; left: ' + x + 'px; top: ' + y + 'px; z-index:' + z + ';');
  document.body.appendChild(this.object);
  return this.object;
 } else {

  this.obj = document.getElementById(id);
  this.obj.style.left = x + 'px';
  this.obj.style.top = y + 'px';
  this.obj.style.width = width + 'px';
  this.obj.style.height = height + 'px';
  this.obj.style.zIndex = z;
  this.obj.style.backgroundColor = color;
  return this.obj;
 }
}

 function circle(id='circleElement', size=100, x=50, y=50, z=1, pos='absolute', color='#ff0000') {

  if(document.getElementById(id) == undefined) {

  this.object = document.createElement('div');
  this.object.id = id;
  this.object.setAttribute('style', 'height: ' + size + 'px; width: ' + size + 'px; background-color: ' + color + '; position: ' + pos + '; left: ' + x + 'px; top: ' + y + 'px; border-radius: ' + size/2 + 'px; z-index:' + z + ';');
  document.body.appendChild(this.object);
  return this.object;
} else {

  this.obj = document.getElementById(id);
  this.obj.style.left = x + 'px';
  this.obj.style.top = y + 'px';
  this.obj.style.width = size + 'px';
  this.obj.style.height = size + 'px';
  this.obj.style.borderRadius = size/2 + 'px';
  this.obj.style.zIndex = z;
  this.obj.style.backgroundColor = color;
  return this.obj;
 }
}

 function pill(id='pillElement', width=100, height=100, round=25, x=50, y=50, z=2, pos='absolute', color='#ff0000') {

 if(document.getElementById(id) == undefined) {

  this.object = document.createElement('div');
  this.object.id = id;
  this.object.setAttribute('style', 'height: ' + height + 'px; width: ' + width + 'px; background-color: ' + color + '; position: ' + pos + '; left: ' + x + 'px; top: ' + y + 'px; border-radius: ' + round + 'px; z-index:' + z + ';');
  document.body.appendChild(this.object);
  return this.object;
} else {

  this.obj = document.getElementById(id);
  this.obj.style.left = x + 'px';
  this.obj.style.top = y + 'px';
  this.obj.style.width = width + 'px';
  this.obj.style.height = height + 'px';
  this.obj.style.borderRadius = round + 'px';
  this.obj.style.zIndex = z;
  this.obj.style.backgroundColor = color;
  return this.obj;
 }
}

 function addButton(id='button', text='CLICK', style='default', e=noFunction) {

  if(document.getElementById(id) == undefined) {

  this.object = document.createElement('button');
  this.object.id = id;

  if(style != 'default') {

  this.object.setAttribute('style', style);
   } else {

  this.object.setAttribute('style', 'width: 200px; height: 100px; font-size: 50px; display: block; margin-left: auto; margin-right: auto;');
  }

  this.object.innerHTML = text;
  this.object.onclick = e;
  document.body.appendChild(this.object);
  return this.object;

  } else {

  this.object.setAttribute('style', style);
  this.object.innerHTML = text;
  this.object.onclick = e;
  return this.object;
 }
}

 function addImage(id='image', source='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/64px-JavaScript-logo.png', style='default', e=noFunction) {

  if(document.getElementById(id) == undefined) {

  this.object = document.createElement('img');
  this.object.id = id;

 if(style != 'default') {

  this.object.setAttribute('style', style);
  } else {

  this.object.setAttribute('style', 'width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;');
  }

  this.object.setAttribute('src', source);
  this.object.onclick = e;
  document.body.appendChild(this.object);
  return this.object;

 } else {

  this.object.setAttribute('src', source);
  this.object.setAttribute('style', style);
  this.object.onclick = e;
  return this.object;
 }
}

 function serial(mode='write', data='no-data', port=3000) {

   let data_read_serial = '';

   if(mode == 'write' || mode == 'w') {
    $.post('http://localhost:' + port + '/data', {

 	    write: data,
      read: ""
   });
  }
    $.get('http://localhost:' + port + '/data', function (data) {

     data_read_serial = data.read;
  });

  return data_read_serial;
}

 function random(min=0, max=255) {

   this.value = Math.floor(Math.random() * (max - min) + min);
   return this.value;
}

 function map(value=127.5, in_min=0, in_max=100, out_min=0, out_max=255) {

   this.value = (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
   return this.value;
}

 function soundEffect(src) {

   this.audio = new Audio();
   this.audio.src = src;
   this.audio.type = 'audio/mpeg';
   this.audio.play();
   return this.audio;
}

 function videoEffect(src, width, height, x, y) {

   this.video = document.createElement('video');
   document.body.appendChild(this.video);

   this.video.setAttribute('style', 'width: ' + width + 'px; height: ' + height + 'px; position: absolute; left: ' + x + 'px; top: ' + y + 'px;');
   this.video.src = src;
   this.video.type = 'video/mp4';
   this.video.style.zIndex = 10;
   this.video.play();
   return this.video;
}

 function collisionDetection(element0, element1, offset=0, hitbox=false) {

   this.x_0 = parseInt(element0.style.left);
   this.x_1 = parseInt(element1.style.left);
   this.width_0 = parseInt(element0.style.width);
   this.width_1 = parseInt(element1.style.width);

   this.y_0 = parseInt(element0.style.top);
   this.y_1 = parseInt(element1.style.top);
   this.height_0 = parseInt(element0.style.height);
   this.height_1 = parseInt(element1.style.height);

   this.x = Math.abs((this.x_0  + (this.width_0/2)) - (this.x_1 + (this.width_1/2))) - ((this.width_0/2) + (this.width_1/2));
   this.y = Math.abs((this.y_0  + (this.height_0/2)) - (this.y_1 + (this.height_1/2))) - ((this.height_0/2) + (this.height_1/2));

    // console.log(this.x + '    ' + this.y);

    if(hitbox) {

      element0.style.borderStyle = 'solid';
      element0.style.borderColor = '#ff0000';
      element1.style.borderStyle = 'solid';
      element1.style.borderColor = '#00ff00';
      element0.style.borderWidth = '1px 1px 1px 1px';
      element1.style.borderWidth = '1px 1px 1px 1px';
    }

   if(this.x <= 0 + offset) {
     if(this.y <= 0 + offset) {

       this.hit = true;
       return true;
     } else {

       this.hit = false;
       return false;
     }
   } else {

     this.hit = false;
     return false;
   }
}
