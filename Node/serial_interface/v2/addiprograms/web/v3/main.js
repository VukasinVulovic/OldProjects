let data_read = '';

 function serial(mode='write', data='no-data', port=3000) {

   if(mode == 'write' || mode == 'w') {
    $.post('http://localhost:' + port + '/data', {

 	    write: data,
      read: ""
   });
  }

    $.get('http://localhost:' + port + '/data', function (data) {

     data_read = data.read;
  });

     return data_read;
}
//---------------------------------------------

 function random(port=3000) {

    return serial('read');
}

random();
col();
setTimeout(col, 1000);

 function col() {

	  this.color = random();

	  document.body.style.backgroundColor = 'hsl(0,' + this.color + ',' + this.color + ')';
	  setTimeout(col, 60);
}
