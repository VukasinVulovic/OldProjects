let date = new Date();

 function test() {
  $.post('http://localhost:3000/data', {

	text: date.getHours().toString() + ':' + date.getMinutes().toString()
 });
}
