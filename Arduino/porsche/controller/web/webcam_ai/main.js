const VIDEO_PROCESSOR = {
    canvas: null,
    ctx: null,
    begin: function () {
        const canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        canvas.width = '640';
        canvas.height = '480';
        canvas.style = 'display: block; margin: auto;';  
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        loop();
        function loop() {
            const image = new Image();
            image.src = 'http://192.168.1.34:8080/video';
            image.width = '640';
            image.height = '480';
            // document.body.appendChild(image);
            VIDEO_PROCESSOR.ctx.drawImage(image, 0, 0); 
            // window.requestAnimationFrame(loop);
        }
    }

}

VIDEO_PROCESSOR.begin();

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