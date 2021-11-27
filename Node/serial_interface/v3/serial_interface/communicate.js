let data_received = '', temp_read, prev_data_write = '', prev_data_read = '', data_temp;
const request = require('request');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM1');
const parser = new Readline();
resetServer();//resets the values on the server
setTimeout(checkDatabase, 2000);//wait for the port to be initialized

 function resetServer() {

   request({
           url: "http://localhost:3000/data",
           method: "POST",
           json: true,
           headers: {
             "content-type": "application/json",
        },
           body: {

             read: "",
             write: ""
  }
 });
}

 function checkDatabase() {

   request('http://localhost:3000/data', function (error, response, body) {

     data_received = JSON.parse(body).write;
   });

  if(data_received != prev_data_write) {

	  port.write(data_received);
	  prev_data_write = data_received;
	  console.log('dbWRITE: ' + data_received);
  }//writes data from json to serial

    port.pipe(parser);
    parser.on('data', function (line) { temp_read = line; });

   if(temp_read != prev_data_read && temp_read != undefined) {

    this.data_final = temp_read.substring(0, temp_read.indexOf('\r'));
    console.log('dbREAD: ' + this.data_final);

    request({
            url: "http://localhost:3000/data",
            method: "POST",
            json: true,
            headers: {
              "content-type": "application/json",
         },
            body: {

              read: this.data_final,
              write: ""
   }
  });

    prev_data_read = temp_read;
 }//posts data to the server

	setTimeout(checkDatabase, 1000);
}

 console.log('Everything is working fine!');
