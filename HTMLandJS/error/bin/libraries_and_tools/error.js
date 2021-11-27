 try {

   alert(ok);
 } catch (e) {

   createErrorMsg(e);
}

 function createErrorMsg(e) {

   this.images = ['https://media.giphy.com/media/uA0tbmX4tQDVC/giphy.gif', 'https://i.imgur.com/x1xNxfz.gif', 'https://cdn-images-1.medium.com/max/800/0*t4JGr1GXZ3qf3Cod', 'https://media.giphy.com/media/5bb1VF7g1ENceLblRC/giphy.gif','https://media1.tenor.com/images/90a6f9eae5a6643a1b5f7401a7ff0153/tenor.gif', 'https://media2.giphy.com/media/yNrwV10PKqzhC/giphy.gif', 'http://giphygifs.s3.amazonaws.com/media/oGsCtcD0gLvSE/giphy.gif'];
   this.text = document.createElement('p');
   this.img = document.createElement('img');
   this.img.setAttribute('style', 'width: 200px; height: 200px; border-radius: 1px; margin-right: auto; margin-left: auto; display: block; box-shadow: 4px 4px 8px black;');
   this.text.setAttribute('style', 'margin-right: auto; margin-left: auto; margin-top: 20px; display: block; text-align: center; text-shadow: 1px 1px 2px #333333; color: #00004d; font-size: 30px; font-family: "Times New Roman", Times, serif;');
   this.img.src = this.images[Math.floor(Math.random()*(this.images.length - 0) + 0)];
   this.text.innerHTML = e;
   document.body.appendChild(this.img);
   document.body.appendChild(this.text);
}
