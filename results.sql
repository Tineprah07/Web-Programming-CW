PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            position INTEGER NOT NULL,
            time TEXT NOT NULL
        );
INSERT INTO results VALUES(1,1,replace('\n        00:\n        00:\n        02:\n        12\n    ','\n',char(10)));
INSERT INTO results VALUES(2,2,replace('\n        00:\n        00:\n        02:\n        63\n    ','\n',char(10)));
INSERT INTO results VALUES(3,3,replace('\n        00:\n        00:\n        03:\n        10\n    ','\n',char(10)));
INSERT INTO results VALUES(4,4,replace('\n        00:\n        00:\n        04:\n        12\n    ','\n',char(10)));
INSERT INTO results VALUES(5,5,replace('\n        00:\n        00:\n        04:\n        76\n    ','\n',char(10)));
INSERT INTO results VALUES(6,6,replace('\n        00:\n        00:\n        05:\n        45\n    ','\n',char(10)));
INSERT INTO results VALUES(7,7,replace('\n        00:\n        00:\n        06:\n        10\n    ','\n',char(10)));
INSERT INTO results VALUES(8,8,replace('\n        00:\n        00:\n        06:\n        66\n    ','\n',char(10)));
INSERT INTO results VALUES(9,9,replace('\n        00:\n        00:\n        07:\n        22\n    ','\n',char(10)));
INSERT INTO results VALUES(10,10,replace('\n        00:\n        00:\n        07:\n        83\n    ','\n',char(10)));
INSERT INTO results VALUES(11,11,replace('\n        00:\n        00:\n        08:\n        61\n    ','\n',char(10)));
INSERT INTO results VALUES(12,12,replace('\n        00:\n        00:\n        09:\n        05\n    ','\n',char(10)));
INSERT INTO results VALUES(13,13,replace('\n        00:\n        00:\n        10:\n        72\n    ','\n',char(10)));
INSERT INTO results VALUES(14,14,replace('\n        00:\n        00:\n        11:\n        42\n    ','\n',char(10)));
INSERT INTO results VALUES(15,15,replace('\n        00:\n        00:\n        12:\n        25\n    ','\n',char(10)));
INSERT INTO results VALUES(16,16,replace('\n        00:\n        00:\n        12:\n        83\n    ','\n',char(10)));
INSERT INTO results VALUES(17,17,replace('\n        00:\n        00:\n        14:\n        19\n    ','\n',char(10)));
INSERT INTO results VALUES(18,18,replace('\n        00:\n        00:\n        14:\n        94\n    ','\n',char(10)));
INSERT INTO results VALUES(19,19,replace('\n        00:\n        00:\n        15:\n        72\n    ','\n',char(10)));
INSERT INTO results VALUES(20,20,replace('\n        00:\n        00:\n        16:\n        76\n    ','\n',char(10)));
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('results',20);
COMMIT;
