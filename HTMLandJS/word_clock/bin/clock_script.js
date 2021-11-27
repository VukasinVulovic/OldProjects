let letters = [
    ['I ', 'T', 'R', 'I', 'S', 'C', 'T', 'E', 'N', 'H', 'A', 'L', 'F'],
    ['Q', 'U', 'A', 'R', 'T', 'E', 'R', 'T', 'W', 'E', 'N', 'T', 'Y'],
    ['F', 'I', 'V', 'E', 'C', 'M', 'I', 'N', 'U', 'T', 'E', 'S', 'H'],
    ['P', 'A', 'S', 'T', 'T', 'O', 'E', 'O', 'N', 'E', 'T', 'W', 'O'],
    ['T', 'H', 'R', 'E', 'E', 'F', 'O', 'U', 'R', 'F', ' I', 'V', 'E'],
    ['S', 'I', 'X', 'S', 'E', 'V', 'E', 'N', 'E', 'I', 'G', 'H', 'T'],
    ['N', 'I', 'N', 'E', 'T', 'E', 'N', 'E', 'L', 'E', 'V', 'E', 'N'],
    ['T', 'W', 'E', 'L', 'V', 'E', 'L', 'O', 'C', 'L', 'O', 'C', 'K']
];

let date;
let sequence = create2dArray(letters.length, letters[0].length);
resetClock();

function resetClock() {
  for(let i = 0; i < letters.length; i++) {
    for(let j = 0; j < letters[0].length; j++) {
      sequence[i][j] = 0;
    }
  }
}

function clock() {
    date = new Date();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = parseInt((minutes < 10) ? ('0'+minutes) : minutes);

    sequence[0][0] = 1;//I
    sequence[0][1] = 1;//T
    sequence[0][3] = 1;//I
    sequence[0][4] = 1;//S

    //minutes
    if(minutes >= 0 && minutes < 5) {
        resetClock();
        sequence[7][7] = 1;
        sequence[7][8] = 1;
        sequence[7][9] = 1;
        sequence[7][10] = 1;
        sequence[7][11] = 1;
        sequence[7][12] = 1;
    }
    
    if(minutes >= 5 && minutes < 10) {
        resetClock();
        //five
        sequence[2][0] = 1;
        sequence[2][1] = 1;
        sequence[2][2] = 1;
        sequence[2][3] = 1;
        //past
        sequence[3][0] = 1;
        sequence[3][1] = 1;
        sequence[3][2] = 1;
        sequence[3][3] = 1;
        //minutes word
        sequence[2][5] = 1;
        sequence[2][6] = 1;
        sequence[2][7] = 1;
        sequence[2][8] = 1;
        sequence[2][9] = 1;
        sequence[2][10] = 1;
        sequence[2][11] = 1;
    }

    if(minutes >= 10 && minutes < 20) {
        resetClock();
        //ten
        sequence[0][6] = 1;
        sequence[0][7] = 1;
        sequence[0][8] = 1;
        //past
        sequence[3][0] = 1;
        sequence[3][1] = 1;
        sequence[3][2] = 1;
        sequence[3][3] = 1;
        //minutes word
        sequence[2][5] = 1;
        sequence[2][6] = 1;
        sequence[2][7] = 1;
        sequence[2][8] = 1;
        sequence[2][9] = 1;
        sequence[2][10] = 1;
        sequence[2][11] = 1;
    }

    if(minutes >= 15 && minutes < 20) {
        resetClock();
        //quarter
        sequence[1][0] = 1;
        sequence[1][1] = 1;
        sequence[1][2] = 1;
        sequence[1][3] = 1;
        sequence[1][4] = 1;
        sequence[1][5] = 1;
        sequence[1][6] = 1;
        //past
        sequence[3][0] = 1;
        sequence[3][1] = 1;
        sequence[3][2] = 1;
        sequence[3][3] = 1;
    }

    if(minutes >= 20 && minutes < 25) {
        resetClock();
        //twenty
        sequence[1][7] = 1;
        sequence[1][8] = 1;
        sequence[1][9] = 1;
        sequence[1][10] = 1;
        sequence[1][11] = 1;
        sequence[1][12] = 1;
        //past
        sequence[3][0] = 1;
        sequence[3][1] = 1;
        sequence[3][2] = 1;
        sequence[3][3] = 1;
        //minutes word
        sequence[2][5] = 1;
        sequence[2][6] = 1;
        sequence[2][7] = 1;
        sequence[2][8] = 1;
        sequence[2][9] = 1;
        sequence[2][10] = 1;
        sequence[2][11] = 1;
    }

    if(minutes >= 25 && minutes < 30) {
        resetClock();
        //tweny
        sequence[1][7] = 1;
        sequence[1][8] = 1;
        sequence[1][9] = 1;
        sequence[1][10] = 1;
        sequence[1][11] = 1;
        sequence[1][12] = 1;
        //five
        sequence[2][0] = 1;
        sequence[2][1] = 1;
        sequence[2][2] = 1;
        sequence[2][3] = 1;
        //past
        sequence[3][0] = 1;
        sequence[3][1] = 1;
        sequence[3][2] = 1;
        sequence[3][3] = 1;
        //minutes word
        sequence[2][5] = 1;
        sequence[2][6] = 1;
        sequence[2][7] = 1;
        sequence[2][8] = 1;
        sequence[2][9] = 1;
        sequence[2][10] = 1;
        sequence[2][11] = 1;
    }

    if(minutes >= 30 && minutes < 35) {
        resetClock();
        //half
        sequence[0][9] = 1;
        sequence[0][10] = 1;
        sequence[0][11] = 1;
        sequence[0][12] = 1;
        //past
        sequence[3][0] = 1;
        sequence[3][1] = 1;
        sequence[3][2] = 1;
        sequence[3][3] = 1;
    }

    if(minutes >= 35 && minutes < 40) {
        resetClock();
        //twenty
        sequence[1][7] = 1;
        sequence[1][8] = 1;
        sequence[1][9] = 1;
        sequence[1][10] = 1;
        sequence[1][11] = 1;
        sequence[1][12] = 1;
        //five
        sequence[2][0] = 1;
        sequence[2][1] = 1;
        sequence[2][2] = 1;
        sequence[2][3] = 1;
        //to
        sequence[3][4] = 1;
        sequence[3][5] = 1;
        //minutes word
        sequence[2][5] = 1;
        sequence[2][6] = 1;
        sequence[2][7] = 1;
        sequence[2][8] = 1;
        sequence[2][9] = 1;
        sequence[2][10] = 1;
        sequence[2][11] = 1;
        //hour
        if(hours != 12) {
            hours++;
        } else {
            hours = 1;
        }
    }

    if(minutes >= 40 && minutes < 45) {
        resetClock();
        //twenty
        sequence[1][7] = 1;
        sequence[1][8] = 1;
        sequence[1][9] = 1;
        sequence[1][10] = 1;
        sequence[1][11] = 1;
        sequence[1][12] = 1;
        //to
        sequence[3][4] = 1;
        sequence[3][5] = 1;
        //minutes word
        sequence[2][5] = 1;
        sequence[2][6] = 1;
        sequence[2][7] = 1;
        sequence[2][8] = 1;
        sequence[2][9] = 1;
        sequence[2][10] = 1;
        sequence[2][11] = 1;
        //hour
        if(hours != 12) {
            hours++;
        } else {
            hours = 1;
        }
    }

    if(minutes >= 45 && minutes < 50) {
        resetClock();
        //quarter
        sequence[1][0] = 1;
        sequence[1][1] = 1;
        sequence[1][2] = 1;
        sequence[1][3] = 1;
        sequence[1][4] = 1;
        sequence[1][5] = 1;
        sequence[1][6] = 1;
        //to
        sequence[3][4] = 1;
        sequence[3][5] = 1;
        //hour
        if(hours != 12) {
            hours++;
        } else {
            hours = 1;
        }
    }

    if(minutes >= 50 && minutes < 55) {
        resetClock();
        //ten
        sequence[0][6] = 1;
        sequence[0][7] = 1;
        sequence[0][8] = 1;
        //to
        sequence[3][4] = 1;
        sequence[3][5] = 1;
        //minutes word
        sequence[2][5] = 1;
        sequence[2][6] = 1;
        sequence[2][7] = 1;
        sequence[2][8] = 1;
        sequence[2][9] = 1;
        sequence[2][10] = 1;
        sequence[2][11] = 1;
        //hour
        if(hours != 12) {
            hours++;
        } else {
            hours = 1;
        }
    }

    if(minutes >= 55 && minutes < 60) {
        resetClock();
        //five
        sequence[2][0] = 1;
        sequence[2][1] = 1;
        sequence[2][2] = 1;
        sequence[2][3] = 1;
        //to
        sequence[3][4] = 1;
        sequence[3][5] = 1;
        //minutes word
        sequence[2][5] = 1;
        sequence[2][6] = 1;
        sequence[2][7] = 1;
        sequence[2][8] = 1;
        sequence[2][9] = 1;
        sequence[2][10] = 1;
        sequence[2][11] = 1;
        //hour
        if(hours != 12) {
            hours++;
        } else {
            hours = 1;
        }
    } 

    switch(hours) {
        case 1:
          sequence[3][7] = 1;
          sequence[3][8] = 1;
          sequence[3][9] = 1;
        break;
        case 2:
          sequence[3][10] = 1;
          sequence[3][11] = 1;
          sequence[3][12] = 1;
        break;
        case 3:
          sequence[4][0] = 1;
          sequence[4][1] = 1;
          sequence[4][2] = 1;
          sequence[4][3] = 1;
          sequence[4][4] = 1;
        break;
        case 4:
          sequence[4][5] = 1;
          sequence[4][6] = 1;
          sequence[4][7] = 1;
          sequence[4][8] = 1;
        break;
        case 5:
          sequence[4][9] = 1;
          sequence[4][10] = 1;
          sequence[4][11] = 1;
          sequence[4][12] = 1;
        break;
        case 6:
          sequence[5][0] = 1;
          sequence[5][1] = 1;
          sequence[5][2] = 1;
        break;
        case 7:
          sequence[5][3] = 1;
          sequence[5][4] = 1;
          sequence[5][5] = 1;
          sequence[5][6] = 1;
          sequence[5][7] = 1;
        break;
        case 8:
          sequence[5][8] = 1;
          sequence[5][9] = 1;
          sequence[5][10] = 1;
          sequence[5][11] = 1;
          sequence[5][12] = 1;
        break;
        case 9:
          sequence[6][0] = 1;
          sequence[6][1] = 1;
          sequence[6][2] = 1;
          sequence[6][3] = 1;
        break;
        case 10:
          sequence[6][4] = 1;
          sequence[6][5] = 1;
          sequence[6][6] = 1;
        break;
        case 11:
          sequence[6][7] = 1;
          sequence[6][8] = 1;
          sequence[6][9] = 1;
          sequence[6][10] = 1;
          sequence[6][11] = 1;
          sequence[6][12] = 1;
        break;
        case 12:
          sequence[7][0] = 1;
          sequence[7][1] = 1;
          sequence[7][2] = 1;
          sequence[7][3] = 1;
          sequence[7][4] = 1;
          sequence[7][5] = 1;
        break;
    }
}