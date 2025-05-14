PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            position INTEGER NOT NULL,
            time TEXT NOT NULL,
            runnerId TEXT
        );
INSERT INTO results VALUES(1,1,replace('\n        00:\n        00:\n        01:\n        31\n    ','\n',char(10)),'A9');
INSERT INTO results VALUES(2,2,replace('\n        00:\n        00:\n        06:\n        14\n    ','\n',char(10)),'A2');
INSERT INTO results VALUES(3,3,replace('\n        00:\n        00:\n        08:\n        61\n    ','\n',char(10)),'a1');
INSERT INTO results VALUES(4,4,replace('\n        00:\n        00:\n        11:\n        43\n    ','\n',char(10)),'A3');
INSERT INTO results VALUES(5,5,replace('\n        00:\n        00:\n        13:\n        61\n    ','\n',char(10)),'a6');
INSERT INTO results VALUES(6,6,replace('\n        00:\n        00:\n        26:\n        06\n    ','\n',char(10)),'b1');
INSERT INTO results VALUES(7,7,replace('\n        00:\n        00:\n        31:\n        99\n    ','\n',char(10)),'b6');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('results',7);
COMMIT;
