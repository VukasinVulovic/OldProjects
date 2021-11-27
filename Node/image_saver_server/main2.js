let socket = new WebSocket('ws://localhost:69');

function setup() {
    socket.onopen = () => {
        socket.send('%get_images');
    }
    socket.onmessage = (e) => {
        showImages(JSON.parse(e.data));
    }
}

function showImages(images) {
    console.log(images);
    images.forEach(image => {
        let div = Element('div');
        let img = Element('img');
        div.appendChild(img);
        div.setAttribute('class', 'image_wrapper');
        img.setAttribute('class', 'image');
        img.src = `https://localhost:8080/local_data/images/${image.label}`;
    });
}
