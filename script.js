// script.js

// SIDEBAR TOGGLE
const menuBtn = document.querySelector("#menu-icon");
const menuBox = document.querySelector("#menu-box");
const body = document.querySelector("body");

menuBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    menuBox.classList.toggle("active");
    menuBtn.classList.toggle("pushed");
    body.classList.toggle("overlay-active");
});

document.addEventListener("click", function (event) {
    if (!menuBox.contains(event.target) && !menuBtn.contains(event.target)) {
        menuBox.classList.remove("active");
        menuBtn.classList.remove("pushed");
        body.classList.remove("overlay-active");
    }
});


// TIMER LOGIC
const timerDisplay = document.querySelector("#timer");
let startTime, updatedTime, difference, tInterval;
let isRunning = false;

function formatTime(num) {
    return num < 10 ? "0" + num : num;
}

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor(difference / (1000 * 60 * 60));
    let mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let secs = Math.floor((difference % (1000 * 60)) / 1000);
    let millis = Math.floor((difference % 1000) / 10);

    timerDisplay.innerHTML = `
        <span>${formatTime(hours)}</span>:
        <span>${formatTime(mins)}</span>:
        <span>${formatTime(secs)}</span>:
        <span>${formatTime(millis)}</span>
    `;
}

function startTimer() {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(updateTimer, 10);
}

function pauseTimer() {
    clearInterval(tInterval);
}

// PLAY/PAUSE BUTTON
const playPauseBtn = document.querySelector("#playPause");
playPauseBtn.addEventListener("click", () => {
    isRunning = !isRunning;
    const icon = playPauseBtn.querySelector("i");
    if (isRunning) {
        startTimer();
        icon.className = "fas fa-pause";
    } else {
        pauseTimer();
        icon.className = "fas fa-play";
    }
});

// RESET BUTTON
const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", () => {
    clearInterval(tInterval);
    difference = 0;
    isRunning = false;
    timerDisplay.innerHTML = `<span>00</span>:<span>00</span>:<span>00</span>:<span>00</span>`;
    playPauseBtn.querySelector("i").className = "fas fa-play";
});

// RECORD FINISH TIME
const recordBtn = document.querySelector("#recordBtn");
const recordList = document.querySelector("#recordList");
let position = 1;

recordBtn.addEventListener("click", () => {
    if (!difference) return;
    const newRow = document.createElement("div");
    newRow.classList.add("record-row");
    newRow.innerHTML = `
        <div>${position}</div>
        <div>${timerDisplay.textContent}</div>
    `;
    recordList.appendChild(newRow);
    position++;
});

// CLEAR BUTTON
const clearBtn = document.querySelector("#clearBtn");
clearBtn.addEventListener("click", () => {
    recordList.innerHTML = "";
    position = 1;
});

// SUBMIT BUTTON (placeholder for now)
const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", () => {
    alert("Submit functionality coming soon!");
});
