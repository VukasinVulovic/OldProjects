let prev = {
    x: 0,
    y: 0
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