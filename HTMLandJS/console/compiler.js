setTimeout(() => {
    console.clear();
}, 100);

const std = {
    autoScroll: true,
    autoRemove: false,
    html: null,
    color: '#ffffff',
    begin: () => { 
        let container = document.createElement('div');
        container.setAttribute('class', 'console');
        document.body.appendChild(container);
        container.innerHTML += `<a class="compiler-text">${RAM.mode}/></a> <i>compiler loaded sucssesfully!</i><br>`; 
        container.style.fontSize = '14pt';
        std.html = container;
        std.scanf();
    },
    scanf() {
        let inp = document.createElement('input');
        inp.type = 'text';
        inp.setAttribute('class', 'std-in');
        inp.style.fontSize = std.html.style.fontSize;
        inp.contenteditable = true;
        std.html.innerHTML += `<span style="color:${std.color};" class="std-input"><a class="program-text">${RAM.mode}/></a> ` + inp.outerHTML.replace('>', `onkeydown="if(event.keyCode == 13) std.gotValue(this)" autoselect></span><br>`);
        std.html.getElementsByTagName('input')[0].select();
    },
    compilerMessage: (text) => {
        std.html.innerHTML += `<a class="compiler-text">compiler/></a> <a class="compiler-error">${text}</a><br>`;
    },
    size: (s) => {
        std.html.style.fontSize = `${s}pt`;
    },
    printf: (text) => {
        text = text.replace(/_/g, '&nbsp;'); 
        std.html.innerHTML += `<span style="color:${std.color};"><a class="program-text">${RAM.mode}/></a> ${text}<br></span>`;
        if(std.autoScroll) std.html.scrollTop = std.html.scrollHeight;
        if(std.autoRemove) {
            let els = std.html.getElementsByTagName('span');
            if(els.length > 18) std.html.removeChild(els[0]);
        }
    },
    gotValue(e) {
        let command = e.value;
        if(command.length > 0) {
            e.outerHTML = command;
            RAM.cmd_history.push(command);
            if(RAM.mode === 'compiler') compMode(command);
            else if(RAM.mode === 'registry') regMode(command);
            std.scanf();
        }
    }
}

std.begin();
//command cicle and code break
document.addEventListener('keydown', (e) => {
    if(RAM.history_index+1 < RAM.cmd_history.length && e.keyCode === 38) std.html.querySelector('input').value = RAM.cmd_history[RAM.history_index++];
    if(RAM.history_index > 0 && e.keyCode === 40) std.html.querySelector('input').value = RAM.cmd_history[RAM.history_index--];
    if(e.keyCode === 27) RAM.cmd_break = true;
});

const compMode = (command) => {
    for(let i = 0; i < inst_set.c.length; i++) {
        let c = command.split(' ');
        if(c[0] === inst_set.c[i]) {
            RAM.f_params = c.slice(1);
            new Function(inst_set.f[i])();
            return;
        }
    }
    std.compilerMessage('Command not found.');
}

const regMode = (command) => {
    for(let i = 0; i < inst_set.c.length; i++) {
        if(command === inst_set.c[i]) {
            try {
                let ret = new Function(inst_set.f[i])();
                if(ret !== undefined) std.printf(ret);
                return;
            } catch(e) {
                std.compilerMessage(`${e}.`);
                return;
            }
        }
    }
    try {
        let v = command.split(' ');
        if(v[0] !== undefined) {
            if(v[1] === undefined) v[1] = null;
            RAM.PROGMEM[`"${v[0]}"`] = v[1];
            std.compilerMessage(` Variable #${v[0]} in ram set to $${v[1]}.`);
        }
    } catch(e) {
        std.compilerMessage(`${e}.`);
    }
}

const exeProgram = (raw) => {
    let lines = raw.split('\n'); 
    let inp = std.html.getElementsByClassName('std-in')[0];
    if(inp)inp.outerHTML = 'running program...';
    cmd_code_line_temp = lines;
    loop();
    let int = setInterval(loop, 1000/RAM.global_fequency);
    function loop() {
        if(RAM.cmd_line_index < lines.length && !RAM.cmd_break) {
            if(RAM.mode === 'compiler') compMode(lines[RAM.cmd_line_index]);
            else if(RAM.mode === 'registry') regMode(lines[RAM.cmd_line_index]);
            console.log(lines[RAM.cmd_line_index]);
            RAM.cmd_line_index++;
        } else {
            RAM.cmd_line_index = 0;
            RAM.cmd_break = false;
            std.autoRemove = false;
            clearInterval(int);
            std.scanf();
        }
    }
}
std.begin();