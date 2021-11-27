(function() {
	window.updateSpeed = 16.66666666666667;
	window.speechSynthesis.cancel();
})();
let CANVAS = null, 
	WIDTH = window.innerWidth, 
	HEIGHT = window.innerHeight;
let pointerX = 0,
	pointerY = 0;
let HELD = false;
let KEY = '',
	ASCII = 0;
let WHEEL = 0;

window.addEventListener('mousemove', e => {
	pointerX = e.clientX, pointerY = e.clientY;
	if(typeof(Pointer) == 'function') Pointer(e);
});

window.addEventListener('wheel', e => {
	WHEEL = -Math.sign(e.deltaY);
	if(typeof(Wheel) == 'function') Wheel(e);
});

window.addEventListener('keydown', e => {
	KEY = String.fromCharCode(e.keyCode).toLocaleLowerCase(), ASCII = e.keyCode;
	if(typeof(Key) == 'function') Key(e);
});

window.addEventListener('mousedown', (e) => {
	HELD = true;
	if(typeof(Click) == 'function') Click(e);
});


window.addEventListener('keyup', e => { KEY = '', ASCII = 0; });

window.addEventListener('mouseup', (e) => {
	HELD = false;
});


const server = {
	get: function(adress='http://localhost', event=noFunction) {
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				event(this.response);
			}
		}
		xhttp.open('GET', adress, true);
		xhttp.send();
	},
	post(adress='http://localhost', data='') {
		let xhttp = new XMLHttpRequest();
		xhttp.open('POST', adress, true);
		xhttp.setRequestHeader('Content-Type', 'application/text');
		xhttp.send(data_or_script.toString());
	}
}

function onChange(variable = 0, change = noFunction, noChange = noFunction) {
	if (this.prev != variable) {
		change(variable);
		this.prev = variable;
	} else {
		noChange(variable);
	}
}

function delay(time_milliseconds) {
	const date = Date.now();
	let currentDate;
	do {
		currentDate = Date.now();
	} while (currentDate - date < time_milliseconds);
}

function print(val) {
	if(typeof(val) == 'string' || typeof(val) == 'number') console.log(`%c${val}`, 'font-size: 14pt; font-family: "Courier New"; font-weight: bold;');
	else console.log(val);
}

function devMode() {
	console.warn('Developer mode ON.');
	window.developer = true;
	document.body.style.backgroundColor = '#000000';
	fpsCounter();
}


function loopSpeed(speed) {
	window.updateSpeed = speed;
}

function stopLoop() {
	clearInterval(window.loopFunction);
}

setTimeout(() => {
	if(typeof(setup) == 'function') setup();
	if(typeof(loop) == 'function') {
		loop();
		window.loopFunction = setInterval(loop, window.updateSpeed);
	}
}, 10);

function noFunction() { return; }

function createCanvas(color = [0], width, height, x, y) {
	let canvas = Element('canvas', 'canvas0');
	CANVAS = canvas.getContext('2d');
	canvas.width = width || window.innerWidth;
	canvas.height = height || window.innerHeight;
	canvas.style.position = 'absolute';
	canvas.style.backgroundColor = toRGB(color[0], color[1], color[2], color[3]);
	canvas.style.left = `${x || 0}px`;
	canvas.style.top = `${y || 0}px`;
	WIDTH = canvas.width;
	HEIGHT = canvas.height;
	window.defaultCanvas = canvas;
	return canvas;
}

const capture = {
	microphone: function() {
		if(!window.audiofilter0) {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			const context = new AudioContext();
			navigator.mediaDevices.getUserMedia({
				audio: true
			}).then((stream) => {
				const microphone = context.createMediaStreamSource(stream);
				window.audiofilter0 = context.createBiquadFilter();
				microphone.connect(window.audiofilter0);
				window.audiofilter0.connect(context.destination);
			});
		} else {
			return window.audiofilter0;
		}
	},
	camera: function() {
		let video = document.createElement('video');
		document.body.appendChild(video);
		navigator.mediaDevices.getUserMedia({
			video: true
		}).then((stream) => {
			video.autoplay = true,
			video.style.display = 'none',
			window.stream = stream,
			video.srcObject = stream;
		});
		return video;
	}
}

function refresh() { CANVAS.clearRect(0, 0, window.defaultCanvas.width, window.defaultCanvas.height); }

function rectangle(x=0, y=0, width=20, height=10, rotation=0, color=[255]) {
	start();
	CANVAS.translate(x + width / 2, y + height / 2);
	CANVAS.rotate(rotation);
	CANVAS.rect(-width / 2, -height / 2, width, height);
	if(color != null)fill(color[0], color[1], color[2], color[3]);
	end();
}

function circle(x=0, y=0, r=50, rotation=0, color=[255]) {
	start();
	CANVAS.ellipse(x, y, r, r, 0, 0, 2 * Math.PI);
	CANVAS.translate(x + r / 2, y + r / 2);
	CANVAS.rotate(rotation);
	if(color != null)fill(color[0], color[1], color[2], color[3]);
	end();
}

function polygon(x=0, y=0, points=[[0, 0], [100, 0], [100, 100], [0, 100], [0, 0]], color=[0]) {
	start();
	CANVAS.moveTo(x, y);
	let xx = [],
		yy = [];
	for(let point of points) {
		xx.push(point[0]);
		yy.push(point[1]);
	}
	xx.sort((a, b) => { return a - b });
	yy.sort((a, b) => { return a - b });
    for(let point of points) CANVAS.lineTo(map(point[0], xx[xx.length], xx[0], x, x+xx[0]), map(point[1], yy[yy.length], yy[0], y, y+yy[0]));
    fill(color[0], color[1], color[2], color[3]);
    end();
}

function line(from=[0, 0], to=[0, 10], size=1, color=[255]) {
	start();
	CANVAS.moveTo(from[0], from[1]);
	CANVAS.lineTo(to[0], to[1]);
	stroke(color[0], color[1], color[2], color[3], size);
	end();
}

function image(x=0, y=0, height=100, width=100, src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/64px-JavaScript-logo.png') {
	let img = Element('img', 'canvas_image');
	img.src = src;
	img.style.display = 'none';
	img.onload = () => CANVAS.drawImage(img, x, y, height, width); 
	return img;
}

function recognize(event=noFunction) {
	window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
	let recognition = new window.SpeechRecognition();
	recognition.start();
	recognition.onresult = (e) => { event(e.results[0][0].transcript.toLowerCase()); }
}

function speak(string='Hello, World!', speed=1, voice=0) {
	window.utterThis = new SpeechSynthesisUtterance(string.toString());
	let voices = speechSynthesis.getVoices();
	window.utterThis.rate = speed;
	if(window.developer) console.warn(voices);
	window.utterThis.voice = voices[voice];
	window.speechSynthesis.cancel();
	window.speechSynthesis.speak(window.utterThis);
}

function fill(r=0, g, b, a) {
	CANVAS.fillStyle = toRGB(r, g, b, a);
	CANVAS.fill();
}

function stroke(r=0, g, b, a, size=1) {
	CANVAS.strokeStyle = toRGB(r, g, b, a);
	CANVAS.lineWidth = size;
	CANVAS.stroke();
}

function start() {
	CANVAS.save();
	CANVAS.beginPath();
}

function end() {
	CANVAS.restore();
	CANVAS.closePath();
}

function toRGB(r, g, b, a=255) {
	if(g == undefined) g = r;
	if(b == undefined) b = g; 
	return `rgb(${r}, ${g}, ${b}, ${map(a, 0, 255, 0, 1)})`;
}

function addButton(id=false, text='CLICK', style='', e=noFunction) {
	let obj;
	if(!grab(id) || !id) obj = Element('button', id);
	else obj = grab(id);
	if(style != '' && style != null)obj.style = style;
	obj.innerHTML = text,
	obj.onclick = e;
	return obj;
}

function addImage(id=false, x=0, y=0, width=100, height=100, source='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/64px-JavaScript-logo.png', style='', e=noFunction) {
	let obj;
	if(!grab(id) || !id) obj = Element('img', id);
	else obj = grab(id);
	if(style != '' && style != null) obj.style = style;
	obj.src = source,
	obj.style.position = 'absolute',
	obj.style.width = `${width}px`,
	obj.style.height = `${height}px`,
	obj.style.top = `${x}px`,
	obj.style.left = `${y}px`,
	obj.onclick = e;
	return obj;
}

function addSlider(id=false, x=0, y=0, min=0, max=255, width=100, startValue=0) {
	let obj;
	if(!grab(id) || !id) {
		obj = Element('input', id),
		obj.value = min;
	}
	else obj = grab(id);
	obj.id = id,
	obj.type = 'range',
	obj.min = 0,
	obj.max = 100,
	obj.style.width = `${width}px`,
	obj.style.position = 'absolute',
	obj.style.left = `${x}px`;
	return map(obj.value, 0, 100, min, max);
}

function addText(id=false, text='Test', x=0, y=0, size=80, color='#ff0000', align='-') {
	let obj;
	if(!grab(id) || !id) obj = Element('p', id);
	else obj = grab(id);
	obj.innerHTML = text,
	obj.style.fontSize = `${size}pt`,
	obj.style.color = color,
	obj.style.display = 'block';
	if(align == 'left' || align == 'center' || align == 'right')obj.style.textAlign = align;
	else {
		obj.style.position = 'absolute',
		obj.style.left = `${x}px`,
		obj.style.top = `${y-size*1.5}px`;
	}
	return obj;
}

function Element(type, id=false, style='') {
	// if(grab(id)) return grab(id);	
	let object = document.createElement(type);
	document.body.appendChild(object);
	if(style != '')object.style = style;
	object.id = id;
	return object;
}

function startTone(f=100, type='square') {
	if(!window.audio_context) {
		window.audio_context = new AudioContext();
		window.oscillator = audio_context.createOscillator();
		window.oscillator.connect(audio_context.destination);
	}
	window.oscillator.frequency.value = f;
	window.oscillator.type = type;
	if(!window.oscillator_ruinning) {
		window.oscillator.start(0);
	}	
	window.oscillator_ruinning = true;
}

function stopTone() { 
	if(window.oscillator_ruinning) window.oscillator.stop(); 
	window.oscillator_ruinning = false;
	window.audio_context = false;
}

const serial = {
	adress: 'localhost',
	port: 80,
	ws: null,
	begin: function() { this.ws = new WebSocket(`${this.adress}:${this.port}`); },
	read: function(event) { if(this.ws != null) this.ws.onmessage = (e) => { event(e.data); }; },
	write: function(data) { 
		let d = typeof(data) == 'object' ? JSON.stringify(data) : data.toString();
		if(this.ws != null) this.ws.send(d); 
	}
}

function random(min=0, max=255) {
	return (Array.isArray(min) ? min[Math.floor(Math.random()*min.length)] : Math.round(Math.random()*(max-min)+min));
}

function map(value=127.5, in_min=0, in_max=100, out_min=0, out_max=255) {
	return ((value-in_min)*(out_max - out_min)/(in_max - in_min)+out_min);
}

function soundEffect(src) {
	let audio = new Audio();
	audio.src = src,
	audio.type = 'audio/mpeg';
	audio.play();
}

function average(arr=[1, 1]) {
	let sum = 0;
	for(let num of arr) sum += num;
	return sum/arr.length;
}

function grab(val='element0', type='id') {
	let obj, 
		selector = '';
	switch (type) {
		case 'id': selector = '#'; break;
		case 'class': selector = '.'; break;
		case 'name': obj = document.getElementsByName(val)[0]; break;
	}
	if(type != 'name') obj = document.querySelector(`${selector}${val}`);
	return obj;
}

function fpsCounter() {
	const times = [];
	let fps = 0;
	function loopFps() {
		window.requestAnimationFrame(() => {
			const now = performance.now();
			while (times.length > 0 && times[0] <= now-1000) times.shift();
			times.push(now);
			fps = times.length;
			let x = addText('fps_counterxx23', fps, WIDTH-150, 0, 100, '#ff0000', '-').style.opacity = 0.7;
			window.fps_count = fps;
			loopFps();
		});
	}
	loopFps();
	return fps;
}

function download(data='Hello, World!', type ='text', name) {
	if(!name) name = `file_${randomNum(0, 1000000)}.txt`;
	let link = Element('a');
	link.download = name;
	if(type == 'canvas') {
		link.href = data.toDataURL('image/png', 1.0).replace('image/png', 'image/octet-stream');
		link.click();
		document.body.removeChild(link);
	} else {
		link.href = 'data:text/plain; charset=utf-8,' + encodeURIComponent(data.toString());
		link.click();
		document.body.removeChild(link);
	}
}

function sortedNoise(rez=100, min=0, max=100) {
	let noise = [];
	for(let i = 0; i <= rez; i++) noise.push(random(min, max));
	noise.sort((a, b) => { return a - b });
	return noise;
}

function lerp(start_v, end_v) {
	let val = [];
	for(let i = 0; i <= end_v-start_v; i++) val.push(start_v+i);
	val.sort((a, b) => { return a - b });
	return val;
}

function create2dArray(slots_x=10, slots_y=10) {
	let arr = new Array(slots_x);
	for(let i = 0; i < arr.length; i++) arr[i] = new Array(slots_y);
	return arr;
}

function search(searched='a', items=['aa', 'bb', 'cc'], highlight=false) {
	let results = [];
	if(searched.length > 0) {
		for (let item of items) if(item.toLowerCase().indexOf(searched) == 0) results.push(item);
		return results;
	} else return [];
}

function repeat(times=10, speed=100, funct=noFunction) {
	let i = 0;
	let timer = setInterval(() => {
		if (i < times) funct(i++);
		else clearInterval(timer);
	}, speed);
}

function readFile(path_to_file='https://www.w3.org/TR/PNG/iso_8859-1.txt', data_function=noFunction) {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = () => {
		if(this.readyState == 4 && this.status == 200) data_function(this.response);
	}
	xhttp.open('GET', path_to_file, true);
	xhttp.send();
}

function urlParamaters(url) {
	let data = [],
		params = url.slice(url.indexOf('?')+1).split('&');
	for(let param of params) data.push(JSON.parse(`{"${param.split('=')[0]}": "${param.split('=')[1]}"}`));
	return data;
}

async function sha512(data='Hello, World!', e=noFunction) {
	const msgUint8 = new TextEncoder().encode(data);
	const hashArray = Array.from(new Uint8Array(await window.crypto.subtle.digest('SHA-512', msgUint8)));
	const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
	e(hashHex);
	return hashHex;
}  

String.prototype.cutByChar = function(char_start, char_end) {
	return this.toString().slice(str.indexOf(char_start) + 1, str.indexOf(char_end));
}

