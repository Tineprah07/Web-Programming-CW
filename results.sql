PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            position INTEGER NOT NULL,
            time TEXT NOT NULL
        );
INSERT INTO results VALUES(1,1,replace('\n        00:\n        00:\n        05:\n        61\n    ','\n',char(10)));
INSERT INTO results VALUES(2,2,replace('\n        00:\n        00:\n        06:\n        14\n    ','\n',char(10)));
INSERT INTO results VALUES(3,3,replace('\n        00:\n        00:\n        06:\n        51\n    ','\n',char(10)));
INSERT INTO results VALUES(4,4,replace('\n        00:\n        00:\n        06:\n        81\n    ','\n',char(10)));
INSERT INTO results VALUES(5,5,replace('\n        00:\n        00:\n        07:\n        13\n    ','\n',char(10)));
INSERT INTO results VALUES(6,6,replace('\n        00:\n        00:\n        07:\n        46\n    ','\n',char(10)));
INSERT INTO results VALUES(7,7,replace('\n        00:\n        00:\n        07:\n        71\n    ','\n',char(10)));
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('results',7);
COMMIT;
