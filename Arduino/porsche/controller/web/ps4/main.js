let prev = {
    x: 0,
    y: 0
}
range();

function range() {
    const power = document.querySelector('.power');
    const steer = document.querySelector('.steer'); 
    
    power.onchange = () => {
        console.log(power.value);
        sendData(power.value, steer.value);
    }

    steer.onchange = () => {
        console.log(steer.value);
        sendData(power.value, steer.value);
    }
}

window.addEventListener('gamepadconnected', (e) => {
    console.log('Controller connected.');
    setInterval(checkAxes, 10);
});

function checkAxes() {
    const x = -1*map(navigator.getGamepads()[0].axes[3], -1, 1, -100, 100);
    const y = map(navigator.getGamepads()[0].axes[2], -1, 1, -100, 100);
    
    if(Math.abs(prev.x-x) > 50 || Math.abs(prev.y-y) > 50) {
        prev.x = x;  
        prev.y = y; 
        console.log(x, '---', y);
        sendData(x, y);      
    }
}

function map(value, in_min, in_max, out_min, out_max) {
	this.value = (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	return this.value;
}

function sendData(power, steer) {
    const url = `http://192.168.1.35?power=${power}&steer=${steer}`;
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', url, true);
    xhttp.send();
}


// window.addEventListener("gamepaddisconnected", (event) => {
//     console.log('Controller disconnected.');
// });