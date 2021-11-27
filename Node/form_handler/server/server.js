const http = require('http');  

http.createServer((request, response) => {
  const { headers, method, url } = request;
  let form_data = [];
  request.on('data', (chunk) => {
    form_data.push(chunk);
  }).on('end', () => {
    form_data = Buffer.concat(form_data).toString();
    response.write(`
      <!DOCTYPE html>
        <html>
          <body>
            <center>
              <h1>${form_data.slice(form_data.indexOf('=')+1)} is GAY.</h1>
            </center>
          </body>
        </html>
    `);
    response.end();
    console.log(form_data.slice(form_data.indexOf('=')+1));
    form_data = '';
  });
}).listen(8080);

