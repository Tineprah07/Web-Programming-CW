PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            position INTEGER NOT NULL,
            time TEXT NOT NULL
        );
INSERT INTO results VALUES(1,1,replace('\n        00:\n        00:\n        02:\n        66\n    ','\n',char(10)));
INSERT INTO results VALUES(2,2,replace('\n        00:\n        00:\n        03:\n        99\n    ','\n',char(10)));
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('results',2);
COMMIT;
