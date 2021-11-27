let date;
let date_processed;
sendDate();

 function sendDate() {

    date = new Date();
    date_processed = date.toString();
    console.log(date_processed.slice(0, 32));
    serial('write', date_processed.slice(0, 32), 3000);
    setTimeout(sendDate, 5000);
}
