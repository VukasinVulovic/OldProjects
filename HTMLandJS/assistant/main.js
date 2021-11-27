let questions = [
  'how are you'
];

let answers = [
  'Good, how are you?'
];

let result = '';

addButton('start_button', 'START', 'default', function listen() {

   window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
   let recognition = new window.SpeechRecognition();

   recognition.onresult = (event) => {
     for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
       result = '';
       speakResult(event.results[i][0].transcript.toLowerCase());
       console.log(event.results[i][0].transcript.toLowerCase());
     }
   }
   recognition.start();
});

function speakResult(said) {
  for(let i = 0; i < questions.length; i++) {
    if(said.includes(questions[i])) {
      result = answers[i]
    }
  }
  responsiveVoice.speak(result);
  recognition.stop();
}
