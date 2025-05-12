PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            position INTEGER NOT NULL,
            time TEXT NOT NULL,
            runnerId TEXT
        );
INSERT INTO results VALUES(1,1,replace('\n        00:\n        00:\n        01:\n        21\n    ','\n',char(10)),'A1');
INSERT INTO results VALUES(2,2,replace('\n        00:\n        00:\n        06:\n        94\n    ','\n',char(10)),'A5');
INSERT INTO results VALUES(3,3,replace('\n        00:\n        00:\n        11:\n        46\n    ','\n',char(10)),'A8');
INSERT INTO results VALUES(4,4,replace('\n        00:\n        00:\n        19:\n        36\n    ','\n',char(10)),'A2');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('results',4);
COMMIT;
