console.clear();

const formidable = require('formidable');
const express = require('express');
const fs = require('fs');
const app = express();

const server = app.listen(80, (err) => {
    if(err) throw err;
    else console.log(`Server is running on http://192.168.1.2`);
});

app.use('/', express.static('public'));

app.use('/uploader', (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        console.log(fields.uuid);
        if(err) res.write('<h1>Еrror while uploading the file.</h1>');
        else {
            fs.renameSync(files.file.path, `./public/${files.file.name}`, (err) => {
                if(err) res.write('<h1>Еrror while saving the file.</h1>');
            });
            res.write('<h1>File succssesfuly uploaded.</h1>');
        }
        res.end();
    });
});



// app.get('/submit/:uuid', (req, res) => {
    // req.params['uuid'],

//     res.end();
// });
