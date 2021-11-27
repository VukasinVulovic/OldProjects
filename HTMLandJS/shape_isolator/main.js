let stream;
let tollerance = 191;

function wheel() {
    if(tollerance <= 0 && WHEEL === -1)
        return;
    tollerance += WHEEL;
    addText('tollerance', `T = ${tollerance}`, 80, '#000000', 0, 500, '-');
}

function setup() {
    stream = capture(CAMERA);
    createCanvas(640, 480, 0, 0, [255]);
}

function loop() {
    const processed = isolateShapes(stream, tollerance);
    CANVAS.putImageData(processed, 0, 0);
}

function isolateShapes(stream, tollerance) {
    const color_data = (() => {
        const c = document.createElement('canvas');
        const canvas = c.getContext('2d');
        c.width = '640';
        c.height = '480';
        canvas.drawImage(stream, 0, 0);
        return [//duplicate the data to avoid strange glitch on canvas
            canvas.getImageData(0, 0, 640, 480),
            canvas.getImageData(0, 0, 640, 480)
        ];
    })();
    const isolated_shapes = shapeIsolator(color_data[0], tollerance);//isolate shapes by brightness
    const image_data = applyColor(isolated_shapes, color_data[1], 100);//combine shape data nad color data
    return image_data;//processed data
}

function shapeIsolator(data, tollerance) {
    //colored image --> grayscale image --> isolate shape by brightness
    for(let i = 0; i < data.data.length; i += 4) {
        const avg = Math.floor((
            data.data[i + 0] + 
            data.data[i + 1] +
            data.data[i + 2]
        )/3);
        data.data[i + 0] = avg;
        data.data[i + 1] = avg;
        data.data[i + 2] = avg;
        const color = (
            255-data.data[i + 0] > tollerance ||
            255-data.data[i + 1] > tollerance ||
            255-data.data[i + 2] > tollerance
        ) ? 0 : 255;
        data.data[i + 0] = color;
        data.data[i + 1] = color;
        data.data[i + 2] = color;
    }
    return data;
}

function applyColor(shape_data, color_data, tollerance) {
    for(let i = 0; i < shape_data.data.length; i += 4) {
        if(//if pixel brighter than tollerance, set to original pixel color, if not, it auto fills with zeroes.
            shape_data.data[i + 0] >= tollerance &&
            shape_data.data[i + 1] >= tollerance &&
            shape_data.data[i + 2] >= tollerance
        ) {
            shape_data.data[i + 0] = color_data.data[i + 0];
            shape_data.data[i + 1] = color_data.data[i + 1];
            shape_data.data[i + 2] = color_data.data[i + 2];
        }
        shape_data.data[i + 3] = 255;//max alpha
    }
    return shape_data;
}

// function sendData(power, steer) {
//     const url = `http://192.168.1.35?power=${power}&steer=${steer}`;
//     const xhttp = new XMLHttpRequest();
//     xhttp.open('POST', url, true);
//     xhttp.send();
// }