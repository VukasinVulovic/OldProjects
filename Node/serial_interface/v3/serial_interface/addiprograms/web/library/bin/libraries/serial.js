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