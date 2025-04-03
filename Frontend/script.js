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

// ONLINE/OFFLINE STATUS
// This function checks the online/offline status of the browser
const offlineStatus = document.querySelector("#offline-status");

// Show the banner with a message and auto-hide it after 4 seconds
function showBanner(message, bgColor = "#fce4ec", textColor = "#d81b60") {
    offlineStatus.textContent = message;
    offlineStatus.style.backgroundColor = bgColor;
    offlineStatus.style.color = textColor;
    offlineStatus.classList.add("show");

    // Auto-hide after 4 seconds
    setTimeout(() => {
        offlineStatus.classList.remove("show");
    }, 4000);
}
// Check connection status on page load
window.addEventListener("DOMContentLoaded", () => {
    if (!navigator.onLine) {
        showBanner("Offline Mode");
    }
});
// When the device goes offline
window.addEventListener("offline", () => {
    showBanner("Offline Mode");
});
// When the device comes back online
window.addEventListener("online", () => {
    showBanner("You're back online", "#e8f5e9", "#2e7d32"); // Green style
});


// TIMER LOGIC
// Initialize the timer
const timerDisplay = document.querySelector("#timer");
let startTime, updatedTime, difference, tInterval;
let isRunning = false;

// Set up the timer display
function formatTime(num) {
    return num < 10 ? "0" + num : num;
}

// Function to update the timer display
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

// Function to start the timer
function startTimer() {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(updateTimer, 10);
}

// Function to pause the timer
function pauseTimer() {
    clearInterval(tInterval);
}

// PLAY/PAUSE BUTTON
// This button toggles between play and pause
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
    if (!difference) return; // Don't record if the timer hasn't started

    // Create a new record row
    const newRow = document.createElement("div");
    newRow.classList.add("record-row");
    newRow.innerHTML = `
        <div>${position}</div>
        <div>${timerDisplay.textContent}</div>
    `;
    recordList.appendChild(newRow);

    // Automatically scroll to the bottom of the record list
    newRow.scrollIntoView({ behavior: "smooth", block: "nearest" });

    // Save the record to the local storage
    // Get existing records (or create an empty array if none)
    const existing = JSON.parse(localStorage.getItem("raceRecords")) || [];

    // Add the new record to the array
    existing.push({
        position: position,
        time: timerDisplay.textContent
    });

    // Save the updated array back to local storage
    localStorage.setItem("raceRecords", JSON.stringify(existing));

    // Update the position for the next record
    position++;
});

// Load race records from localStorage when the page first loads
window.addEventListener("DOMContentLoaded", () => {
    const savedRecords = JSON.parse(localStorage.getItem("raceRecords")) || [];

    // Recreate each record row from the saved data
    savedRecords.forEach(record => {
        const newRow = document.createElement("div");
        newRow.classList.add("record-row");
        newRow.innerHTML = `
            <div>${record.position}</div>
            <div>${record.time}</div>
        `;
        recordList.appendChild(newRow);

        // Update the position counter based on the last record
        position = record.position + 1;
    });
});


// CLEAR BUTTON
const clearBtn = document.querySelector("#clearBtn");
clearBtn.addEventListener("click", () => {
    // Remove all record rows from the UI
    recordList.innerHTML = "";

    // Clear all saved records from localStorage
    localStorage.removeItem("raceRecords");

    // Reset position counter
    position = 1;
});


// SUBMIT BUTTON (placeholder for now)
const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", async () => {
    const raceRecords = JSON.parse(localStorage.getItem("raceRecords")) || [];

    if (raceRecords.length === 0) {
        alert("No records to submit.");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/results", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ records: raceRecords })
        });

        if (response.ok) {
            alert("✅ Results submitted successfully!");
            localStorage.removeItem("raceRecords");
            location.reload(); // Clear the UI
        } else {
            alert("❌ Submission failed. Try again later.");
        }
    } catch (error) {
        console.error("Error submitting results:", error);
        alert("⚠️ Network error. Are you connected?");
    }
});

