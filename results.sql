PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            position INTEGER NOT NULL,
            time TEXT NOT NULL,
            runnerId TEXT
        );
INSERT INTO results VALUES(1,1,replace('\n        00:\n        00:\n        01:\n        63\n    ','\n',char(10)),'a1');
INSERT INTO results VALUES(2,2,replace('\n        00:\n        00:\n        07:\n        14\n    ','\n',char(10)),'a2');
INSERT INTO results VALUES(3,3,replace('\n        00:\n        00:\n        11:\n        94\n    ','\n',char(10)),'a3');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('results',3);
COMMIT;
