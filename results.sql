PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            position INTEGER NOT NULL,
            time TEXT NOT NULL
        );
INSERT INTO results VALUES(1,1,replace('\n        00:\n        00:\n        03:\n        44\n    ','\n',char(10)));
INSERT INTO results VALUES(2,2,replace('\n        00:\n        00:\n        04:\n        98\n    ','\n',char(10)));
INSERT INTO results VALUES(3,3,replace('\n        00:\n        00:\n        05:\n        77\n    ','\n',char(10)));
INSERT INTO results VALUES(4,4,replace('\n        00:\n        00:\n        06:\n        19\n    ','\n',char(10)));
INSERT INTO results VALUES(5,5,replace('\n        00:\n        00:\n        06:\n        73\n    ','\n',char(10)));
INSERT INTO results VALUES(6,6,replace('\n        00:\n        00:\n        07:\n        09\n    ','\n',char(10)));
INSERT INTO results VALUES(7,7,replace('\n        00:\n        00:\n        07:\n        48\n    ','\n',char(10)));
INSERT INTO results VALUES(8,8,replace('\n        00:\n        00:\n        08:\n        44\n    ','\n',char(10)));
INSERT INTO results VALUES(9,9,replace('\n        00:\n        00:\n        08:\n        84\n    ','\n',char(10)));
INSERT INTO results VALUES(10,10,replace('\n        00:\n        00:\n        09:\n        49\n    ','\n',char(10)));
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('results',10);
COMMIT;
