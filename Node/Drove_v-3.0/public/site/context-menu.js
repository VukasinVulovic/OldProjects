window.addEventListener('click', (e) => {
    if(container.querySelector('.select-menu')) container.removeChild(container.querySelector('.select-menu'));
});

window.addEventListener('contextmenu', createContextMenu);

const contextmenu_items = {
    container: [
        {
            name: 'Upload file',
            icon: 'fa fa-upload',
            f: (e) => {
                const form = document.createElement('form');
                const input = document.createElement('input');
                const submit = document.createElement('button');
                input.type = 'file';
                input.name = 'file';
                input.multiple = 'multiple';
                input.style.display = 'none';
                submit.type = 'submit';
                submit.style.display = 'none';
                form.style.display = 'none';
                form.target = 'print';
                // form.target = '_self';
                form.method = 'post';
                form.enctype = 'multipart/form-data';
                form.action = `/upload-file?url=${encodeURI(location.href)}`;
                form.onsubmit = () => {
                    const iframe = document.createElement('iframe');
                    iframe.name = 'print';
                    iframe.setAttribute('style', 'width:0; height 0;');
                    document.body.appendChild(iframe);
                    setTimeout(() => { 
                        location.reload();
                    }, 1000);
                }
                form.appendChild(input);
                form.appendChild(submit);
                container.appendChild(form);
                input.click();
                input.onchange = () => {
                    submit.click();
                    container.removeChild(form);
                }
                loading.start();
            }
        },
        // {
        //     name: 'Download all',
        //     icon: 'fa fa-floppy-o',
        //     f: (e) => {
        //         ws.send(`{
        //             "username": "${USER.username}",
        //             "password": "${USER.password}",
        //             "action": "download-folder",
        //             "url": "${location.href}",
        //             "name": "/"
        //         }`);
        //     }
        // },
        {
            name: 'New folder',
            icon: 'fa fa-folder',
            f: (e) => {
                let input = document.createElement('input');
                input.type = 'text';
                input.setAttribute('class', 'enter_name');
                input.value = 'New folder';
                let container = document.querySelector('.wrapper');
                let div = document.createElement('div');
                div.setAttribute('class', 'folder');
                let img = document.createElement('img');
                img.src = '/src/images/folder.png';
                img.draggable = false;
                img.setAttribute('class', 'folder-image');
                let p = document.createElement('p');
                p.setAttribute('class', 'folder-name');
                p.style.textAlign = 'left';
                p.appendChild(input);
                div.appendChild(img);
                div.appendChild(p);
                container.appendChild(div);
                input.focus();
                input.select();
                input.onkeydown = (e) => {
                    if(e.keyCode == 13) {
                        if(e.target.value.length > 0) {
                            ws.send(`{
                                "action": "create-folder",
                                "url": "${location.href}",
                                "name": "${encodeURI(e.target.value)}"
                            }`);
                            p.innerText = e.target.value;
                            div.title = e.target.value;
                            img.alt = e.target.value;
                            img.title = e.target.value;
                            p.style.textAlign = 'center';
                        } else e.preventDefault();
                    }
                }
            }
        }
    ],
    on_folder: [
        {
            name: 'Download folder',
            icon: 'fa fa-floppy-o',
            f: () => {
                ws.send(`{
                    "action": "download-folder",
                    "url": "${location.href}",
                    "name": "${PICKED}"
                }`);
            }
        },
        // {
        //     name: 'Share folder',
        //     icon: 'fa fa-sitemap',
        //     f: void(0)
        // },
        // {
        //     name: 'Favourites',
        //     icon: 'fa fa-heart-o',
        //     f: void(0)
        // },
        {
            name: 'Delete folder',
            icon: 'fa fa-bitbucket',
            f: (e) => {
                ws.send(`{
                    "action": "delete-folder",
                    "url": "${location.href}",
                    "name": "${PICKED}"
                }`);
                loading.start();
            }
        }
    ],
    on_file: [
        {
            name: 'Download file',
            icon: 'fa fa-floppy-o',
            f: (e) => {
                const re = location.href;
                const url = re.slice(re.indexOf('/', 8)+1).replace(/explore\//g, '');
                open(`/downloadfile/data/${url}${SELECTED.alt}`, '_blank');
            }
        },
        // {
        //     name: 'Share file',
        //     icon: 'fa fa-sitemap',
        //     f: void(0)
        // },
        // {
        //     name: 'Favourites',
        //     icon: 'fa fa-heart-o',
        //     f: void(0)
        // },
        {
            name: 'Delete file',
            icon: 'fa fa-bitbucket',
            f: (e) => {
                ws.send(`{
                    "action": "delete-folder",
                    "url": "${location.href}",
                    "name": "${PICKED}"
                }`);
                loading.start();
            }
        }
    ]
}

function createContextMenu(e) {
    e.preventDefault();
    SELECTED = e.target;
    let pos = 'container';
    if( e.target.classList[0] === 'folder' || 
        e.target.classList[0] === 'folder-image' ) pos = 'on_folder';
    if( e.target.classList[0] === 'file' || 
        e.target.classList[0] === 'file-image' ) pos = 'on_file';
    if(!container.querySelector('.select-menu')) {
        const nav = document.createElement('nav');
        nav.setAttribute('class', 'select-menu');
        for(let item of contextmenu_items[pos]) {
            const span = document.createElement('span');
            span.setAttribute('class', 'select-menu-option');
            const i = document.createElement('span');
            i.setAttribute('class', item.icon);
            span.appendChild(i);
            span.innerHTML += ` ${item.name}`;
            span.onclick = (e) => item.f(e);
            // nav.style.height = `${((pos === 'container') ? 98 : 70)}px`;
            nav.appendChild(span);
        }
        e.pageX = e.clientX +
            (document.documentElement && document.documentElement.scrollLeft || document.body && document.body.scrollLeft || 0) -
            (document.documentElement && document.documentElement.clientLeft || document.body && document.body.clientLeft || 0);
        e.pageY = e.clientY +
            (document.documentElement && document.documentElement.scrollTop  || document.body && document.body.scrollTop  || 0) -
            (document.documentElement && document.documentElement.clientTop  || document.body && document.body.clientTop  || 0 );
        nav.style.left = `${e.pageX}px`;    
        nav.style.top = `${e.pageY}px`;
        container.appendChild(nav);
    } else container.removeChild(container.querySelector('.select-menu'));
}
