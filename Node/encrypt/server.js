const crypto = require('crypto');

function encrypt(text) {
    let p = '';
    for(let i = 0; i < 32; i++) p += Math.floor(Math.random()*16).toString(16)
    let cipher = crypto.createCipher('aes-256-ctr', p);
    let crypted = cipher.update(text, 'utf8', 'hex');
    return p + (crypted += cipher.final('hex'));
}

function decrypt(text) {
    let decipher = crypto.createDecipher('aes-256-ctr', text.slice(0, 32));
    let dec = decipher.update(text.slice(32), 'hex', 'utf8');
    return dec += decipher.final('utf8');
}

let x = encrypt('xxxxx');
console.log(x);
console.log(decrypt(x));