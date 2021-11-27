const state = {
    power: 0,
    steer: 0
}

document.addEventListener('keydown', e => {
    switch(e.keyCode) {
        case 87: //w
            state.power = 100;
            break;
        case 83: //s
            state.power = -100;
            break;
        case 65: //a 
            state.steer = -100;
            break;
        case 68: //d
            state.steer = 100;
            break;
        default:
            state.power = 0;
            state.steer = 0;
    }
    sendData(state.power, state.steer);
});

document.addEventListener('keyup', e => {
    switch(e.keyCode) {
        case 87: //w
        case 83: //s
            state.power = 0;
            break;
        case 68: //d
        case 65: //a 
            state.steer = 0;
            break;
        default:
            state.power = 0;
            state.steer = 0;
    }
    sendData(state.power, state.steer);
});

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