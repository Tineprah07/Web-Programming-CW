// This helps me to run on my local server and on mobile for testing
// Set BASE_URL to auto-switch between local and mobile
// Remember to delete this line when submitting
const BASE_URL = window.location.hostname === "localhost"
  ? "http://localhost:8080"
  : "http://10.3.30.143:8080";

  
// Toggle sidebar
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
    const resultsList = document.getElementById("resultsList");

    // Show loading state immediately
    resultsList.innerHTML = `<div class="record-row loading">Loading results...</div>`;

    try {
        // Fetch results from the server
        const response = await fetch(`${BASE_URL}/results`);
        const data = await response.json();

        if (!data || data.length === 0) {
            resultsList.innerHTML = "<div style='text-align:center;'>No results submitted yet.</div>";
            return;
        }

        // Replace loading with real content
        resultsList.innerHTML = "";
        data.forEach((record) => {
            const row = document.createElement("div");
            row.classList.add("record-row");
            row.innerHTML = `<div>${record.position}</div><div>${record.time.replace(/\n/g, '')}</div>`;
            resultsList.appendChild(row);
        });

    } catch (err) {
        console.error("Failed to fetch results:", err);
        resultsList.innerHTML = "<div class='record-row loading'>❌ Failed to load results.</div>";
    }
}
// Run loadResults() once the page finishes loading
window.addEventListener("DOMContentLoaded", loadResults);


// Handle Delete All Results
const deleteBtn = document.querySelector("#deleteResultsBtn");
// Add event listener to the delete button
// This will delete all results from the database
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
        const response = await fetch(`${BASE_URL}/results`, {
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


// CSV Export Functionality
const csvBtn = document.querySelector("#downloadCsvBtn");
// Add event listener to the CSV button
// This will fetch the results and convert them to CSV format
csvBtn.addEventListener("click", async () => {
    try {
        const response = await fetch(`${BASE_URL}/results`);
        const data = await response.json();

        if (!data || data.length === 0) {
            alert("⚠️ No results to export.");
            return;
        }

        // CSV Header
        let csvContent = "data:text/csv;charset=utf-8,Position,Time\n";

        // Format and clean each record
        data.forEach(record => {
            // Remove all line breaks and extra spaces from time
            const cleanTime = record.time.replace(/\s+/g, '').replace(/\n/g, '');
            csvContent += `${record.position},${cleanTime}\n`;
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


// NIGHT MODE TOGGLE LOGIC
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
