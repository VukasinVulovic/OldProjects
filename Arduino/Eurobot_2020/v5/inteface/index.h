const char html_code[] PROGMEM = R"=====(
<!DOCTYPE html>
<html lang='en' dir='ltr'>
  <head>
    <meta charset='utf-8'>
    <title>Controller</title>
    <style type='text/css'>
      body { display: flex; justify-content: center; align-items: center; height: 100%; }            
      #W, #S, #A, #D, #E, #stop { -webkit-user-select: none; background-color: #000000; padding: 1em 1.5em; text-decoration: none; text-transform: uppercase; color: #ffffff; position: absolute; border: none; }            
      #W { top: 0; }            
      #S { bottom: 0; }           
      #A { left: 0; top: 50%; }            
      #D { right: 0; top: 50%; }
      #E { background-color: #0011ff; right: 0; top: 0; }            
      #stop { background-color: #ff0000; top: 50%; }        
    </style>
  </head>
  <body>
    <script type='text/javascript'>
      let data = '', data_prev = '';
      let ids = ['E', 'W', 'S', 'stop', 'A', 'D'];            
      let labels = ['servo1', 'forwards', 'backwards', 'stop', 'left', 'right'];
      function onTouchscreen() {  
        try {  
          document.createEvent('TouchEvent');  
          return true;  
        } catch (e) {  
          return false;  
        }  
      }
      function transmit(content) {
        let server = new XMLHttpRequest();    
        server.open('POST', `${location.href}${content}`, true);
        server.setRequestHeader('Content-Type', 'application/text');
        server.send();
      }
      for(let i = 0; i < ids.length; i++) {                
        let button = document.createElement('button');                
        document.body.appendChild(button);                
        button.id = ids[i];                
        button.innerHTML = labels[i];                     
        if(onTouchscreen()) {
          button.ontouchstart = () => transmit(labels[i]);
          button.ontouchend = () => transmit('stop');
        } else {
          button.onmousedown = () => transmit(labels[i]);
          button.onmouseup = () => transmit('stop'); 
        }
      }
      document.addEventListener('keydown', (key) => {
        switch(key.keyCode) {
          case 87: data = 'forwards'; break;
          case 83: data = 'backwards'; break;
          case 65: data = 'left'; break; 
          case 68: data = 'right'; break; 
          case 32: data = 'stop'; break;
        }
        if(data_prev != data && data != '') transmit(data); data_prev = data;
      });
      document.addEventListener('keyup', (key) => {
        let k = key.keyCode;
        if(k == 87 || k == 83 || k == 65 || k == 68) transmit('stop');
        data_prev = '';
      });            
    </script>
  </body>
</html>
)=====";

const char easter_data[] PROGMEM = R"=====(
<!DOCTYPE html>
<html>
  <body>
    <p>
      <h1>My battery is low and it's getting dark.</h1>
    </p>
  </body>
</html>
)=====";


const char handle_data[] PROGMEM = R"=====(
<!DOCTYPE html>
<html>
  <body>
    <p>
      <h1>Sub to Pewds.</h1>
      <h3>
        <i>I know it's a dead meme, but i don't give a crap.</i>
      </h3>
    </p>
  </body>
</html>
)=====";


const char purpose_data[] PROGMEM = R"=====(
<!DOCTYPE html>
<html>
  <body>
    <p>
      <h1>I pass butter, Rick.</h1>
    </p>
  </body>
</html>
)=====";
