console.clear();
console.log('--------------------------------------');

const formidable = require('formidable');
const zipFolder = require('zip-folder');
const express = require('express');
const mime = require('mime-types')
const sha256 = require('sha256');
const WebSocket = require('ws');
const fs = require('fs-extra');
const https = require('https');
const path = require('path');
const http = require('http');
const walk = require('walk');
const app = express();

let USER_DATA = JSON.parse(fs.readFileSync('./user-data.json'));

http.createServer((req, res) => {
    res.writeHead(301, {
        Location: `https://${req.headers.host}${req.url}`
    });
    res.end();
}).listen(80);

const server = https.createServer({
        cert: fs.readFileSync('./.security/certificate.crt', 'utf8'),
        ca: fs.readFileSync('./.security/ca_bundle.crt', 'utf8'),
        key: fs.readFileSync('./.security/private.key', 'utf8')
}, app);

server.listen(443, console.log(`Server is running on port 443`));

const ws = new WebSocket.Server({
    server: server
});

ws.on('connection', (client) => {
    client.on('message', (d) => {
        try {
            const data = JSON.parse(d);
            const hash = sha256(data.password);
            if(hash === USER_DATA[data.username].password) {
                if(data.url) {
                    let url = data.url.replace(/\/\explore/g, '').slice(data.url.indexOf('/', 8)+1);
                    switch(data.action) {
                        case 'list':
                            client.send(listDir(data.username, url, client));
                            break;
                        case 'create-folder':
                            createDir(data.username, url, data.name, client);
                            break;   
                        case 'delete-folder':
                            removeDir(data.username, url, data.name, client); 
                            break; 
                        case 'download-folder':
                            downloadDir(data.username, url, data.name, client);
                            break;  
                        case 'get-storage-stats':
                            getStorageStats(data.username, client);
                            break;    
                    } 
                }
            } else {
                throw 'password bad!';
            }
        } catch(e) {
            client.send(`{ "Error": "${e}" }`);
        }
    })
});

app.use('/', express.static('./site'));//no password required
app.use('/explore/*', express.static('./site'));//no password required
app.use('/register', express.static('./register'));//no password required
app.use('/login', express.static('./login'));//no password required

app.use('/register-user', (req, res) => {
    try {
        if(req.query.password !== req.query['password-repeat']) throw '<center><h1>Password repeat wrong!</h1><center>'
        if(USER_DATA[req.query.username]) throw '<center><h1>User already exists!</h1><center>';
        if(req.query.password.length < 4 || req.query.password.length > 32 || req.query.password.replace(/[^0-9]/g, '').length < 4 || req.query.password.indexOf('"') > -1) throw '<center><h1>password is invalid.</center></h1>';
        USER_DATA = Object.assign({}, USER_DATA, JSON.parse(`{
            "${req.query.username}": {
                "email": "${req.query.email}",
                "password": "${sha256(req.query.password)}",
                "max-storage-ammount": 20
            }
        }`));
        fs.writeFileSync('./user-data.json', JSON.stringify(USER_DATA, null, '\t'));
        fs.mkdirSync(`./public/${req.query.username}`);
        throw `<script>
                document.cookie = "username=${req.query.username}"; 
                document.cookie = "password=${req.query.password}"; 
                location.href = "/";
            </script>`
    } catch(e) {
        res.writeHead(200, {
            'Content-Type': 'text/html' 
        });
        res.write(e);
        res.end();
    }
});

app.use('/login-user', (req, res) => {
    try {
        if(!USER_DATA[req.query.username]) throw 'unknown user!';
        if(sha256(req.query.password) !== USER_DATA[req.query.username].password) throw 'bad password!';
        throw `<script>
                document.cookie = "username=${req.query.username}"; 
                document.cookie = "password=${req.query.password}"; 
                location.href = "/";
            </script>`
    } catch(e) {
        res.writeHead(200, {
            'Content-Type': 'text/html' 
        });
        res.write(e);
        res.end();
    }
})

app.use('/viewfile/*', (req, res) => {
    try {
        const type = mime.contentType(path.extname(`./public/${encodeURI(req.params[0])}`));
        res.setHeader('Content-Type', type || 'text/html')//`attachment; filename=${req.params[0].slice(0, req.params[0].length-1)}`);
        res.write(fs.readFileSync(`./public/${encodeURI(req.params[0])}`));
        res.end();
    } catch(e) {
        res.write(`<h1>Sorry no file or folder found. :'(`);
        res.end();
    }
});//no password required

app.use('/downloadfile/*', (req, res) => {
    const n = req.params[0].slice(0, req.params[0].length-1);
    const name = n.slice(n.lastIndexOf('/')+1).slice(32);
    res.setHeader('Content-disposition', `attachment; filename=${name}`);
    res.send(fs.readFileSync(`./public/${encodeURI(req.params[0])}`));
    res.end();
});//no password required

app.use('/upload-file', (req, res) => {
    try {
        const form = new formidable.IncomingForm();
        diskSpaceLeft(req.query.username, (l) => {
            form.maxFileSize = l * 1024 * 1024;
            form.parse(req, (err, fields, files) => {
                if(err) res.send(err);
                else {
                    const hash = sha256(req.query.password);
                    if(hash === USER_DATA[req.query.username].password) {
                        const re = req.query.url;
                        const url = re.replace(/\/\explore/g, '').slice(re.indexOf('/', 8)+1);
                        const name = encodeURI(genFileName(decodeURI(files.file.name)));
                        const dir = `./public/${req.query.username}/${url}/${name}`;
                        if(!fs.existsSync(dir)) {
                            fs.renameSync(files.file.path, dir, (err) => {
                                if(err) res.write(err);
                            });
                        } else fs.unlinkSync(files.file.path);
                        res.write(`OK`);
                    } else {
                        return;
                    }
                }
                res.end();
            });
        });
    } catch(e) {
        res.write(e);
    }
});

function genFileName(n) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let name = '';
    for(let i = 0; i < 32; i++) name += chars[Math.floor(Math.random() * chars.length)];
    return name + n.replace(/[^\w\s.]/gi, '');
}

function downloadDir(user, dir, dir_name, client) {
    try {
        if(!fs.existsSync(`./public/${user}/temp/`)) fs.mkdirSync(`./public/${user}/temp/`);
        zipFolder(`./public/${user}/${dir}${dir_name}`, `./public/${user}/temp/temp-zip-file.zip`, (err) => {
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
        fs.removeSync(`./public/${user}/${dir}${dir_name}`);
        client.send(JSON.stringify({ 
            action: 'delete-folder' 
        })); 
    } catch(e) {}
}   

function createDir(user, dir, dir_name, client) {
    try {
        const name = encodeURI(genFileName(decodeURI(dir_name)));
        const path = `./public/${user}/${dir}${name}`;
        if(!fs.existsSync(path)) {
            fs.mkdirSync(`./public/${user}/${dir}${name}`);
            client.send(JSON.stringify({ 
                action: 'new-folder' 
            })); 
        }
    } catch(e) {}
}

function listDir(user, dir, client) {
    try {
        let list = [];
        const ls = fs.readdirSync(`./public/${user}/${dir}`);
        for(let l of ls) {
            list.push({
                type: fs.lstatSync(`./public/${user}/${dir}/${l}`).isDirectory() ? 'folder' : 'file',
                name: l 
            });
        } 
        return JSON.stringify({
            action: 'list',
            data: list
        }); 
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
        const walker = walk.walk(`./public/${user}`, { 
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
                max: USER_DATA[user]['max-storage-ammount'], 
                vals: vals,
                action: 'get-storage-stats' 
            }));
        });
    } catch(e) {}
}

function diskSpaceLeft(user, c) {
    try {
        let size = 0;
        const walker = walk.walk(`./public/${user}`, { 
            followLinks: false 
        });
        walker.on('file', (root, stat, next) => {
            if(stat.name !== 'temp-zip-file.zip') {
                size += fs.statSync(`${root}/${stat.name}`).size/1000000.0;
            }
            next();
        });
        walker.on('end', () => {
            c(USER_DATA[user]['max-storage-ammount']-size);
        });
    } catch(e) {}
}

function getExtension(f) {
    const i = f.lastIndexOf('.')+1;
    return ((i < 0) ? '' : f.substr(i)).toLowerCase();
}