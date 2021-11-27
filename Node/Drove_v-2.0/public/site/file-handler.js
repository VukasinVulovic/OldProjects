let PICKED = false;
let FS = [];

const folders = {
    create: (name) => {
        const fullname = decodeURI(name);
        let n = decodeURI(name).slice(32);
        const container = document.querySelector('.wrapper');
        const a = document.createElement('a');
        const p = document.createElement('p');
        const div = document.createElement('div');
        const img = document.createElement('img');
        div.setAttribute('class', 'folder');
        img.setAttribute('class', 'folder-image');
        p.setAttribute('class', 'folder-name');
        a.setAttribute('class', 'folder-href');
        img.src = '/src/images/folder.png';
        img.draggable = false;
        p.innerText = n;
        a.href = `explore/${fullname}/`;
        a.onmouseover = (e) => {
            PICKED = encodeURI(fullname);
        }
        div.appendChild(img);
        div.appendChild(p);
        a.appendChild(div);
        container.appendChild(a);
    },
    remove: () => {
        for(let folder of document.querySelectorAll('.folder')) document.removeChild(folder);
    }
}

const files = {
    create: (name) => {
            const fullname = decodeURI(name);
            let n = decodeURI(name).slice(32);
            // if(n.length > 10) n = `${n.slice(10, n.length-4)}...${n.slice(n.length-4)}`;
            const container = document.querySelector('.wrapper');
            const a = document.createElement('a');
            const p = document.createElement('p');
            const img = document.createElement('img');
            const div = document.createElement('div');
            p.setAttribute('class', 'file-name');
            a.setAttribute('class', 'folder-href');
            img.setAttribute('class', 'file-image');
            div.setAttribute('class', 'file');
            img.src = '/src/images/file.png';
            img.alt = fullname;
            img.draggable = false;
            p.innerText = n;
            const re = location.href;
            const url = re.slice(re.indexOf('/', 8)+1).replace('explore/', '');
            a.href = `/viewfile/${url}${fullname}/`;
            a.onmouseover = (e) => {
                PICKED = encodeURI(fullname);
            }
            div.appendChild(img);
            div.appendChild(p);
            a.appendChild(div);
            container.appendChild(a);
        },
    remove: () => {
        for(let folder of document.querySelectorAll('.file')) document.removeChild(folder);
    }
}

function listDir(data) {
    resetContainer();
    for(let l of data) {
        if(l.type === 'folder') {
            if(l.name !== 'temp') folders.create(l.name);
        } else if(l.type === 'file') { 
            files.create(l.name);
        }
    }
}

function searchFile(q, files) {
    if(q != '' && q != ' ') {
        const results = [];
        for(let f of files) if(f.includes(q)) results.push(f);
        return results;
    } else return '';
}

setInterval(() => {
    const res = searchFile(document.querySelector('.search-bar').value, FS);
    const names = document.querySelectorAll('.folder-href');
    for(let n of names) {
        const fn = n.querySelector('p').innerText;
        n.style.color = 'rgb(26, 26, 26)';
        for(let r of res) n.style.color = (fn === r.slice(32)) ? 'rgb(255, 69, 1)' : 'rgb(26, 26, 26)';
    }
}, 200);