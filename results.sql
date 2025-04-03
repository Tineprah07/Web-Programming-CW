PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            position INTEGER NOT NULL,
            time TEXT NOT NULL
        );
INSERT INTO results VALUES(1,1,replace('\n        00:\n        00:\n        01:\n        26\n    ','\n',char(10)));
INSERT INTO results VALUES(2,2,replace('\n        00:\n        00:\n        02:\n        44\n    ','\n',char(10)));
INSERT INTO results VALUES(3,3,replace('\n        00:\n        00:\n        03:\n        58\n    ','\n',char(10)));
INSERT INTO results VALUES(4,4,replace('\n        00:\n        00:\n        04:\n        44\n    ','\n',char(10)));
INSERT INTO results VALUES(5,5,replace('\n        00:\n        00:\n        04:\n        97\n    ','\n',char(10)));
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('results',5);
COMMIT;
