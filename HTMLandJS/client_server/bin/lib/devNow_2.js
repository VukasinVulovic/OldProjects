window.updateSpeed = 100;

function devMode() {
  console.warn('Developer mode ON.');
  window.developer = true;
  darkMode();
  fpsCounter();
}

document.addEventListener('mousemove', function (e) {
  if(window.developer) {
     addText('mouse_pos_x', 'mouse x = ' + e.clientX + 'px', 20, '#ff0000', 0, 0, align='right');
     addText('mouse_pos_y', 'mouse y = ' + e.clientY + 'px', 20, '#ff0000', 0, 0, align='right');
     addText('mouse_pos_x_pr', 'mouse x = ' + Math.round(map(e.clientX, 0, window.innerWidth, 0, 100)) + '%', 20, '#ff0000', 0, 0, align='right');
     addText('mouse_pos_y_pr', 'mouse y = ' + Math.round(map(e.clientY, 0, window.innerHeight, 0, 100)) + '%', 20, '#ff0000', 0, 0, align='right');
  }
});

function loopSpeed(speed) {
  window.updateSpeed = speed;
}

function stopLoop() {
  window.updateSpeed = 0;
  clearInterval(window.loopFunction);
}

 setTimeout(()=> {
   if(typeof setup == 'function') {
     setup();
   }

   if(typeof loop == 'function') {
     loop();
     window.loopFunction = setInterval(loop, window.updateSpeed);
   }
}, 10);

 function noFunction() {
   if(window.developer) {
     console.warn('You can add a function for this command.');
   }
   // message was annoying so commented it out
}

 function square(id='squareElement', size=100, x=50, y=50, z=0, color='#ff0000') {
   if(document.getElementById(id) == undefined) {
     this.obj = document.createElement('div');
     document.body.appendChild(this.obj);
   } else {
     this.obj = document.getElementById(id);
   }
   this.obj.id = id;
   this.obj.style.position = 'absolute';
   this.obj.style.left = x + 'px';
   this.obj.style.top = y + 'px';
   this.obj.style.width = size + 'px';
   this.obj.style.height = size + 'px';
   this.obj.style.zIndex = z;
   this.obj.style.backgroundColor = color;
   return this.obj;
}

 function rectangle(id=false, width=200, height=100, x=50, y=50, z=0, color='#ff0000') {
   if(document.getElementById(id) == undefined || !id) {
     this.obj = document.createElement('div');
     document.body.appendChild(this.obj);
   } else {
     this.obj = document.getElementById(id);
   }
   this.obj.style.position = 'absolute';
   this.obj.id = id;
   this.obj.style.left = x + 'px';
   this.obj.style.top = y + 'px';
   this.obj.style.width = width + 'px';
   this.obj.style.height = height + 'px';
   this.obj.style.zIndex = z;
   this.obj.style.backgroundColor = color;
   return this.obj;
}

 function circle(id=false, size=100, x=50, y=50, z=1, color='#ff0000') {
   if(document.getElementById(id) == undefined || !id) {
     this.obj = document.createElement('div');
     document.body.appendChild(this.obj);
   } else {
     this.obj = document.getElementById(id);
  }
  this.obj.style.position = 'absolute';
  this.obj.id = id;
  this.obj.style.left = x + 'px';
  this.obj.style.top = y + 'px';
  this.obj.style.width = size + 'px';
  this.obj.style.height = size + 'px';
  this.obj.style.borderRadius = size/2 + 'px';
  this.obj.style.zIndex = z;
  this.obj.style.backgroundColor = color;
  return this.obj;
}

 function pill(id=false, width=100, height=100, round=25, x=50, y=50, z=2, color='#ff0000') {
   if(document.getElementById(id) == undefined || !id) {
      this.obj = document.createElement('div');
      document.body.appendChild(this.obj);
   } else {
      this.obj = document.getElementById(id);
   }
   this.obj.id = id;
   this.obj.style.position = 'absolute';
   this.obj.style.left = x + 'px';
   this.obj.style.top = y + 'px';
   this.obj.style.width = width + 'px';
   this.obj.style.height = height + 'px';
   this.obj.style.borderRadius = round + 'px';
   this.obj.style.zIndex = z;
   this.obj.style.backgroundColor = color;
   return this.obj;
}

 function addButton(id=false, text='CLICK', style='default', e=noFunction) {
  if(document.getElementById(id) == undefined || !id) {
    this.obj = document.createElement('button');
    document.body.appendChild(this.obj);
  } else {
    this.obj = document.getElementById(id);
  }
  if(style != 'default') {
    this.obj.setAttribute('style', style);
  } else {
    this.obj.setAttribute('style', 'width: 200px; height: 100px; font-size: 50px; display: block; margin-left: auto; margin-right: auto;');
  }
    this.obj.id = id;
    this.obj.innerHTML = text;
    this.obj.onclick = e;
    return this.obj;
}

 function addImage(id=false, source='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/64px-JavaScript-logo.png', x=0, y=0, width=100, height=100, style='default', e=noFunction) {
  if(document.getElementById(id) == undefined || !id) {
     this.obj = document.createElement('img');
     document.body.appendChild(this.obj);
  } else {
     this.obj = document.getElementById(id);
  }
  if(style != 'default') {
     this.obj.setAttribute('style', style);
  } else {
     this.obj.setAttribute('style', 'width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;');
  }
  this.obj.id = id;
  this.obj.setAttribute('src', source);
  this.obj.style.position = 'absolute';
  this.obj.style.width = width + 'px';
  this.obj.style.height = height + 'px';
  this.obj.style.top = y + 'px';
  this.obj.style.left = x + 'px';
  this.obj.onclick = e;
  return this.obj;
}

 function serial(mode='write', data='no-data', adress='http://localhost:8080/data') {
   let data_read_serial = '';
   if(mode == 'write' || mode == 'w') {
    transmit(adress, {
 	    write: data,
      read: ''
   });
  }
    receive(adress, function (data) {
     data_read_serial = data.read;
  });
  return data_read_serial;
}

 function random(min=0, max=255) {
   if(!Array.isArray(min)) {
     this.value = Math.round(Math.random() * (max - min) + min);
   } else {
     this.value = min[Math.round(Math.random() * (min.length - 0) + 0)];
   }
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

 function average(arr, type='full') {
   this.num = 0;
   for(this.i = 0; this.i < arr.length; this.i++) {
     this.num += arr[this.i];
   }
   if(type == 'full' || type == '%d') {
     return Math.round(this.num/arr.length);
   } else {
     return this.num/arr.length;
   }
}

 function toReal(number, type=1) {
     this.point = number.toString().indexOf('.');
     this.after = number.toString().substring(this.point+1);
     this.before = number.toString().replace('.' + this.after, '');
     this.result = this.before + '.' + this.after.substring(0, type);
     return parseFloat(this.result);
}

 function addText(id=false, text='Test', size=80, color='#ff0000', x=0, y=0, align='-') {
   if(document.getElementById(id) == undefined || !id) {
     this.text = document.createElement('span');
     document.body.appendChild(this.text);
   } else {
     this.text = document.getElementById(id);
   }
   this.text.id = id;
   this.text.innerHTML = text;
   this.text.style.fontSize = size + 'px';
   this.text.style.color = color;
   this.text.style.display = 'block';
   this.text.style.zIndex = 10;
   if(align == 'left' || align == 'center' || align == 'right') {
     this.text.style.textAlign = align;
   } else {
     this.text.style.position = 'absolute';
     this.text.style.left = x + 'px';
     this.text.style.top = y + 'px';
   }
   return this.text;
}

 function grab(val='element0', type='id') {
   switch (type) {
     case 'id':
     this.object = document.getElementById(val);
     break;
     case 'class':
     this.object = document.getElementsByClassName(val);
     break;
     case 'html_object':
     this.object = document.querySelector(val);
     break;
     case 'name':
     this.object = document.getElementsByName(val);
     break;
   }
   return this.object;
}

 function fpsCounter() {
   const times = [];
   let fps = 0;
   function loopFps() {
     window.requestAnimationFrame(() => {
       const now = performance.now();
       while (times.length > 0 && times[0] <= now - 1000) {
         times.shift();
       }
       times.push(now);
       fps = times.length;
       let x = addText('fps_counterxx23', fps, 80, '#ff0000', window.innerWidth-100, 10, '-');
       x.style.opacity = 0.7;
       window.fps_count = fps;
       loopFps();
     });
   }
   loopFps();
}

 function darkMode() {
   document.body.style.backgroundColor = '#000000';
}

 function addSlider(id=false, min=0, max=255, width=100, height=10, x=0, y=0, startValue=0) {
    if(document.getElementById(id) == undefined || !id) {
      let slider = document.createElement('input');
      document.body.appendChild(slider);
      slider.id = id;
      slider.type = 'range';
      slider.min = 0;
      slider.max = 100;
      slider.value = map(startValue, min, max, 0, 100);
      slider.style.height = height + 'px';
      slider.style.width = width + 'px';
      slider.style.position = 'absolute';
      slider.style.left = x + 'px';
      slider.style.top = y + 'px';
      return map(slider.value, 0, 100, min, max);
    } else {
      let slider = document.getElementById(id);
      return map(slider.value, 0, 100, min, max);
    }
}

 function Element(type, id=false) {
   if(document.getElementById(id) == undefined || !id) {
     let object = document.createElement(type);
     document.body.appendChild(object);
     object.id = id;
	   return object;
   } else {
     let object = document.getElementById(id);
	   return object;
   }
}

function download(data, type='text', name) {
  if(!name) {
    name = 'file_' + randomNum(0, 1000000);
  }
  if(data) {
    if(type == 'canvas') {
      let link = document.createElement('a');
      document.body.appendChild(link);
      link.download = name + '.png';
      link.href = data.toDataURL('image/png', 1.0).replace('image/png', 'image/octet-stream');
      link.click();
      document.body.removeChild(link);
    } else if(type == 'text') {
      let link = document.createElement('a');
      document.body.appendChild(link);
      link.download = name + '.txt';
      link.href = 'data:text/plain; charset=utf-8,' + encodeURIComponent(data);
      link.click();
      document.body.removeChild(link);
    }
  } else {
    console.log('no data!');
  }
}

function createNoise(rez, min, max) {
    let noise = [];
    let finished = false;
    let score = 0;
    let rezolution = rez;
    for(let i = 0; i <= rezolution; i++) {
      noise.push(random(min, max));
    }
    while(!finished) {
      for(let i = 1; i <= rezolution; i++) {
        if(noise[i] > noise[i-1]) {
          let temp = noise[i];
          noise[i] = noise[i-1];
          noise[i-1] = temp;
          score = 0;
        } else {
          score++;
        }
        finished = (score >= rezolution);
      }
    }
    return noise;
}

function create2dArray(slots_x=10, slots_y=10) {
  let arr = new Array(slots_x);
  for(let i = 0; i < arr.length; i++) {
    arr[i] = new Array(slots_y);
  }
  return arr;
}

function transmit(adress='http://localhost:8080/data', data, e=noFunction) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', adress, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
  let used = false;
  xhr.onreadystatechange = function () {
    if(!used) {
      e();
      used = true;
    }
  }
}

function receive(adress='http://localhost:8080/data', fun) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      fun(JSON.parse(this.response));
    }
  }
  xhttp.open('GET', adress, true);
  xhttp.send();
}

function search(searched='a', items=['aa', 'bb', 'cc'], highlight=false) {
	let results = [];
	if(searched.length > 0) {
		for(let i = 0; i < items.length; i++) {
			if(items[i].toLowerCase().indexOf(searched) == 0) {
				if(highlight) {
					results.push(items[i].toLowerCase().replace(searched, '<mark>' + searched + '</mark>'));
				} else {
					results.push(items[i]);
				}
			}
		}
		return results;
	} else {
		if(highlight) {
			return ['<i>No items found!</i>'];
		} else {
			return ['No items found!'];
		}
	}
}
