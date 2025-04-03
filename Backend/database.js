import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open the database (async/await compatible)
const dbPromise = open({
    filename: './results.db',
    driver: sqlite3.Database
});

// Function to save multiple race records to the DB
export async function saveResults(records) {
    const db = await dbPromise;

    // Insert each record using a transaction
    const insertQuery = `INSERT INTO results (position, time) VALUES (?, ?)`;

    await db.run('BEGIN TRANSACTION');
    try {
        for (const record of records) {
            await db.run(insertQuery, [record.position, record.time]);
        }
        await db.run('COMMIT');
    } catch (error) {
        await db.run('ROLLBACK');
        throw error;
    }
}
