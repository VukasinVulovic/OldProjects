const Twitter = require('twitter');
const http = require('http');
const fs = require('fs');
const uuid = 'xxx';
let prev_date;


setInterval(() => {
  const curr_date = new Date().getDay();
  if(curr_date !== prev_date) {
    if(curr_date === 1 && curr_date === 5) postImage();
    prev_date = curr_date;
  }
}, 100);


const client = new Twitter({
  consumer_key: 'xxx',
  consumer_secret: 'xxx',
  access_token_key: 'xxx',
  access_token_secret: 'xxx'
});

function postImage() {
  const file = fs.createWriteStream('./image.png');
  const request = http.get(`http://crafatar.com/renders/body/${uuid}`, (res) => {
    res.pipe(file);
  });
  file.on('close', () => {
    client.post('media/upload', { media: fs.readFileSync('./image.png') }, (err, media, res) => {
      if(err) throw err;
      client.post("statuses/update", { status: `This is going to be Mumbo Jumbo's skin in his next episode of Hermicraft season VII.`, media_ids: media.media_id_string }, (e) => {
        if(e) throw e;
      });
    });
  });
}

