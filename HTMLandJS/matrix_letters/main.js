class Line {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.len = random(5, 20);
        this.chars = [];
        this.finished = false;
        this.char_list = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ:・."=*+-<>ç';
        this.frame_count = 0;
        this.spacing = 20;
        this.diss_after = random(80, 100);
        this.diss_rate = map(this.len, 5, 20, 0.1, 0.09);
        this.i = 0;
        this.inactive = 0;
        this.f_size = random(12, 24);
        this.o = map(this.f_size, 12, 24, 0.7, 1); 
    }

    create() {
        for(let i = 0; i < this.len; i++) {
            let el = Element('span');
            el.setAttribute('class', (i < this.len-1) ? 'chars' : 'last-char');
            el.style.top = `${this.y+(i*(this.spacing+this.f_size))}px`;
            el.style.left = `${this.x}px`;
            el.style.fontSize = `${this.f_size}pt`;
            el.style.opacity = this.o;
            el.innerHTML = random(this.char_list.split(''));
            this.chars[i] = el;
        }
    }

    render() {
        this.chars[this.chars.length-1].innerHTML = random(this.char_list.split(''));
        if(this.frame_count%4 == 0) {
            random(this.chars).innerHTML = random(this.char_list.split(''));
        }
        if(this.frame_count >= this.diss_after) {
            if(this.i < this.len-1) {
                this.i += this.diss_rate;
                this.inactive = this.len-(this.len-Math.floor(this.i))+1;
                let temp = this.chars[Math.floor(this.i)];
                temp.style.display = 'none';
            }
        } else this.frame_count++;
        if(this.inactive >= this.len && !this.finished) {
            for(let el of this.chars) document.body.removeChild(el);
            this.finished = true;
        }
    }
}

let text_lines = [];

function setup() {
    for(let i = 0; i < 100; i++) {
        text_lines[i] = new Line(random(0, WIDTH), 0);
        text_lines[i].create();
    }
}

function loop() {
    for(let line of text_lines) {
        line.render();
        if(line.finished) {
            text_lines = text_lines.filter((el) => { return el != line; });
            let l = new Line(random(0, WIDTH), 0)
            l.create();
            text_lines.push(l);
        }
    }
}