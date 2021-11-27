function createBoard() {
    let canvas = Element('canvas', 'board');
    canvas.width = '640';
    canvas.height = '640';
    CANVAS = canvas.getContext('2d');
    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    let cfg = properties_config.general;
    for(let i = 0; i < cfg.num; i++) 
        properties.push(new Property(i*cfg.size.width, 0, cfg.size.width, cfg.size.height, properties_config.data[properties.length]));//top 
    for(let i = 0; i < cfg.num; i++) 
        properties.push(new Property(cfg.size.width*cfg.num-cfg.size.width, i*cfg.size.height+cfg.size.height, cfg.size.width, cfg.size.height, properties_config.data[properties.length]));//right
    for(let i = cfg.num; i > 0; i--) 
        properties.push(new Property(i*cfg.size.width-cfg.size.width, cfg.size.height*cfg.num+cfg.size.height, cfg.size.width, cfg.size.height, properties_config.data[properties.length]));//bottom
    for(let i = cfg.num; i > 0; i--) 
        properties.push(new Property(0, i*cfg.size.height, cfg.size.width, cfg.size.height, properties_config.data[properties.length]));//left
    player = new Player(general.player.width, general.player.height);
    GUI.player = player; 
}

class Property {
    constructor(x, y, width, height, data) {
        this.src = data.texture;
        this.width = width || 40;
        this.height = height || 40;
        this.x = x || 0;
        this.y = y || 0;
        this.img = this.create();
        this.data = data;
    }
    create() {
        let img = new Image(this.width, this.height);
        img.src = this.src;
        return img;
    }
    render() {
        CANVAS.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

class Player {
    constructor(width, height) {
        this.name = 'PP';
        this.src = general.player.skin;
        this.width = width || 40;
        this.height = height || 40;
        this.x = properties[0].x;
        this.y = properties[0].y;
        this.img = this.create();
        this.balance = 1000;
        this.throw = true;
        this.properties = {
            owned: [],
            on: {
                index: 0,
                data: properties[0].data
            }
        }
    }
    create() {
        let img = new Image(this.width, this.height);
        img.src = this.src;
        return img;
    }
    render() {
        CANVAS.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    go(num=1) {
        if(this.throw) {
            this.properties.on.index += num;
            this.properties.on.index = (this.properties.on.index >= properties_config.general.num*4) ? 0 : this.properties.on.index;
            this.x += (properties[this.properties.on.index].x-this.x);
            this.y += (properties[this.properties.on.index].y-this.y);
            this.properties.on.data = properties[this.properties.on.index].data;
            this.checkProperty();
        } else GUI.message(general.messages.wrong_turn);
    }   
    checkProperty() {
        let pos = this.properties.on;
        if(!pos.data.owner) {
            if(this.balance >= pos.data.price) {
                GUI.buy_button();         
            } else {
                GUI.message(general.messages.poor);
            }
        } else if(pos.data.owner != this.name && pos.data.owner != 'game') {
            let temp = general.messages.tax; 
            GUI.message(temp[0] + pos.data.owner + temp[1] + pos.data.fee + temp[2]);
            this.pay(pos.data.fee);
        }
    }
    pay(ammount) {
        this.balance -= Math.abs(ammount);
        if(this.balance <= 0) {
            document.write('<h1 style="display: block; text-align: center;">GAME OVER, <br> YOU ARE BROKE.</h1>')
        }
    }
    get(ammount) {
        this.balance += Math.abs(ammount);
    }
}

let GUI = {
    player: null,
    warning: {
        size: 54,
        color: '#00000'
    },
    display: function() {
        if(this.player) {
            let st = Element('div', 'status');
            let s = Element('div', 'balance');
            st.appendChild(s);
            s.innerText = `You have ${this.player.balance} russian rubles.`;
            s = Element('div', 'price');
            st.appendChild(s);
            s.innerText = `This property costs ${this.player.properties.on.data.price || '∞'} russian rubles.`;
            s = Element('div', 'owner');
            st.appendChild(s);
            s.innerText = `Owner of this property is ${this.player.properties.on.data.owner || 'no one'}.`;
        }
    },
    message: function(msg) {
        if(msg) {
            let t = addText('message', msg, 400, 0, this.warning.size, this.warning.color, '-');
            setTimeout(() => {
                document.body.removeChild(t);
            }, 500);
        }
    },
    throw_button: function() {
        let b = Element('button', 'throw_die');
        b.addEventListener('click', () => {
            if(this.player) {
                if(grab('buy_prop'))document.body.removeChild(grab('buy_prop'));
                this.player.go(random(0, 6));
                // this.player.throw = false;
            }
        });
    },
    buy_button: function() {
        let b = Element('button', 'buy_prop');
        b.addEventListener('click', () => {
            if(this.player) {
                document.body.removeChild(b);
                let pos = this.player.properties.on;
                properties[pos.index].data.owner = this.player.name;
                this.player.properties.owned.push(pos.data);
                this.player.pay(pos.data.price);
                GUI.message(general.messages.bought);
            }
        });
    } 
}