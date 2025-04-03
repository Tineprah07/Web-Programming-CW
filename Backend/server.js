// Import the Express module
import express from 'express';
import { saveResults } from './database.js';


const app = express();
const PORT = 8080;
app.use(express.static('Frontend')); // serves frontend files
app.use(express.json()); // parse JSON bodies

// POST /results - Save race results to DB
app.post('/results', async (req, res) => {
    const records = req.body.records;

    if (!records || !Array.isArray(records)) {
        return res.status(400).json({ message: 'Invalid data' });
    }

    try {
        await saveResults(records);
        res.status(200).json({ message: 'Results saved' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});