// SQLite database setup
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


/**
 * Save all race results (replaces existing ones)
 * Clears old results and resets ID counter
 * Inserts new records in a transaction
 */
export async function saveResults(records) {
    const db = await open({
        filename: './results.db',
        driver: sqlite3.Database
    });
  
    await db.run('BEGIN TRANSACTION');
    try {
        await db.run("DELETE FROM results");

        await db.run("DELETE FROM sqlite_sequence WHERE name='results'");

        const insertQuery = `INSERT INTO results (position, time, runnerId) VALUES (?, ?, ?)`;
        for (const record of records) {
            await db.run(insertQuery, [record.position, record.time, record.runnerId]);
        }
        await db.run('COMMIT');
    } catch (error) {
        await db.run('ROLLBACK');
        throw error;
    }
}

/* Function to get all results from the DB
This function retrieves all results from the database and orders them by position */
export async function getResults() {
    const db = await open({
        filename: './results.db',
        driver: sqlite3.Database
    });

    return db.all("SELECT position, time, runnerId FROM results ORDER BY position ASC");
}

// Function to delete all results from the DB
export async function deleteAllResults() {
    const db = await open({
        filename: './results.db',
        driver: sqlite3.Database
    });

    await db.run("DELETE FROM results");
}

