const Dis = require('discord.js')
const client = new Dis.Client();
let general_channel, attachment;

 client.on('message', (receivedMessage) => {
   if(receivedMessage.author != client.user && receivedMessage.author.toString() == '<@yyyy>') {

        console.log('Ian typed a message.');
        client.user.setActivity('with code.');
        attachment = new Dis.Attachment('xxxx.yyyy');
        general_channel = client.channels.get('xxxx');
        general_channel.send('yyyy');
        general_channel.send(attachment);
 }
});
client.login('xxx.yyy');
