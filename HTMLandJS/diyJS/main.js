//String--------------------------------------------------------
String.prototype.myLength = function() {
    let i = 0;
    while(this[i] !== undefined) i++;
    return this.length;
}

String.prototype.mySlice = function(start, end) {
    let temp = '';
    for(let i = start; i < end; i++) temp += this[i];
    return temp;
}

String.prototype.myIncludes = function(s='') {
    let i = 0;
    while(this[i] !== undefined) {
        if(this.mySlice(i, i+s.myLength()) == s) return true;
        else i++;
    }
    return false;
}

String.prototype.myIndexOf = function(s='') {
    let i = 0;
    while(this[i] !== undefined) {
        if(this.mySlice(i, i+s.myLength()) == s) return i;
        else i++;
    }
    return -1;
}

String.prototype.myLastIndexOf = function(s='') {
    let i = 0;
    while(this[i] !== undefined) {
        if(this.mySlice(i, i+s.myLength()) == s) this.i = i;
        i++;
    }
    return this.i || -1;
}

String.prototype.myReplace = function(o='', n='') {
    let i = 0;
    while(this[i] !== undefined) {
        if(this.mySlice(i, i+o.myLength()) === o) return `${this.mySlice(0, i)}${n}${this.mySlice(i+o.myLength(), this.myLength())}`;
        i++;
    }
    return '';
}

String.prototype.myToUpperCase = function() {
    let temp = '';
    let chars = { 'a': 'A', 'b': 'B', 'c': 'C', 'c': 'D', 'e': 'E', 'f': 'F', 'g': 'G', 'h': 'H', 'i': 'I', 'j': 'J', 'k': 'K', 'l': 'L', 'm': 'M', 'n': 'N', 'o': 'O', 'p': 'P', 'q': 'Q', 'r': 'R', 's': 'S', 't': 'T', 'u': 'U', 'v': 'V', 'w': 'W', 'x': 'X', 'y': 'Y', 'z': 'Z' }
    for(let i = 0; i < this.myLength(); i++) temp += chars[this.mySlice(i, i+1)] || this.mySlice(i, i+1);
    return temp;
}

String.prototype.myToLowerCase = function() {
    let temp = '';
    let chars = { 'A': 'a', 'B': 'b', 'C': 'c', 'D': 'd', 'E': 'e', 'F': 'f', 'G': 'g', 'H': 'h', 'I': 'i', 'J': 'j', 'K': 'k', 'L': 'l', 'M': 'm', 'N': 'n', 'O': 'o', 'P': 'p', 'Q': 'q', 'R': 'r', 'S': 's', 'T': 't', 'U': 'u', 'V': 'v', 'W': 'w', 'X': 'x', 'Y': 'y', 'Z': 'z' }
    for(let i = 0; i < this.myLength(); i++) temp += chars[this.mySlice(i, i+1)] || this.mySlice(i, i+1);
    return temp;
}

String.prototype.mySplit = function(c) {
    let temp = [];
    let j = 0, i = 0;
    while(this[i] !== undefined) {
        if(this.mySlice(i, i+c.myLength()) === c) {
            temp.push(this.mySlice(j, i));
            j = i+c.myLength();
        } 
        i++;
        if(i === this.myLength()) temp.push(this.mySlice(j, i));
    }
    return temp;
}

String.prototype.myToString = function() {
    return `${this}`;
} 
//Number--------------------------------------------------------
Number.prototype.myToString = function() {
    return `${this}`;
} 
//Misselanious--------------------------------------------------
const myTypeOf = (v) => {
    try {
        v.mySlice(0, 1);
        return 'String';
    } catch(e) {
        try {
            for(let l of v);
            return 'Object';
        } catch(c) {
            if(v/v === 1) return 'Number';
        }
    }
    return NaN;
} 
//Array---------------------------------------------------------
Array.prototype.myLength = function() {
    let i = 0;
    while(this[i] !== undefined) i++;
    return i;
}

Array.prototype.myFilter = function(e) {
    let temp = [];
    for(let i = 0; i < this.myLength(); i++) if(e(this[i]) === true) temp.push(this[i]);
    return temp;
}

Array.prototype.myFlat = function() {
    let temp = [];
    for(let i = 0; i < this.myLength(); i++) {
        let el = this[i];
        if(myTypeOf(el) == 'Object') {
            for(let j = 0; j < el.myLength(); j++)temp.push(el[j]);
        } else temp.push(el);
    }
    return temp;
}

Array.prototype.myToString = function() {
    return `${this}`;
} 
//Functions---------------------------------------------------------
window.myFor = function(counter, times, callback) {
    let x = setInterval(() => {
        if(counter < times) {
            callback(counter);
            counter++;
        } else clearInterval(x);
    });
    console.log(this.arguments);
}
//-----------------------------------------------------------
let string1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
let string2 = 'test 123 test #test *ahah* SHOUTING';
let string3 = 'aaa, bb, ccc, dddd';
let array1 = ['a', 'b', 'c', 'd', 1, 2, 3, true, false, [55, 33]];