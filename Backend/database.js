import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open the database (async/await compatible)
const dbPromise = open({
    filename: './results.db',
    driver: sqlite3.Database
});

// Function to save multiple race records to the DB
export async function saveResults(records) {
    const db = await open({
        filename: './results.db',
        driver: sqlite3.Database
    });
    // Begin a transaction
    await db.run('BEGIN TRANSACTION');
    try {
        // Step 1: Delete all existing results
        await db.run("DELETE FROM results");

        // Step 2: Reset the AUTOINCREMENT counter
        await db.run("DELETE FROM sqlite_sequence WHERE name='results'");

        // Step 3: Insert new records
        const insertQuery = `INSERT INTO results (position, time) VALUES (?, ?)`;
        for (const record of records) {
            await db.run(insertQuery, [record.position, record.time]);
        }
        await db.run('COMMIT');
    } catch (error) {
        await db.run('ROLLBACK');
        throw error;
    }
}

// Function to get all results from the DB
// This function retrieves all results from the database and orders them by position
export async function getResults() {
    const db = await open({
        filename: './results.db',
        driver: sqlite3.Database
    });

    return db.all("SELECT position, time FROM results ORDER BY position ASC");
}

// Function to delete all results from the DB
export async function deleteAllResults() {
    const db = await open({
        filename: './results.db',
        driver: sqlite3.Database
    });

    await db.run("DELETE FROM results");
}