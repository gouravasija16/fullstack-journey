DROP TABLE IF EXISTS accounts;
CREATE TABLE  accounts (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    balance INT NOT NULL CHECK (balance >=0)
);
INSERT INTO accounts (name,balance)
VALUES ('Asha',1000),('Ravi',500),('Meera',200);
SELECT * FROM accounts;

--Lab A
UPDATE accounts SET balance = balance - 300 WHERE name = 'Asha';
UPDATE accounts SET balanse = balance + 300 WHERE name = 'Ravi';

UPDATE accounts SET balance = CASE name 
WHEN 'Asha' THEN 1000 WHEN 'Ravi' THEN 500 WHEN 'Meera' THEN 200 END ;

--Lab B
BEGIN;
UPDATE accounts SET balance = balance -300 WHERE name = 'Asha';
UPDATE acccounts SET balanse = balance + 300 WHERE name = 'Ravi';
SELECT * FROM accounts
ROLLBACK;
SELECT * FROM accounts;

-- Lab C
BEGIN;
UPDATE accounts SET balance = balance - 300 WHERE name = 'Asha';
UPDATE accounts SET balance = balance + 300 WHERE name = 'Ravi';
SELECT * FROM accounts;
COMMIT;
SELECT * FROM accounts;

-- Lab D
BEGIN;
UPDATE accounts SET balance = 0 WHERE name = 'Meera';
SELECT * FROM accounts;
ROLLBACK;
SELECT * FROM accounts;

BEGIN;
UPDATE accounts SET balance = balance - 5000 WHERE name = 'Asha';
SELECT * FROM accounts;
ROLLBACK;
SELECT * FROM accounts;

--Lab E
