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

//  function random(port=3000) {
//
//   if(this.ra == undefined || this.ra != false) {
//
//     serial('write', 'rand');
//     this.ra = true;
//   }
//
//   if(serial('read') == 0) {
//
//     this.temp = serial('read');
//   }
//
//   if(this.temp == 0) {
//
//     serial('write', ' ');
//     this.ra = true;
//     return this.temp;
//  }
// }
