const CANVAS = (() => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    canvas.style.backgroundColor = '#ffffff';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    return {
        circle: (x, y, r, fill) => {
            ctx.arc(x, y, r, 0, 2*Math.PI);
            ctx.fillStyle = fill;
            ctx.fill();
        },
        text: (string, x, y, size, color) => {
            ctx.font = `${size}px Arial`;
            ctx.fillStyle = color;
            ctx.fillText(string, x, y+size);
        },
        canvas: canvas 
    }
})();

function generateIcon(name) {
    const n = name.slice(0, 2);
    const color = `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`
    CANVAS.circle(100, 100, 100, color);
    CANVAS.text(n, 34, 30, 115, 'white');
    return CANVAS.canvas.toDataURL();
}

function displayText(text) {
    const box = document.createElement('textarea');
    box.style.fontSize = '12pt';
    box.value = text;
    document.body.appendChild(box);
}

