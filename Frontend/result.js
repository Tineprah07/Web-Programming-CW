// ============================
// Sidebar Toggle Logic
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

// Fetch submitted results from server
// Function to load results from the backend
async function loadResults() {
    const resultsList = document.querySelector("#resultsList");

    resultsList.innerHTML = `<section class="record-row loading">Loading results...</section>`;
    try {
        // Fetch results from the server
        const response = await fetch("/results");
        const data = await response.json();

        if (!data || data.length === 0) {
            resultsList.innerHTML = "<p style='text-align:center;'>No results submitted yet.</p>";
            return;
        }

        // Replace loading with real content
        resultsList.innerHTML = "";
        data.forEach((record) => {
            const row = document.createElement("article");
            row.classList.add("record-row");
            row.innerHTML = `
                <span>${record.position}</span>
                <span>${record.time.replace(/\n/g, '')}</span>
                <span>${record.runnerId || 'N/A'}</span>
            `;

            resultsList.appendChild(row);
        });

    } catch (err) {
        console.error("Failed to fetch results:", err);
        resultsList.innerHTML = "<section class='record-row loading'>❌ Failed to load results.</section>";
    }
}
window.addEventListener("DOMContentLoaded", loadResults);


// ============================
// Delete All Results
// ============================
const deleteBtn = document.querySelector("#deleteResultsBtn");
deleteBtn.addEventListener("click", async () => {
    const resultsList = document.querySelector("#resultsList");
    // Check if any result rows exist
    const hasResults = resultsList.querySelector(".record-row");

    if (!hasResults) {
        alert("⚠️ No results submitted.");
        return;
    }

    const confirmDelete = confirm("Are you sure you want to delete all race results?");
    if (!confirmDelete) return;

    try {
        const response = await fetch("/results", {
            method: "DELETE"
        });

        if (response.ok) {
            alert("✅ All results deleted.");
            loadResults(); // Refresh list
        } else {
            alert("❌ Failed to delete results.");
        }
    } catch (error) {
        console.error("Error deleting results:", error);
        alert("⚠️ Network error. Try again later.");
    }
});

// ============================
// Export Results as CSV
// ============================
const csvBtn = document.querySelector("#downloadCsvBtn");
csvBtn.addEventListener("click", async () => {
    try {
        const response = await fetch("/results");
        const data = await response.json();

        if (!data || data.length === 0) {
            alert("⚠️ No results to export.");
            return;
        }

        let csvContent = "data:text/csv;charset=utf-8,Position,Time,Runner ID\n";
        data.forEach(record => {
            const cleanTime = record.time.replace(/\s+/g, '').replace(/\n/g, '');
            csvContent += `${record.position},${cleanTime},${record.runnerId || ''}\n`;
        });

        // Trigger CSV download
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Race Results.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (err) {
        console.error("❌ Failed to export CSV:", err);
        alert("⚠️ Error exporting to CSV.");
    }
});



// ============================
// Online/Offline Status Banner
// ============================
const offlineStatus = document.querySelector("#offline-status");
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
window.addEventListener("DOMContentLoaded", () => {
    if (!navigator.onLine) {
        showBanner("Offline Mode");
    }
});
window.addEventListener("offline", () => {
    showBanner("Offline Mode");
});
window.addEventListener("online", () => {
    showBanner("You're back online", "#e8f5e9", "#2e7d32"); // Green style
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

nightToggle.addEventListener("change", () => {
    if (nightToggle.checked) {
        document.body.classList.add("night-mode");
        localStorage.setItem("nightMode", "on");
    } else {
        document.body.classList.remove("night-mode");
        localStorage.setItem("nightMode", "off");
    }
});
