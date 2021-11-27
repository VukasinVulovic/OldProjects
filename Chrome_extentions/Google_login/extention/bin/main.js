chrome.storage.sync.get(['extention-adress'], (data) => {
    adress = data['extention-adress'].toString();
    window.serialSocket0 = new WebSocket(`ws://${adress}:3000` || 'ws://localhost:3000');  
    window.serialSocket0.onopen = () => {    
      let data = location.href.toString().slice(location.href.toString().indexOf('?')+1);
      window.serialSocket0.send(decodeURI(data));
      setTimeout(() => {
        window.close();
      }, 4);  
    }
});