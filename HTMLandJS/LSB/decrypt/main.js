const output = document.querySelector('#output');
const file = document.querySelector('#image');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const text = 'Hello, World!';

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
            const final = ctx.getImageData(0, 0, img.width, img.height).data;
            const read = getBits(final);
            const out = binaryToString(read);
            output.innerText = out;
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
