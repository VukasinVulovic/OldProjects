let i = 0;

document.querySelector('.generate-button').addEventListener('click', () => {
    let img = document.querySelector('#image').value;
    img = `./bin/src/images/properties/${img.slice(img.indexOf('fakepath')+9)}`;
    let name = document.querySelector('#name').value;
    let price = document.querySelector('#price').value;
    let fee = document.querySelector('#fee').value;
    let build = document.querySelector('#build').value;
    document.querySelector('.map-code').innerHTML += `
        {
            &nbsp;name: "${name}",
            &nbsp;owner: null,
            &nbsp;price: ${price},
            &nbsp;fee: ${fee},
            &nbsp;buildings: {
                &nbsp;&nbsp;price: ${build},
                &nbsp;&nbsp;has: []
            &nbsp;},
            &nbsp;texture: "${img}"
        },<br>
    `;
    document.querySelector('.count').innerHTML = `${++i} properies made`;

});
