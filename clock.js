document.addEventListener("DOMContentLoaded",()=>{
//getting html elements
const input_ampm = document.querySelector(".input-ampm");
const input_hour = document.querySelector(".input-hours");
const input_min = document.querySelector(".input-min");
const input_sec = document.querySelector(".input-sec");
const btnAlarm = document.querySelector(".btn-alarm");
const clock = document.querySelector("#current-time");

const alarmForm = document.getElementById('alarm-form');
const alarmsList = document.getElementById('alarms');
let alarms = [];

const alarmSound = new Audio();

//check current time
function currentTime(){

    let date = new Date();
    let hour = date.getHours()>12?date.getHours()-12:date.getHours();
    let min =date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes();
    let seconds = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
    let amPm = date.getHours<12 ? "AM":"PM";
    clock.textContent = `${hour}:${min}:${seconds} ${amPm}`;
}
//set alarm
alarmForm.addEventListener("submit",(e) =>{
    e.preventDefault();
    let hour = input_hour.value;
    let min = input_min.value;
    let sec = input_sec.value;
    let ampm = input_ampm.value;
    const alarmTime = `${hour}:${min}:${sec} ${ampm}`;
    const alarmId = Date.now();
    alarms.push({id:alarmId,time:alarmTime});
    // if(hour == "" || min == "" || sec==""){
    //     alert("fields should not be empty");
    //     // return;
    // }
    displayAlarms();
    alarmForm.reset();
})
//display alarms
function displayAlarms(){
    alarmsList.innerHTML = '';
    alarms.forEach(alarm=>{
        const li = document.createElement("li");
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = alarm.time;
        const deleteBtn = document.createElement("button");
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click",() => removeAlarm(alarm.id));
        li.appendChild(deleteBtn);
        alarmsList.appendChild(li);
        console.log(alarmsList);
    })
}
//remove alarm
function removeAlarm(id){
    alarms = alarms.filter(a=>a.id !== id);
    displayAlarms();
}
//check alarms
function checkAlarms(){
    const now = new Date();
    const currentTime = `${now.getHours() > 12 ? now.getHours() - 12 : now.getHours()}:${now.getMinutes()<10 ? "0"+now.getMinutes():now.getMinutes()}:${now.getSeconds()<10?"0"+now.getSeconds():now.getSeconds()} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
        alarms.forEach(alarm => {
            console.log(alarm.time+"-----0000000--------");
            console.log(currentTime);
            console.log("0-0000000");
            if (alarm.time == currentTime) {
                alert('Alarm ringing!');
                console.log(alarm.time+"-----0001230000--------");
            console.log(currentTime);
            console.log("0-0000000154");
                
            alarmSound.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // Working alarm sound URL from SoundHelix
            alarmSound.play().catch(error => {
                console.error('Error playing sound:', error);
            });
                removeAlarm(alarm.id);
            }
        });         
       
}

setInterval(currentTime,1000);
setInterval(checkAlarms,1000);
currentTime();
});