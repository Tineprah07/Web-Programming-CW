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
    try {
        // Send GET request to /results endpoint
        const response = await fetch("http://localhost:8080/results");
        const data = await response.json();

        // Target the container that will hold the rows
        const resultsList = document.querySelector("#resultsList");
        resultsList.innerHTML = ""; // Clear anything already in there

        // If no results found, show a message
        if (data.length === 0) {
            resultsList.innerHTML = "<div style='text-align:center;'>No results submitted yet.</div>";
            return;
        }

        // Loop through each record and display it
        data.forEach((record) => {
            const row = document.createElement("div");
            row.classList.add("record-row");

            // Display position and time
            row.innerHTML = `
                <div>${record.position}</div>
                <div>${record.time}</div>
            `;
            resultsList.appendChild(row);
        });
    } catch (err) {
        console.error("Failed to fetch results:", err);
    }
}
// Run loadResults() once the page finishes loading
window.addEventListener("DOMContentLoaded", loadResults);


// Handle Delete All Results
const deleteBtn = document.getElementById("deleteResultsBtn");
// Add event listener to the delete button
// This will delete all results from the database
deleteBtn.addEventListener("click", async () => {
    const resultsList = document.getElementById("resultsList");
    // Check if any result rows exist
    const hasResults = resultsList.querySelector(".record-row");

    if (!hasResults) {
        alert("⚠️ No results submitted.");
        return;
    }

    const confirmDelete = confirm("Are you sure you want to delete all race results?");
    if (!confirmDelete) return;

    try {
        const response = await fetch("http://localhost:8080/results", {
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
