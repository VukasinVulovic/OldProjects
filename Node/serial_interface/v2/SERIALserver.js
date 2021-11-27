let fs = require('fs');
let rawdata, database_data, temp_read, prev_data_write = '', prev_data_read = '', data_temp;
const updateJsonFile = require('update-json-file');
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM1');
const parser = new Readline();
setTimeout(checkDatabase, 2000);//wait for the port to be initialized

 function checkDatabase() {

	  rawdata = fs.readFileSync('bin/database.json');
	  database_data = JSON.parse(rawdata);

  if(database_data.data.write != prev_data_write) {

	  port.write(database_data.data.write);
	  prev_data_write = database_data.data.write;
    console.log('dbWRITE: ' + database_data.data.write);
  }//writes data from json to serial

    port.pipe(parser);
    parser.on('data', function (line) { temp_read = line; });
    console.log('dbREAD: ' + database_data.data.read);//reads and parses serial

   if(temp_read != prev_data_read && temp_read != undefined) {

    console.log('dbREAD: ' + temp_read.substring(0, temp_read.indexOf('\r')));
    prev_data_read = temp_read;
    updateJsonFile('bin/database.json', (data) => { data.data.read = temp_read.substring(0, temp_read.indexOf('\r')); return data; });
 }//saves serial to json

	setTimeout(checkDatabase, 4);
}
