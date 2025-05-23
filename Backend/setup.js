// SQLite database setup
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open the database
const dbPromise = open({
    filename: './results.db',
    driver: sqlite3.Database
});

// Create results table if it doesn't exist
async function setupDatabase() {
    const db = await dbPromise;

    await db.exec(`
        CREATE TABLE IF NOT EXISTS results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            position INTEGER NOT NULL,
            time TEXT NOT NULL,
            runnerId TEXT
        );
    `);

    console.log("Database and table setup complete.");
}

// Run setup
setupDatabase().catch((err) => {
    console.error("Failed to set up database:", err);
});
