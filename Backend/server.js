// Import the Express module
import express from 'express';
import { saveResults } from './database.js';
import { getResults } from './database.js';
import { deleteAllResults } from './database.js';
import { exec } from 'child_process'; 
import path from 'path'; 
import { fileURLToPath } from 'url'; 

// Get current directory and filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths for the SQLite database and SQL export file
// Note: result.sql is used for development/testing purposes only — to inspect the database in readable format.
const dbPath = path.join(__dirname, '../results.db');  
const exportPath = path.join(__dirname, '../results.sql');

// Initialize Express app
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

        // For testing: export the contents of results.db to result.sql for human-readable inspection
        // This export is used during development to view DB contents outside of SQLite
        exec(`sqlite3 "${dbPath}" .dump > "${exportPath}"`, (error) => {
            if (error) {
                console.error("Failed to export result.sql:", error.message);
            } else {
                console.log("✅ result.sql updated for testing purpose.");
            }
        });

        return res.status(200).json({ message: 'Results saved and exported' });
    } catch (err) {
        console.error("Error saving results:", err);
        return res.status(500).json({ message: 'Failed to save results' });
    }
});

// GET results - Returns all submitted race results from the database
app.get('/results', async (req, res) => {
    try {
        const results = await getResults(); // use the imported function
        res.json(results);
    } catch (err) {
        console.error("Error getting results:", err);
        res.status(500).json({ error: "Failed to retrieve results" });
    }
});

// DELETE results - Delete all submitted results from the database
app.delete('/results', async (req, res) => {
    try {
        await deleteAllResults();
        return res.status(200).json({ message: "All results deleted" });
    } catch (err) {
        console.error("Error deleting results:", err); 
        return res.status(500).json({ error: "Failed to delete results" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});