PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            position INTEGER NOT NULL,
            time TEXT NOT NULL
        );
INSERT INTO results VALUES(1,1,replace('\n        00:\n        00:\n        12:\n        59\n    ','\n',char(10)));
INSERT INTO results VALUES(2,2,replace('\n        00:\n        00:\n        14:\n        06\n    ','\n',char(10)));
INSERT INTO results VALUES(3,3,replace('\n        00:\n        00:\n        14:\n        58\n    ','\n',char(10)));
INSERT INTO results VALUES(4,4,replace('\n        00:\n        00:\n        14:\n        96\n    ','\n',char(10)));
INSERT INTO results VALUES(5,5,replace('\n        00:\n        00:\n        15:\n        40\n    ','\n',char(10)));
INSERT INTO results VALUES(6,6,replace('\n        00:\n        00:\n        15:\n        81\n    ','\n',char(10)));
INSERT INTO results VALUES(7,7,replace('\n        00:\n        00:\n        16:\n        30\n    ','\n',char(10)));
INSERT INTO results VALUES(8,8,replace('\n        00:\n        00:\n        16:\n        70\n    ','\n',char(10)));
INSERT INTO results VALUES(9,9,replace('\n        00:\n        00:\n        17:\n        10\n    ','\n',char(10)));
INSERT INTO results VALUES(10,10,replace('\n        00:\n        00:\n        17:\n        47\n    ','\n',char(10)));
INSERT INTO results VALUES(11,11,replace('\n        00:\n        00:\n        17:\n        83\n    ','\n',char(10)));
INSERT INTO results VALUES(12,12,replace('\n        00:\n        00:\n        18:\n        15\n    ','\n',char(10)));
INSERT INTO results VALUES(13,13,replace('\n        00:\n        00:\n        18:\n        60\n    ','\n',char(10)));
INSERT INTO results VALUES(14,14,replace('\n        00:\n        00:\n        18:\n        95\n    ','\n',char(10)));
INSERT INTO results VALUES(15,15,replace('\n        00:\n        00:\n        19:\n        34\n    ','\n',char(10)));
INSERT INTO results VALUES(16,16,replace('\n        00:\n        00:\n        20:\n        13\n    ','\n',char(10)));
INSERT INTO results VALUES(17,17,replace('\n        00:\n        00:\n        21:\n        24\n    ','\n',char(10)));
INSERT INTO results VALUES(18,18,replace('\n        00:\n        00:\n        22:\n        22\n    ','\n',char(10)));
INSERT INTO results VALUES(19,19,replace('\n        00:\n        00:\n        22:\n        50\n    ','\n',char(10)));
INSERT INTO results VALUES(20,20,replace('\n        00:\n        00:\n        22:\n        66\n    ','\n',char(10)));
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('results',20);
COMMIT;
