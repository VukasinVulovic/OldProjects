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
let key = ['', ''];
generate();

 function generate() {

   key[0] = serial('read');

  if(key[1] != key[0]) {

   document.body.innerHTML = serial('read');
   key[1] = key[0];
 }

   setTimeout(generate, 4);
}
