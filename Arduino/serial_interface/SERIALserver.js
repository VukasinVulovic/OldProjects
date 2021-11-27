let fs = require('fs');
let rawdata, database_data, prev_data = '';

const SerialPort = require('serialport')
const port = new SerialPort('COM1');

setTimeout(checkDatabase, 2000);

 function checkDatabase() {
	
	rawdata = fs.readFileSync('bin/database.json');
	database_data = JSON.parse(rawdata);
	
  if(database_data.data.text != prev_data) {
	  
	port.write(database_data.data.text);
	prev_data = database_data.data.text;
	console.log();
  }
	setTimeout(checkDatabase, 10);
}

