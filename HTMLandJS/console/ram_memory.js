let RAM = {
    cmd_history: [],
    history_index: 0,
    global_fequency: 1000,
    mode: 'compiler',
    cmd_line_index: 0,
    cmd_break: false,
    cmd_code_line_temp: [],
    PROGMEM: {},
    f_params: []
}

const inst_set = {
    c: [
        'cls',
        'compiler',
        'registry',
        'list',
        'clear',
        'notone',
        'tone',
        'run',
        'printf',
        'color',
        'set',
        'get',
        'goto',
        'tick',
        'autoremove',
        'invert'
    ],
    f: [
        'inst_set.exe.clearScreen()',
        'inst_set.exe.compMode()',
        'inst_set.exe.pokeMem()',
        'inst_set.exe.listMem()',
        'inst_set.exe.clearMem()',
        'inst_set.exe.stopTone()',
        'inst_set.exe.playTone()',
        'inst_set.exe.runProgram()',
        'inst_set.exe.printText()',
        'inst_set.exe.changeColor()',
        'inst_set.exe.setVar()',//needs finishing
        'inst_set.exe.getVar()',//needs finishing
        'inst_set.exe.goTo()',
        'inst_set.exe.setF()',
        'inst_set.exe.autoRemove()',
        'inst_set.exe.invertBit()'
    ],
    exe: {
        clearScreen: () => {
            std.html.innerHTML = '';
        },
        pokeMem: () => {
            if(RAM.mode == 'compiler') {
                std.html.innerHTML = '<a class="title">******memory registry editor*****</a>';
                RAM.mode = 'registry';
            } else {
                std.compilerMessage(`Already in registry mode.`);
            }
        },
        listMem: () => {
            if(RAM.mode == 'registry') {
                for(let [key, value] of Object.entries(RAM.PROGMEM)) {
                    std.printf(`<a class="value">Variable ${key} has a value of ${value}.</a>`);
                }
            } else {
                std.compilerMessage(`This command could only be acessed in registry mode.`);
            }
        },
        clearMem: () => {
            if(RAM.mode == 'registry') RAM.PROGMEM = {};
            else std.compilerMessage(`This command could only be acessed in registry mode.`);
        },
        compMode: () => {
            if(RAM.mode != 'registry') std.compilerMessage(`Already in compiler mode.`);
            else {
                std.html.innerHTML += `<a class="compiler-text">${RAM.mode}/></a> <i>compiler loaded sucssesfully!</i><br>`;
                RAM.mode = 'compiler';
            }
        },
        playTone: () => {
            if(!window.audio_context)window.audio_context = new AudioContext();
            window.oscillator = audio_context.createOscillator();
            window.oscillator.connect(audio_context.destination);
            window.oscillator.frequency.value = parseInt(RAM.f_params[0]);
            let type = null;
            if(RAM.f_params[1].includes('sine')) type = 'sine';
            else if(RAM.f_params[1].includes('square')) type = 'square';
            window.oscillator.type = type;
            window.oscillator.start(0);
        },
        stopTone: () => {
            if(window.audio_context)window.oscillator.stop(0);
        },
        runProgram: () => {
            if(RAM.f_params.length > 0) {
                try {
                    const xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function() {
                        if(this.readyState == 4 && this.status == 200) exeProgram(xhttp.responseText);
                    }
                    xhttp.open('GET', (!RAM.f_params[0]) ? './code.run' : `./${RAM.f_params[0]}.run`, true);
                    xhttp.send();
                } catch(e) {
                    std.compilerMessage('File system error, file not found.');
                }
            }
        },
        printText: () => {
            if(RAM.f_params.length > 0) std.printf(RAM.f_params[0]);
            else std.compilerMessage('Error, missing paramater.');
        },
        changeColor: () => {
            if(RAM.f_params.length > 0) std.color = RAM.f_params[0];
        },
        setVar: () => {//needs finishing
            if(RAM.f_params.length > 1) {
                RAM.PROGMEM[`"${RAM.f_params[0]}"`] = RAM.f_params[1];
                std.compilerMessage(` Variable #${RAM.f_params[0]} in ram set to $${RAM.f_params[1]}.`);
            } else std.compilerMessage('Error, missing paramaters.');
        },
        getVar: () => {//needs finishing
            if(RAM.f_params.length > 0) {
                let val = RAM.PROGMEM[`"${RAM.f_params[0]}"`];
                if(val) std.printf('<a class="compiler-error">Variable #' + RAM.f_params[0] + ' has a value of $' + val + '.</a>');
                else std.compilerMessage('Error, no variable set in ram.');
            }
            else std.compilerMessage('Error, missing paramater.');
        },
        goTo: () => {
            std.autoRemove = true;
            if(RAM.f_params.length > 0) RAM.cmd_line_index = RAM.f_params[0]-1;
            else std.compilerMessage('Error, missing paramater.');
        },
        setF: () => {
            if(RAM.f_params.length > 0) RAM.global_fequency = RAM.f_params[0];
            else std.compilerMessage('Error, missing paramater.');
        },
        autoRemove: () => {
            std.autoRemove = true;
            std.compilerMessage('Character overflow remover enabled.');
        },
        invertBit: () => {
            if(RAM.f_params.length > 0) {
                console.log(parseInt(RAM.f_params[0]));
                std.printf(parseInt(RAM.f_params[0]) ? '0' : '1');
            }
        }
    }
}

//logic
// const invert = (bit) => { return bit ? 0 : 1; }
// const repeat = (loops, f, delay=4) => {
//     let i = 0;
//     const l = setInterval(() => {
//         if(i < loops) f(i++);
//         else clearInterval(l);
//     }, delay);
// }
//data conversion
// const dec = (bit_array) => { return parseInt(bit_array.join(''), 2); }
// const bin = (int) => { return pad(int.toString(2).split('')); }
// const pad = (bit_array) => {
//     let l = 8-bit_array.length;
//     for(let i = 0; i < l; i++) bit_array.unshift(0); 
//     for(let i = 0; i < bit_array.length; i++) bit_array[i] = parseInt(bit_array[i]); 
//     return bit_array; 
// }