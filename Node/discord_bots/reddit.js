const subreddit = 'memes';
let images = [], x = 0, general_channel;
const request = require('request');
const Dis = require('discord.js');
const client = new Dis.Client();

 client.on('ready', function () {

   setTimeout(timer, 100);
});

 request('https://www.reddit.com/r/' + subreddit + '/hot/.json?limit=100', function (error, response, body) {
  for(this.i = 0; this.i < 100; this.i ++) {

   images.push(JSON.parse(body).data.children[this.i].data.url);
 }
});

 function timer() {

  if(x >= 100) {

    x = 0;
 }

    data = images[x];
    console.log(data);
    x ++;
    sendImage();
    setTimeout(timer, 60000);
}

 function sendImage() {

     general_channel = client.channels.get('xxx');
     this.attachment = new Dis.Attachment(data);
     general_channel.send(this.attachment);
}

 client.login('xxx.yyy');
