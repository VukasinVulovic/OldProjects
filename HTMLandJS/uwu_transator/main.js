let i = 0;//cutter of 1
let temp1 = '';//temp1orary string
let input = '';//input_box element
let output = '';//output_box element
setup();//start the setup loop

 function setup() {

    input = document.getElementById('In').value;//declare input element
    document.getElementById('Out').innerHTML = output;//declare output element
    setTimeout(setup, 100);//reset the setup loop with 100ms delay
}

 function process() {

   i = 0;//reset cutter of 1
   temp1 = '';//reset temp1orary string
   output = '';//reset output_box element
   processor();//start processing
}

 function processor() {
  while(i <= input.length-1) {

    temp1 = input.slice(i, i+1);// cut the input string
    i ++;//add 1 to i
  switch (temp1) {

    case 'r':
      output += 'w';
      break;

    case 'R':
      output += 'W';
      break;

    case 'l':
      output += 'wu';
      break;

    case 'L':
      output += 'Wu';
      break;

    case 'u':
        output += 'wuw';
        break;

    case 'U':
        output += 'Wuw';
        break;

     default:
      output += temp1;
  }
    processor();//reset the processor loop
    temp1 = '';//reset temp1
    if(i == input.length-1) { break; }
 }
}

function copy() {

  document.getElementById('Out').select();//select output
  document.execCommand('copy');//copy
  alert('Copied!');
}
