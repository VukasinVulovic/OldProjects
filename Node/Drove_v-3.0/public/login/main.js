(() => {
    const button = document.querySelector('.sign-in-button');
    const input = document.querySelector('.sign-in-box-input');
    setPlaceholder(input);
    button.onclick = () => {
        checkEmail(input.value, () => {
            button.style.display = 'none';
            sendForm(input.value);
            input.style.outlineColor = 'rgb(82, 81, 81)';
        }, () => {
            input.style.outlineColor = 'rgb(216, 0, 0)';
            input.select();
        });
    }
})();

function setPlaceholder(input) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', 'https://drove.mywire.org/generate-paceholder', false);
    xmlHttp.send();
    input.placeholder = xmlHttp.responseText;
}

function checkEmail(email, callback, error) {
    const at_com = (email.indexOf('@') > 0 && email.indexOf('.') > 0);
    if(!at_com) return error();
    const at_to_com = email.slice(email.indexOf('@'), email.indexOf('.'));
    if(at_to_com < 0) return error();
    callback();
}

function sendForm(email) {
    const form = document.createElement('form');
    const input = document.createElement('input');
    form.action = '/login-handler';
    input.type = 'email';
    input.name = 'email';
    input.value = email;
    input.style.display = 'none';
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
}