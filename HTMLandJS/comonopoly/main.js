let properties = [],
    player;

function setup() {
    createBoard();
    GUI.throw_button();
}

function loop() {
    refresh();
    for(let prop of properties) prop.render();
    player.render();
    GUI.display();
}


/* 
    uncomment unlimited throws
    create designer
    add multiplayer 
*/