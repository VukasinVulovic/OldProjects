document.getElementById('save_options').addEventListener('click', () => {    
    let temp = document.getElementById('adress').value;
    chrome.storage.sync.set({'extention-adress': temp}, function() {
        alert('saved!');
    });
});

