// This function is used to toggle the menu box and the overlay
// when the menu icon is clicked
// and to close the menu box when clicking outside of it
document.addEventListener("DOMContentLoaded", function () {
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
});

// This function is used to toggle the play/pause button icon
const playPauseBtn = document.querySelector("#playPause");
let isRunning = false;

playPauseBtn.addEventListener("click", () => {
    isRunning = !isRunning;
    const icon = playPauseBtn.querySelector("i");
    icon.className = isRunning ? "fas fa-pause" : "fas fa-play";
});



function addRecord(position, time) {
    const recordList = document.getElementById('recordList');
    const record = document.createElement('div');
    record.classList.add('record-row');

    record.innerHTML = `
        <div class="record-position">#${position}</div>
        <div class="record-time">${time}</div>
    `;
    recordList.appendChild(record);
}

// Example usage    
addRecord(1, "00:34:12:45"); 
addRecord(2, "00:35:50:22"); 
addRecord(3, "00:36:15:10"); 
addRecord(4, "00:37:05:30"); 
addRecord(5, "00:38:20:15"); 
addRecord(6, "00:39:45:50"); 
addRecord(7, "00:40:10:25"); 
addRecord(8, "00:41:30:40"); 
addRecord(9, "00:42:05:15"); 
addRecord(10, "00:43:50:05"); 
addRecord(11, "00:44:20:30"); 
addRecord(12, "00:45:15:55"); 
addRecord(13, "00:46:40:10");
addRecord(14, "00:47:05:20"); 
addRecord(15, "00:48:30:35");        
addRecord(16, "00:49:55:45"); 
addRecord(17, "00:50:20:50"); 
addRecord(18, "00:51:10:15"); 
addRecord(19, "00:52:30:25"); 
addRecord(20, "00:53:45:35"); 


