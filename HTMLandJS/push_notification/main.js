devMode();
document.body.style.backgroundColor = 'rgb(255, 255, 255)';

function setup() {

}

function loop() {
}

addButton('start', 'SEND', `position: absolute; left: ${((window.innerWidth/2)-100)}px; font-size: 40px;`, () => {
  notification('JavaScript.', 'The best programming language.');
}); 

