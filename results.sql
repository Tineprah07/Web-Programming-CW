PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            position INTEGER NOT NULL,
            time TEXT NOT NULL,
            runnerId TEXT
        );
INSERT INTO results VALUES(1,1,replace('\n        00:\n        00:\n        05:\n        14\n    ','\n',char(10)),'a1');
INSERT INTO results VALUES(2,2,replace('\n        00:\n        01:\n        21:\n        93\n    ','\n',char(10)),'A2');
INSERT INTO results VALUES(3,3,replace('\n        00:\n        01:\n        29:\n        61\n    ','\n',char(10)),'A6');
INSERT INTO results VALUES(4,4,replace('\n        00:\n        01:\n        35:\n        03\n    ','\n',char(10)),'A7');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('results',4);
COMMIT;
