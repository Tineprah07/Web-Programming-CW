PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            position INTEGER NOT NULL,
            time TEXT NOT NULL,
            runnerId TEXT
        );
INSERT INTO results VALUES(1,1,replace('\n        00:\n        00:\n        06:\n        59\n    ','\n',char(10)),'A2');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('results',1);
COMMIT;
