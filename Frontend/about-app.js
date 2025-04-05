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

// NIGHT MODE TOGGLE
const nightToggle = document.querySelector("#nightToggle");

// Load saved preference
if (localStorage.getItem("nightMode") === "on") {
    document.body.classList.add("night-mode");
    nightToggle.checked = true;
}

nightToggle.addEventListener("change", () => {
    if (nightToggle.checked) {
        document.body.classList.add("night-mode");
        localStorage.setItem("nightMode", "on");
    } else {
        document.body.classList.remove("night-mode");
        localStorage.setItem("nightMode", "off");
    }
});
