// Sound effects
const clickSound = new Audio('mixkit-modern-technology-select-3124.wav');

// ============================
// Sidebar Menu Toggle
// ============================
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


// ============================
// Online/Offline Status Banner
// ============================
const offlineStatus = document.querySelector("#offline-status");

// Show the banner with a message and auto-hide it after 4 seconds
function showBanner(message, bgColor = "#fce4ec", textColor = "#d81b60") {
    offlineStatus.textContent = message;
    offlineStatus.style.backgroundColor = bgColor;
    offlineStatus.style.color = textColor;
    offlineStatus.classList.add("show");

    setTimeout(() => {
        offlineStatus.classList.remove("show");
    }, 4000);
}

window.addEventListener("DOMContentLoaded", () => {
    if (!navigator.onLine) {
        showBanner("Offline Mode");
    }
});
window.addEventListener("offline", () => {
    showBanner("Offline Mode");
});
window.addEventListener("online", () => {
    showBanner("You're back online", "#e8f5e9", "#2e7d32");
});


// ============================
// Toast Notification Function
// ============================
function showToast(message, bgColor = "#f44336") {
    const toast = document.querySelector("#toast");
    toast.textContent = message;
    toast.style.backgroundColor = bgColor;
    toast.classList.add("show");

    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


// ============================
// Timer Logic
// ============================
const timerDisplay = document.querySelector("#timer");
let startTime, updatedTime, difference, tInterval;
let isRunning = false;

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


// ============================
// Play/Pause Button
// ============================
const playPauseBtn = document.querySelector("#playPause");
const playPauseIcon = playPauseBtn.querySelector("img");
playPauseBtn.addEventListener("click", () => {
    isRunning = !isRunning;
    clickSound.play(); // Play sound on button click
    const icon = playPauseBtn.querySelector("i");
    if (isRunning) {
        startTimer();
        playPauseIcon.src = "images/icons8-pause-30.png";
        playPauseIcon.alt = "Play Icon";
    } else {
        pauseTimer();
        playPauseIcon.src = "images/icons8-play-64.png";
        playPauseIcon.alt = "Pause Icon";
    }
});


// ============================
// Reset Button
// ============================
const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", () => {
    clearInterval(tInterval);
    difference = 0;
    isRunning = false;
    timerDisplay.innerHTML = `<span>00</span>:<span>00</span>:<span>00</span>:<span>00</span>`;
    playPauseIcon.src = "images/icons8-play-64.png";
    playPauseIcon.alt = "Play Icon";
});


// ============================
// Record Finish Time
// ============================
const recordBtn = document.querySelector("#recordBtn");
const recordList = document.querySelector("#recordList");

// Modal Elements
const runnerIdModal = document.querySelector("#runnerIdModal");
const runnerIdInput = document.querySelector("#runnerIdInput");
const modalCancel = document.querySelector("#modalCancel");
const modalOk = document.querySelector("#modalOk");

let pendingRecordTime = null;

let position = 1;

recordBtn.addEventListener("click", () => {
    if (!difference) return;

    pendingRecordTime = timerDisplay.textContent;
    runnerIdInput.value = "";
    runnerIdModal.style.display = "flex";
    runnerIdInput.focus();
});

modalCancel.addEventListener("click", () => {
    runnerIdModal.style.display = "none";
    pendingRecordTime = null;
});

modalOk.addEventListener("click", () => {
    const runnerId = runnerIdInput.value.trim();
    if (!runnerId) {
        showToast("⚠️ Runner ID is required.");
        return;
    }

    // Check for duplicate
    const existing = JSON.parse(localStorage.getItem("raceRecords")) || [];
    const duplicate = existing.find(r => r.runnerId.toLowerCase() === runnerId.toLowerCase());
    if (duplicate) {
        showToast(`⚠️ Runner ID "${runnerId}" already exists.`, "#f44336");
        return;
    }

    const newRow = document.createElement("article");
    newRow.classList.add("record-row");
    newRow.innerHTML = `
        <span>${position}</span>
        <span>${pendingRecordTime}</span>
        <span>${runnerId}</span>
    `;
    recordList.appendChild(newRow);
    newRow.scrollIntoView({ behavior: "smooth", block: "nearest" });

    existing.push({
        position: position,
        time: pendingRecordTime,
        runnerId: runnerId
    });
    localStorage.setItem("raceRecords", JSON.stringify(existing));

    position++;
    pendingRecordTime = null;
    runnerIdModal.style.display = "none";
});


window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        runnerIdModal.style.display = "none";
        pendingRecordTime = null;
    }
});


// ====================================
// Load Existing Records on Page Load
// ====================================
window.addEventListener("DOMContentLoaded", () => {
    const savedRecords = JSON.parse(localStorage.getItem("raceRecords")) || [];

    // Recreate each record row from the saved data
    savedRecords.forEach(record => {
        const newRow = document.createElement("article");
        newRow.classList.add("record-row");
        newRow.innerHTML = `
            <span>${record.position}</span>
            <span>${record.time}</span>
            <span>${record.runnerId || "N/A"}</span>
        `;
        recordList.appendChild(newRow);

        // Update the position counter based on the last record
        position = record.position + 1;
    });
});


// ============================
// Clear All Records Button
// ============================
const clearBtn = document.querySelector("#clearBtn");
clearBtn.addEventListener("click", () => {
    // Check if there are any saved records
    const hasRecords = recordList.querySelector(".record-row");

    if (!hasRecords) {
        alert("⚠️ No recorded results to clear.");
        return;
    }

    recordList.innerHTML = "";
    // Clear all saved records from localStorage
    localStorage.removeItem("raceRecords");
    // Reset position counter
    position = 1;
});


// ===============================
// Submit Button (POST to server)
// ===============================
const submitBtn = document.querySelector(".submit-btn");
submitBtn.addEventListener("click", async () => {
    const raceRecords = JSON.parse(localStorage.getItem("raceRecords")) || [];

    if (raceRecords.length === 0) {
        alert("No records to submit.");
        return;
    }

    try {
        const response = await fetch("/results", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ records: raceRecords })
        });

        if (response.ok) {
            alert("✅ Results submitted successfully!. Go to the results page(Menu) to see them.");
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


// ============================
// Night Mode Toggle
// ============================
const nightToggle = document.querySelector("#nightToggle");
// Load saved preference from localStorage
if (localStorage.getItem("nightMode") === "on") {
    document.body.classList.add("night-mode");
    nightToggle.checked = true;
}

// Toggle handler
nightToggle.addEventListener("change", () => {
    if (nightToggle.checked) {
        document.body.classList.add("night-mode");
        localStorage.setItem("nightMode", "on");
    } else {
        document.body.classList.remove("night-mode");
        localStorage.setItem("nightMode", "off");
    }
});
