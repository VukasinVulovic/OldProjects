console.clear();
console.log('--------------------------------------');

const formidable = require('formidable');
const zipFolder = require('zip-folder');
const request = require('request');
const express = require('express');
express.serveDir = (req, res, next, path) => express.static(path)(req, res, next);
const expressIp  = require('express-ip');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mime = require('mime-types')
const sha256 = require('sha256');
const WebSocket = require('ws');
const fs = require('fs-extra');
const https = require('https');
const path = require('path');
const http = require('http');
const walk = require('walk');
const app = express();
const cert_key = fs.readFileSync('./.security/private.key', 'utf8');
const splash_text = fs.readFileSync('./splash_text.txt').toString().split('\r\n');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'drovestorage.comfirmation@gmail.com',
        pass: '12ff05Yrkk765ffLLLLk1247U',
    }
});


http.createServer((req, res) => {
    res.writeHead(301, {
        Location: `https://${req.headers.host}${req.url}`
    });
    res.end();
}).listen(80);

const server = https.createServer({
        cert: fs.readFileSync('./.security/certificate.crt', 'utf8'),
        ca: fs.readFileSync('./.security/ca_bundle.crt', 'utf8'),
        key: cert_key
}, app);

// app.use(cors);//configure cross origin
server.listen(443, console.log(`Server is running on port 443`));

const ws = new WebSocket.Server({
    server: server
});

ws.on('connection', (client, req) => {
    if(cert_key == client._sender._socket.server.key) {//check if certificate came from the real site
        client.on('message', (message) => {
            const cookies = getCookie(req);
            const data = JSON.parse(message);
            if(checkCookie(cookies['user'], cookies['user-id'])) {//continue
                if(data.url) {
                    const url = data.url.replace(/\/\explore/g, '').slice(data.url.indexOf('/', 8)+1);
                    switch(data.action) {
                        case 'list':
                            listDir(cookies['user'], url, client);
                            break;
                        case 'create-folder':
                            createDir(cookies['user'], url, data.name, client);
                            break;   
                        case 'delete-folder':
                            removeDir(cookies['user'], url, data.name, client); 
                            break; 
                        case 'download-folder':
                            downloadDir(cookies['user'], url, data.name, client);
                            break;  
                        case 'get-storage-stats':
                            getStorageStats(cookies['user'], client);
                            break;   
                        case 'log-out':
                            logOut(cookies, client);
                            break; 
                    } 
                }
            }
        });
    }
});

app.use('/google/4pJwGMMsK9DQC3mOJwFz', express.static('./public'));//for google bots
app.use(expressIp().getIpInfoMiddleware);//user ip info
app.use('/src', express.static('./public/src'));
app.use('/timeout-mail', express.static('./public/timeout-mail'));
app.use('/bad-mail', express.static('./public/bad-mail'));
app.use('/check-mail', express.static('./public/check-mail'));
app.use('/login-fail', express.static('./public/login-fail'));
app.use('/login', (req, res, next) => {
    try {
        const cookies = getCookie(req); 
        if(
            (cookies['user-id'] || '').length > 10 && 
            (cookies['user'] || '').length > 10 //&&
            //checkCookie(cookies)
        ) return res.redirect('/');
        express.serveDir(req, res, next, './public/login');
    } catch(e) {
        res.end('some error occured.');
    }
});

app.use('/login-handler', (req, res) => {
    try {
        const ip_date = parseInt(getIp(sha256(req.ipInfo.ip.substring(7)))) || 0;
        const date = new Date();
        if(date-ip_date <= 86400000) return res.redirect('/timeout-mail');
        removeIp(getIp(sha256(req.ipInfo.ip.substring(7))));
        sendEmail(req.query.email, req, res);
    } catch(e) {
        console.log(e);
        res.end('some error occured.');
    }
});

app.use('/generate-paceholder', (req, res) => {
    const index = Math.floor(Math.random()*splash_text.length);
    const text = splash_text[index];
    res.end(text);
});

app.use('/explore/*', (req, res, next) => {
    try {
        const cookies = getCookie(req);
        if(
            (cookies['user-id'] || '').length < 10 && 
            (cookies['user'] || '').length < 10
        ) return res.redirect('/login');//check if cookie eaven exists, save server performance
        if(checkCookie(cookies['user'], cookies['user-id'])) {
            return express.serveDir(req, res, next, './public/site');//continue
        }
        res.redirect('/login');
    } catch(e) {
        res.end('some error occured.');
    }
});//no password required

app.use('/comfirm/:email/:id/:ip', (req, res) => {
    try {
        if(
            req.params.email.length < 10 || 
            req.params.id.length < 10
        ) return res.end(`<h1>Bad link. :'{</h1>`);
        const user = sha256(req.params.email);
        const real_id = readTempVarification(user);
        if(real_id !== req.params.id) return res.end(`<h1>Comfirmation failed. :'(</h1>`);
        createUser(req.params.email);//create user
        removeTempVarification(user);//remove id from temp file
        removeIp(sha256(req.params.ip));
        createCookie(user, res);//create a cookie for the user
        res.redirect('/');
        /*
                    <<<<<<<<<< CODE GOES HERE >>>>>>>>>>
        */
    } catch(e) {
        res.end('some error occured.');
    }
});

app.use('/viewfile/*', (req, res) => {
    try {
        const type = mime.contentType(path.extname(`./users/data/${encodeURI(req.params[0])}`));
        res.setHeader('Content-Type', type || 'text/html');//`attachment; filename=${req.params[0].slice(0, req.params[0].length-1)}`);
        res.write(fs.readFileSync(`./users/${getCookie(req)['user']}/data/${encodeURI(req.params[0])}`));
        res.end();
    } catch(e) {
        res.write(`<h1>Sorry no file or folder found. :'(`);
        res.end();
    }
});

app.use('/downloadfile/*', (req, res) => {
    try {
        const n = req.params[0].slice(0, req.params[0].length);
        const name = n.slice(n.lastIndexOf('/')+1);
        res.setHeader('Content-disposition', `attachment; filename=${name === 'temp-zip-file.zip' ? name : name.slice(32)}`);
        res.send(fs.readFileSync(`./users/${getCookie(req)['user']}/${encodeURI(req.params[0])}`));
        res.end();
    } catch(e) {
    }
});//no password required

app.use('/upload-file', (req, res) => {
    try {
        const form = new formidable.IncomingForm({ 
            multiples: true 
        });
        const cookies = getCookie(req);
        diskSpaceLeft(cookies.user, (l) => {
            form.maxFileSize = l * 1024 * 1024;
            form.parse(req, (err, fields, files) => {
                if(err) return res.end(err);
                if(
                    (cookies['user-id'] || '').length < 10 && 
                    (cookies['user'] || '').length < 10
                ) return;//check if cookie eaven exists, save server performance
                if(!checkCookie(cookies['user'], cookies['user-id'])) return;//bad cookie
                const re = req.query.url;
                const url = re.replace(/\/\explore/g, '').slice(re.indexOf('/', 8)+1);
                for(const file of files.file) {
                    const name = encodeURI(genFileName(decodeURI(file.name)));
                    const dir = `./users/${cookies.user}/data/${url}/${name}`;
                    if(!fs.existsSync(dir)) {
                        fs.renameSync(file.path, dir, (err) => {
                            if(err) res.write(err);
                        });
                    } else fs.unlinkSync(file.path);
                }
                res.end(`OK`);
            });
        });
    } catch(e) {
        res.end(e);
    }
});

app.use('/', (req, res, next) => {
    try {
        const cookies = getCookie(req);
        if(
            (cookies['user-id'] || '').length < 10 && 
            (cookies['user'] || '').length < 10
        ) return res.redirect('/login');//check if cookie eaven exists, save server performance
        if(checkCookie(cookies['user'], cookies['user-id'])) {
            return express.serveDir(req, res, next, './public/site');//continue
        }
        res.redirect('/login');//redirect user to login page
    } catch(e) {
        res.end('some error occured.');
    }
});

function logOut(cookies, client) {
    try {
        const prev = fs.readFileSync(`./users/${cookies['user']}/browser/cookies.txt`).toString().split('\n');
        const cookies_ = [];
        for(const p of prev) {
            if(p !== cookies['user-id']) cookies_.push(p);
        }
        fs.writeFileSync(`./users/${cookies['user']}/browser/cookies.txt`, cookies_.join('\n'));
        client.send(JSON.stringify({ 
            action: 'log-out' 
        }));
    } catch(e) {}
}

   
function downloadDir(user, dir, dir_name, client) {
    try {
        if(!fs.existsSync(`./users/${user}/data/temp/`)) fs.mkdirSync(`./users/${user}/data/temp/`);
        zipFolder(`./users/${user}/data/${dir}${dir_name}`, `./users/${user}/data/temp/temp-zip-file.zip`, (err) => {
            if(err) {
                client.send(JSON.stringify({ 
                    action: 'error',
                    message: `"${err}"` 
                }));
            } else {
                client.send(JSON.stringify({ 
                    action: 'download-folder' 
                }));
            }
        });
    } catch(e) {}
}

function removeDir(user, dir, dir_name, client) {
    try {
        fs.removeSync(`./users/${user}/data/${dir}${dir_name}`);
        client.send(JSON.stringify({ 
            action: 'delete-folder' 
        })); 
    } catch(e) {
    }
}   

function createDir(user, dir, dir_name, client) {
    try {
        const name = encodeURI(genFileName(decodeURI(dir_name)));
        const path = `./users/${user}/data/${dir}${name}`;
        if(!fs.existsSync(path)) {
            fs.mkdirSync(`./users/${user}/data/${dir}${name}`);
            client.send(JSON.stringify({ 
                action: 'new-folder' 
            })); 
        }
    } catch(e) {}
}

function listDir(user, dir, client) {
    try {
        let list = [];
        const ls = fs.readdirSync(`./users/${user}/data/${dir}`);
        for(let l of ls) {
            list.push({
                type: fs.lstatSync(`./users/${user}/data/${dir}/${l}`).isDirectory() ? 'folder' : 'file',
                name: l 
            });
        } 
        client.send(JSON.stringify({
            action: 'list',
            data: list
        }));
    } catch(e) {}  
}

function getStorageStats(user, client) {
    let files = [];
    let names = [];
    let max = 0;
    let vals = {
        "apps": 0, 
        "photos": 0, 
        "media": 0, 
        "text": 0, 
        "other": 0
    }
    try {
        const walker = walk.walk(`./users/${user}/data`, { 
            followLinks: false 
        });
        walker.on('file', (root, stat, next) => {
            files.push(`${root}/${stat.name}`);
            names.push(stat.name);
            next();
        });
        walker.on('end', () => {
            for(let i = 0; i < names.length; i++) {
                const size = fs.statSync(files[i]).size/1000000.0;
                if(names[i] !== 'temp-zip-file.zip') {
                    switch(getExtension(names[i])) {
                        case 'mp4':
                            vals.media += size;
                            break;
                        case 'mov':
                            vals.media += size;
                            break;
                        case 'mp3':
                            vals.media += size;
                            break;
                        case 'vaw':
                            vals.media += size;
                            break;    
                        case 'exe':
                            vals.apps += size;
                            break;
                        case 'png':
                            vals.photos += size;
                            break;
                        case 'jpg':
                            vals.photos += size;
                            break;
                        case 'jpeg':
                            vals.photos += size;
                            break;
                        case 'svg':
                            vals.photos += size;
                            break;
                        case 'txt':
                            vals.text += size;
                            break;
                        case 'html':
                            vals.text += size;
                            break;
                        case 'js':
                            vals.text += size;
                            break;
                        case 'css':
                            vals.text += size;
                            break;
                        default:
                            vals.other += size;
                    }
                }
            }
            client.send(JSON.stringify({ 
                max: JSON.parse(fs.readFileSync(`./users/${user}/info.json`))['max-storage-ammount'], 
                vals: vals,
                action: 'get-storage-stats' 
            }));
        });
    } catch(e) {
        console.log(e);
    }
}

function genFileName(n) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let name = '';
    for(let i = 0; i < 32; i++) name += chars[Math.floor(Math.random() * chars.length)];
    return name + n.replace(/[^\w\s.]/gi, '');
}

function getExtension(f) {
    const i = f.lastIndexOf('.')+1;
    return ((i < 0) ? '' : f.substr(i)).toLowerCase();
}

function diskSpaceLeft(user, c) {
    try {
        let size = 0;
        const walker = walk.walk(`./users/data${user}`, { 
            followLinks: false 
        });
        walker.on('file', (root, stat, next) => {
            if(stat.name !== 'temp-zip-file.zip') {
                size += fs.statSync(`${root}/${stat.name}`).size/1000000.0;
            }
            next();
        });
        walker.on('end', () => {
            const max = JSON.parse(fs.readFileSync(`./users/${user}/info.json`))['max-storage-ammount'];
            c(max-size);
        });
    } catch(e) {}
}

function sendEmail(adress, req, res) {
    try {
        request(`https://emailverification.whoisxmlapi.com/api/v1?apiKey=at_RzsajvIEmuDCRSqvnujKM3HxKhRIm&emailAddress=${adress}`, {}, (err, r) => {//check if email is valid
            if(err) throw err;
            if(JSON.parse(r.body).smtpCheck) {//continue, email valid
                const ip = sha256(req.ipInfo.ip.substring(7));
                const id = (() => {//create random id
                    let id = '';
                    for(let i = 0; i < 47; i++) {
                        const ascii = [
                            Math.floor(Math.random() * (57 - 48) + 48),
                            Math.floor(Math.random() * (90 - 65) + 65),
                            Math.floor(Math.random() * (122 - 97) + 97)
                        ];
                        id += String.fromCharCode(ascii[Math.floor(Math.random() * ascii.length)]);
                    }
                    return id;
                })();
                const user = sha256(adress);
                saveTempVarification(user, id);
                saveIp(ip);
                const url = `https://drove.mywire.org/comfirm/${adress}/${id}/${ip}`;
                transporter.sendMail({
                    from: 'drovestorage.comfirmation@gmail.com',
                    to: adress,
                    subject: 'security', 
                    text: '', 
                    html: `<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap" rel="stylesheet"> <title>Document</title> <style>*{font-family: 'Open Sans';}.info{font-size: 18pt; text-align: left; color: black;}.logo{width: 200px; height: 200px; margin: auto; display: block;}.code{width: 150px; height: 150px;}.link-version, link{font-size: 12pt;}</style> </head> <body> <img class="logo" src="https://i.imgur.com/rDaC9af.png" style="display:block" width="200" height="200"> <img class="code" src="https://qrcode.tec-it.com/API/QRCode?data=${url}" alt="qr-code"> <p class="info"> Hello fellow email user, <br>&nbsp;&nbsp;we have recently received an access request for your drove account. <br>&nbsp;&nbsp;If you didn't request acess, please don't comfirm the login! <br>&nbsp;&nbsp;If you wanted acess to this drove account, scan the QR code on left.<br></p><span class="link-version">If you don't want to use the QR code, click this link: </span><a class="link" href="${url}">${url}</a> </body></html>`,
                }).catch((e) => console.log(e));
                res.redirect('/check-mail');
            }
        });
    } catch(e) {
        res.end(e.toString());
    }
}

function createUser(email) {
    try {
        const username = sha256(email);
        if(fs.existsSync(`./users/${username}`)) throw 'user-exists';
        //create user and temp folder
        fs.mkdirSync(`./users/${username}`);
        fs.mkdirSync(`./users/${username}/temp`);
        //create info file
        const file_data = JSON.parse(`{
            "email": "${email}",
            "max-storage-ammount": 20
        }`);
        fs.writeFileSync(`./users/${username}/info.json`, JSON.stringify(file_data, null, 2));
        //create browser and data folder
        fs.mkdirSync(`./users/${username}/browser`);
        fs.mkdirSync(`./users/${username}/data`);
        //create cookies and authentification file
        fs.writeFileSync(`./users/${username}/browser/cookies.txt`, '');
        return {
            res: 'user-created'
        }
    } catch(e) {
        return {
            res: e
        }
    }
}

function createCookie(username, res) {
    try {
        const id = (() => {
            let id = '';
            for(let i = 0; i < 47; i++) {
                const ascii = [
                    Math.floor(Math.random() * (57 - 48) + 48),
                    Math.floor(Math.random() * (90 - 65) + 65),
                    Math.floor(Math.random() * (122 - 97) + 97)
                ];
                id += String.fromCharCode(ascii[Math.floor(Math.random() * ascii.length)]);
            }
            return id;
        })();
        const prev = fs.readFileSync(`./users/${username}/browser/cookies.txt`);
        fs.writeFileSync(`./users/${username}/browser/cookies.txt`, `${prev}${prev.length > 0 ? '\n' : ''}${id}`);
        res.cookie('user-id', id);
        res.cookie('user', username); 
    } catch(e) {
        return false;
    }
}

function checkCookie(username, alleged_cookie) {
    try {
        const cookies = fs.readFileSync(`./users/${username}/browser/cookies.txt`).toString().split('\n');
        for(const cookie of cookies) {
            if(alleged_cookie === cookie) return true;
        }
        return false;
    } catch(e) {
        return false;
    }
}

function getCookie(req) {
    try {
        let cookies_ = {};
        const cookies = req.headers.cookie.split(';');
        for(const c of cookies) {
            const line = c.split('=');
            cookies_ = Object.assign({}, cookies_, 
                JSON.parse(`{
                    "${line[0].replace(/"| /g, '')}":"${line[1].replace(/"| /g, '')}"
                }`)
            );
        }
        return cookies_;
    } catch(e) {
        return {};
    }
}

function saveTempVarification(email, id) {
    const prev = fs.readFileSync('./users/%temp%/email-varifications.txt').toString().split('\n');
    prev.push(`${email}=${id}`);
    fs.writeFileSync('./users/%temp%/email-varifications.txt', prev.join('\n'));
}

function readTempVarification(user_email) {
    const lines = fs.readFileSync('./users/%temp%/email-varifications.txt').toString().split('\n');
    for(const line of lines) {
        const x = line.split('=');
        const email = x[0];
        const id = x[1];
        if(email === user_email) return id;
    }
    return null;
}

function removeTempVarification(user_email) {
    const lines = fs.readFileSync('./users/%temp%/email-varifications.txt').toString().split('\n');
    const new_lines = [];
    for(const line of lines) {
        const x = line.split('=');
        const email = x[0];
        if(email !== user_email) new_lines.push(line);
    }
    fs.writeFileSync('./users/%temp%/email-varifications.txt', new_lines.join('\n'));
}

function saveIp(ip) {
    const date = new Date().getTime();
    const temp = fs.readFileSync('./users/%temp%/ip-records.txt');
    fs.writeFileSync('./users/%temp%/ip-records.txt', `${ip}=${date}${temp.length > 0 ? '\n' : ''}${temp}`)
}

function removeIp(ip) {
    const date = new Date().getTime();
    const lines = fs.readFileSync('./users/%temp%/ip-records.txt').toString().split('\n');
    const new_lines = [];
    for(const line of lines) {
        const prev_ip = line.split('=')[0];
        if(ip === prev_ip) new_lines.push(line);
    }
    fs.writeFileSync('./users/%temp%/ip-records.txt', new_lines.join('\n'));
}

function getIp(ip) {
    const lines = fs.readFileSync('./users/%temp%/ip-records.txt').toString().split('\n');
    for(const line of lines) {
        const record = line.split('=');
        if(ip === record[0]) return record[1];
    }
    return 0;
}