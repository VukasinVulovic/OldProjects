let stream, source, socket, name, names = [];
const paramaters = urlParamaters(location.href);

navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(s => {
  stream = s;
});

window.onload = () => {
  document.querySelector('.name_box').value = paramaters['name'] || ''
  document.querySelector('.begin_connection')
    .addEventListener('click', callButton);
}

function callButton() {
  let name_element = document.querySelector('.name_box');
  let name = document.querySelector('.name_box').value;
  if(name.length > 1 && name.length <= 20) {
    document.body.removeChild(document.querySelector('.name_input'));
    document.querySelector('.participants').innerHTML = '';
    startTheCall(name);
  } else {
    name_element.style.borderStyle = 'solid';
    name_element.style.borderColor = '#ff0000';
    document.querySelector('.participants').innerHTML = '<b>Name must be more than 2 characters and less then 20 cahracters.</b>';
  }
}

function startTheCall(as_name) {
  socket = new WebSocket(`wss://${paramaters['server_ip']}:${paramaters['port']}`);
  socket.onerror = () => {
    document.querySelector('.participants').innerHTML = `Sorry, <br>the connection to the server could not be made.<br>(ಥ∩ಥ)`;
  }
  name = as_name;
  socket.onopen = () => {
    setInterval(() => {
      const recorder = new MediaRecorder(stream);
      recorder.start(1000);
      recorder.ondataavailable = e => {
        if(recorder.state != 'inactive') {
          let reader = new FileReader();
          reader.readAsDataURL(new Blob([e.data], { type: 'audio/ogg' })); 
          reader.onloadend = function() {
            let base64data = reader.result;                
            source = base64data;
            socket.send(`{"name":"${name}", "chunk":"${source}"}`);
            recorder.stop();
          }
        }
      }
    }, 1000);
  }
  socket.onmessage = (data) => {
    let received_user = JSON.parse(data.data);
    document.querySelector('.participants').innerHTML = `Talking with: ${received_user.name}`;
    let audio = new Audio(received_user.chunk);
    audio.play();
  }
}