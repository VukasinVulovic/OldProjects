let jokes = [];//array of jokes
let i = 1;//skips the ad

//grabs shit from reddit
 $.getJSON('http://www.reddit.com/r/Jokes/new/.json?limit=60', function (data) {
    $.each(data.data.children, function (i, item) {

      jokes.push(item.data.title + '<br>' + item.data.selftext);
 });
});

//crteate span element
 window.onclick = function createElement() {

    this.span = document.createElement('span');
    this.span.setAttribute('style', 'font-size: 40px;  text-align: center; display: block; color: #ffffff;');
    document.body.appendChild(this.span);
    Play(this.span);
}

//auto play
 function Play(element) {

    element.innerHTML = jokes[i];
    responsiveVoice.speak(jokes[i].replace('<br>', ''), 'UK English Male');
    i ++;
    setTimeout(function () { Play(element); }, 10000);
}
