const file = document.querySelector('#image');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const text = document.querySelector('#text');
const left = document.querySelector('.left');

file.addEventListener('change', e => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);     
    reader.onload = event => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            // const max_chars = (img.width * img.height)/8; //number every pixel's 8th bit
            const colors = getColors(ctx);
            const binary = stringToBinary(text.value);
            const data = changeBit(colors, binary);
            const buffer = ctx.createImageData(img.width, img.height);
            const final = toRGB(data);
            final.forEach((f, i) => {
                buffer.data[i] = f;
            });

            ctx.putImageData(buffer, 0, 0);
        }
    }
}, false);

function stringToBinary(text) {
    let bin = '';
    for(let i = 0; i < text.length; i++) 
        bin += ('000000000' + text[i].charCodeAt(0).toString(2)).slice(-8);
    return bin;
}

function binaryToString(bin) {
    let text = '';
    for(let i = 0; i < bin.length; i += 8)
        text += String.fromCharCode(parseInt(bin.slice(i, i+8), 2));
    return text;
}

function toBin(n) {
    return ('000000000' + n.toString(2)).slice(-8);
}

function getColors(ctx) {
    const raw = ctx.getImageData(0, 0, ctx.canvas.clientWidth, ctx.canvas.height)['data'];
    let data = '';
    for(let i = 0; i < raw.length; i += 4) { //[r, g, b, a]
        data += 
            toBin(raw[i + 0]) + //convert the color to base 2(binary)
            toBin(raw[i + 1]) + //convert the color to base 2(binary)
            toBin(raw[i + 2]) + //convert the color to base 2(binary)
            toBin(raw[i + 3])   //convert the color to base 2(binary)
        ;
    }
    return data;
}

function changeBit(colors, data) {
    colors = colors.split('');
    for(let i = 0; i < colors.length/8; i += 8)
        colors[i + 7] = data.split('')[i/8] || '0';          
    return colors.join('');
} 

function toRGB(data) {
    let colors = [];
    for(let i = 0; i < data.length-7; i += 8)
        colors.push(parseInt(data.slice(i, i+8), 2).toString());
    return colors;
}

function getBits(data) {
    let binary = '';
    let collected = '';
    for(const d of data)
        binary += toBin(parseInt(d));
    for(let i = 0; i < binary.length*8; i += 8)
        collected += binary[i + 7];
    return collected;
}
