setTimeout(() => {
    console.clear();
}, 100);

const std = {
    autoScroll: true,
    html: null,
    color: '#ffffff',
    scroll: (y) => {
        std.autoScroll = y;
    },
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
        text = text.replace(/_/g, ' '); 
        std.html.innerHTML += `<span style="color:${std.color};"><a class="program-text">${RAM.mode}/></a> ${text}</span><br>`;
        if(std.autoScroll) std.html.scrollTop = std.html.scrollHeight;
    },
    gotValue(e) {
        let command = e.value;
        if(command.length > 0) {
            e.outerHTML = command;
            RAM.cmd_history.push(command);
            if(RAM.mode == 'compiler') { 
                compMode(command);
            } else if(RAM.mode == 'registry') {
                regMode(command);
            }
            std.scanf();
        }
    }
}

std.begin();
//command cicle
document.addEventListener('keydown', (e) => {
    if(RAM.history_index+1 < RAM.cmd_history.length) {
        if(e.keyCode == 38) std.html.querySelector('input').value = RAM.cmd_history[RAM.history_index++];
    }
    if(RAM.history_index > 0) {
        if(e.keyCode == 40) std.html.querySelector('input').value = RAM.cmd_history[RAM.history_index--];
    }
});
//logic
const invert = (bit) => { return bit ? 0 : 1; }
const repeat = (loops, f, delay=4) => {
    let i = 0;
    const l = setInterval(() => {
        if(i < loops) f(i++);
        else clearInterval(l);
    }, delay);
}
//data conversion
const dec = (bit_array) => { return parseInt(bit_array.join(''), 2); }
const bin = (int) => { return pad(int.toString(2).split('')); }
const pad = (bit_array) => {
    let l = 8-bit_array.length;
    for(let i = 0; i < l; i++) bit_array.unshift(0); 
    for(let i = 0; i < bit_array.length; i++) bit_array[i] = parseInt(bit_array[i]); 
    return bit_array; 
}

const compMode = (command) => {
    for(let i = 0; i < inst_set.c.wa.length; i++) {
        let c = command.split(' ');
        if(c[0] == inst_set.c.wa[i]) {
            RAM.f_params = c.slice(1);
            let ret = new Function(inst_set.f.wa[i])();
            if(ret) printf(ret);
            return;
        }
    }
    for(let i = 0; i < inst_set.c.na.length; i++) {
        if(command == inst_set.c.na[i]) {
            try {
                let ret = new Function(inst_set.f.na[i])();
                if(ret) printf(ret);
            } catch(e) {
                std.compilerMessage(`${e}.`);
            }
            return;
        }
    }
    std.compilerMessage('Command not found.');
}

const regMode = (command) => {
    for(let i = 0; i < inst_set.c.na.length; i++) {
        if(command == inst_set.c.na[i]) {
            try {
                let ret = new Function(inst_set.f.na[i])();
                if(ret) printf(ret);
                return;
            } catch(e) {
                std.compilerMessage(`${e}.`);
                return;
            }
        }
    }
    try {
        let v = command.split(' ');
        if(v[0] != undefined) {
            if(v[1] == undefined) v[1] = null;
            RAM.PROGMEM[`"${v[0]}"`] = v[1];
            std.compilerMessage(` Variable #${v[0]} in ram set to $${v[1]}.`);
        }
    } catch(e) {
        std.compilerMessage(`${e}.`);
    }
}

const exeProgram = (raw) => {
    let i = 0;
    let lines = raw.split('\n'); 
    let inp = std.html.getElementsByClassName('std-in')[0];
    if(inp)inp.outerHTML = 'running program...';
    loop();
    let int = setInterval(loop, 100);
    function loop() {
        if(i < lines.length) compMode(lines[i++]);
        else {
            clearInterval(int);
            std.scanf();
        }
    }
}
std.begin();