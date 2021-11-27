let post_text = '', text_prev = '';
start();

 function start() {

  $.getJSON('https://www.reddit.com/r/LCDJS/hot/.json', function (data) {

	post_text = data.data.children[0].data.title;
 });

 if(text_prev != post_text) {

  $.post('http://localhost:3000/data', {

	text: post_text
  });
	console.log(text_prev);
	text_prev = post_text;
 }
	setTimeout(start, 1000);
}
