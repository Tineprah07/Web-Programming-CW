PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            position INTEGER NOT NULL,
            time TEXT NOT NULL,
            runnerId TEXT
        );
INSERT INTO results VALUES(1,1,replace('\n        00:\n        00:\n        01:\n        41\n    ','\n',char(10)),'B1');
INSERT INTO results VALUES(2,2,replace('\n        00:\n        00:\n        07:\n        44\n    ','\n',char(10)),'b5');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('results',2);
COMMIT;
