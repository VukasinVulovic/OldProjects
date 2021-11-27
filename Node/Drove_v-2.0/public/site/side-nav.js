const container = document.querySelector('.wrapper');

function resetContainer() {
    container.innerHTML = '';
}

const nav_item_ = {
    My_HDD: () => void(0),
    Favourites: () => void(0),
    Download_all: () => {
        ws.send(`{
            "action": "download-folder",
            "url": "${location.href}",
            "name": "/"
        }`);
    },
    // Connect: () => void(0),
    Report_a_bug: () => void(0),
    Data_tracker: () => {
        resetContainer();
        ws.send(`{
            "url": "${location.href}",
            "action": "get-storage-stats"
        }`);
    },
    Log_out: () => {
        ws.send(`{
            "url": "${location.href}",
            "action": "log-out"
        }`);
    },
    // Order_Premium: () => void(0)
}

function itemSelection() {
    const nav = document.querySelector('.navigator-bar');
    const items = nav.querySelectorAll('span');
    nav_item_.My_HDD();
    items[0].classList.add('higlight-item');
    for(let i = 0; i < items.length; i++) {
        items[i].onclick = (e) => {
            if(e.target != document.querySelector('.navigator-bar').querySelector('.higlight-item')) {
                nav.querySelector('.higlight-item').classList.remove('higlight-item');
                items[i].classList.add('higlight-item');
                let f = e.target.innerText.slice(1);
                new Function(`nav_item_.${f.replace(/ /g, '_')}()`)();
            }
        }
    }
}
