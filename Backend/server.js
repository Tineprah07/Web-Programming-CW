// Import the Express module
import express from 'express';
import { saveResults } from './database.js';
import { getResults } from './database.js';
import { deleteAllResults } from './database.js';


// So the reason for line 9 to 19 is to help my backend server know where the results.db and results.sql file is
// And to be able to export the database from .db to a .sql file to be human readable
// Note that i will delete some of these comments, i am using them to work with my code well
// The reason for the result.sql is for testing purpose

// Exec - Allows the JavaScript to run terminal/command-line instructions
// Hence it is a module that allows to run shell commands automatically
import { exec } from 'child_process'; 
import path from 'path'; // This is the path module - it is used to work with file and directory paths
import { fileURLToPath } from 'url'; // fileURLToPath() converts path from that URL format into a normal path format

// Get current directory and filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Path to DB and export file - these 2 help the backend server know where the results.db and results.sql file is
const dbPath = path.join(__dirname, '../results.db'); // 
const exportPath = path.join(__dirname, '../results.sql');


const app = express(); 
const PORT = 8080;
app.use(express.static('Frontend')); // serves frontend files
app.use(express.json()); // parse JSON bodies - This line tells your server: “Be ready to understand JSON data sent from the browser.”

// POST results - Save race results to DB
app.post('/results', async (req, res) => {
    const records = req.body.records;

    if (!records || !Array.isArray(records)) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    try {
        await saveResults(records); // Save new race (deletes old)

        // Export fresh result.sql in root
        exec(`sqlite3 "${dbPath}" .dump > "${exportPath}"`, (error) => {
            if (error) {
                console.error("❌ Failed to export result.sql:", error.message);
            } else {
                console.log("✅ result.sql updated.");
            }
        });

        return res.status(200).json({ message: 'Results saved and exported' });
    } catch (err) {
        console.error("❌ Error saving results:", err);
        return res.status(500).json({ message: 'Failed to save results' });
    }
});

// GET results - Returns all submitted race results from the database
app.get('/results', async (req, res) => {
    try {
        const results = await getResults(); // use the imported function
        res.json(results);
    } catch (err) {
        console.error("❌ Error getting results:", err);
        res.status(500).json({ error: "Failed to retrieve results" });
    }
});

// DELETE results - Delete all submitted results from the database
app.delete('/results', async (req, res) => {
    try {
        await deleteAllResults();
        return res.status(200).json({ message: "All results deleted" });
    } catch (err) {
        console.error("❌ Error deleting results:", err); // This will show the real error in terminal
        return res.status(500).json({ error: "Failed to delete results" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});