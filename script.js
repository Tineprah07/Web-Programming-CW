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
