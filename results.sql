PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            position INTEGER NOT NULL,
            time TEXT NOT NULL
        );
INSERT INTO results VALUES(1,1,replace('\n        00:\n        00:\n        01:\n        79\n    ','\n',char(10)));
INSERT INTO results VALUES(2,2,replace('\n        00:\n        00:\n        02:\n        71\n    ','\n',char(10)));
INSERT INTO results VALUES(3,3,replace('\n        00:\n        00:\n        03:\n        34\n    ','\n',char(10)));
INSERT INTO results VALUES(4,4,replace('\n        00:\n        00:\n        04:\n        16\n    ','\n',char(10)));
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('results',4);
COMMIT;
