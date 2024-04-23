const startButton = document.getElementById('start')
const countdownEl = document.getElementById("timer-display");

let intervalID = 0;
let timeoutID = 0;
function changeBreak() {
    clearInterval(intervalID);
    clearTimeout(timeoutID);
    startButton.classList = 'start';
    startButton.textContent = 'start';
    countdownEl.textContent = `${startingMinutes}:00`;
    countdownEl.textContent = "5:00";
    countdownEl.classList = 'break';
}
function changeWork() {
    clearInterval(intervalID);
    clearTimeout(timeoutID);
    startButton.classList = 'start';
    startButton.textContent = 'start';
    countdownEl.textContent = `${startingMinutes}:00`;
    countdownEl.textContent = "25:00";
    countdownEl.classList = 'work';
}
document.getElementById("break").onclick = changeBreak;
document.getElementById("work").onclick = changeWork;



let startingMinutes = 25;
function setStartingMinutes() {
    if (countdownEl.classList == "break") {
        startingMinutes = 5;
    } else {
        startingMinutes = 25;
    }
}

setStartingMinutes();
let time = startingMinutes * 60 - 1;

function updateCountdown() {
    const minutes = Math.floor(time/60);
    let seconds = time % 60;
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    if (time == 0) {
        if (countdownEl.classList == 'work') {
            changeWork();
        } else {
            changeBreak();
        }
    } else {
        countdownEl.textContent = `${minutes}:${seconds}`;
        time--;
    }
}


function startCountdown() {
    if (startButton.classList == 'restart') {
        clearInterval(intervalID);
        startButton.classList = 'start';
        startButton.textContent = 'start';
        countdownEl.textContent = `${startingMinutes}:00`;
        time = startingMinutes * 60 - 1;
    } else  {
        setStartingMinutes();
        time = startingMinutes * 60 - 1;
        intervalID = setInterval(updateCountdown, 1000);
        startButton.textContent = 'restart';
        startButton.classList = 'restart';
    }
}
startButton.onclick = startCountdown;

function startClock() {
    var date = new Date();
   
    var hour = date.getHours();
    var minute = date.getMinutes();
   
    var period = "";
   
    if (hour >= 12) {
        period = "PM";
    } else {
        period = "AM";
    }
   
    if (hour == 0) {
        hour = 12;
    } else {
        if (hour > 12) {
            hour = hour - 12;
        }
    }

   
    hour = update(hour);
    minute = update(minute); 
   
    countdownEl.textContent = `${hour}:${minute} ${period}`;
   
    timeoutID = setTimeout(startClock, 1000);
}
   
function update(t) {
    if (t < 10) {
        return "0" + t;
    }
    else {
        return t;
    }
}
function changeClock() {
    countdownEl.classList = 'clock';
    clearInterval(intervalID);
    startButton.classList = 'hidden';
    startClock();
}

document.getElementById("clock").onclick = changeClock;


// if click timer menu buttons then change background


//if click background, then background color will change to be blue

// function changeColor() {
//     //if (document.getElementById('body').style.backgroundColor == #BBD0C0)
//     document.body.style.backgroundColor = "#C8D8E6";
//     h1Elements = document.getElementsByTagName("h1")
//     // for(var i = 0; i <h1Elements.length; i++) {
//     //     h1Elements[i].style.color = "#AAB8C8"
//     // }
//     document.getElementById("work-timer-display").style.color = "#4A5A69";
//     document.getElementById("work-timer-display").style.textShadow = "5px 5px 0px #AABAC8";
//     document.getElementById("work").style.color = "#88A3BE";
//     document.getElementById("break").style.color = "#88A3BE";
//     document.getElementById("clock").style.color = "#88A3BE";
//     document.getElementById("background").style.color = "#88A3BE";
//     document.getElementById("start").style.backgroundColor = "#A9BED2";


// }
// document.getElementById("background").onclick = changeColor;


const inputbox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputbox.value == "") {
        alert("please write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputbox.value = "";
    saveData();
 }
 document.getElementById("add-task-button").onclick = addTask;

 listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
 }, false);

 function saveData () {
    localStorage.setItem("data", listContainer.innerHTML);

 }
 function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
 }
 showTask();