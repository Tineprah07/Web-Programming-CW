PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            position INTEGER NOT NULL,
            time TEXT NOT NULL,
            runnerId TEXT
        );
INSERT INTO results VALUES(1,1,replace('\n        00:\n        00:\n        01:\n        19\n    ','\n',char(10)),'A1');
INSERT INTO results VALUES(2,2,replace('\n        00:\n        00:\n        05:\n        17\n    ','\n',char(10)),'A9');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('results',2);
COMMIT;
