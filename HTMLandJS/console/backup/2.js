let RAM = {
    cmd_history: [],
    history_index: 0,
    mode: 'compiler',
    PROGMEM: {},
    f_params: []
}

const inst_set = {
    c: 
    {
        na: [
            'cls',
            'compiler',
            'registry',
            'list',
            'clear',
            'notone'
        ],
        wa: [
            'tone',
            'run',
            'printf',
            'color',
            'get'
        ]
    },
    f: {
        na: [
            'inst_set.exe.clearScreen()',
            'inst_set.exe.compMode()',
            'inst_set.exe.pokeMem()',
            'inst_set.exe.listMem()',
            'inst_set.exe.clearMem()',
            'inst_set.exe.stopTone()'
        ],
        wa: [
            'inst_set.exe.playTone()',
            'inst_set.exe.runProgram()',
            'inst_set.exe.printText()',
            'inst_set.exe.changeColor()',
            'inst_set.exe.getVar()'
        ]
    },
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
            if(RAM.mode == 'registry') {
                RAM.PROGMEM = {};
            } else {
                std.compilerMessage(`This command could only be acessed in registry mode.`);
            }  
        },
        compMode: () => {
            if(RAM.mode != 'registry') {
                std.compilerMessage(`Already in compiler mode.`);
            } else {
                std.html.innerHTML += `<a class="compiler-text">${RAM.mode}/></a> <i>compiler loaded sucssesfully!</i><br>`;
                RAM.mode = 'compiler';
            }
        },
        playTone: () => {
            if(RAM.f_params.length > 1) {
                if(!window.audio_context)window.audio_context = new AudioContext();
                window.oscillator = audio_context.createOscillator();
                window.oscillator.connect(audio_context.destination);
                window.oscillator.frequency.value = parseInt(RAM.f_params[0]);
                let type = null;
                if(RAM.f_params[1].includes('sine')) type = 'sine';
                else if(RAM.f_params[1].includes('square')) type = 'square';
                window.oscillator.type = type;
                window.oscillator.start(0);
            } else {
                std.compilerMessage('Error, missing paramater.');
            }
        },
        stopTone: () => {
            if(window.audio_context)window.oscillator.stop(0);
        },
        runProgram: () => {
            if(RAM.f_params.length > 0) {
                const xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if(this.readyState == 4 && this.status == 200) {
                        exeProgram(xhttp.responseText)
                    }
                }
                xhttp.open('GET', (RAM.f_params[0] == './') ? './code.run' : RAM.f_params[0], true);
                xhttp.send();
            }
        },
        printText: () => {
            if(RAM.f_params.length > 0) std.printf(RAM.f_params[0]);
            else std.compilerMessage('Error, missing paramater.');
        },
        changeColor: () => {
            if(RAM.f_params.length > 0) std.color = RAM.f_params[0];
        },
        getVar: () => {
            if(RAM.f_params.length > 0) console.log(RAM.PROGMEM[RAM.f_params[0]]);
            else std.compilerMessage('Error, missing paramater.');
        }
    }
}



