DROP FUNCTION IF EXISTS updateUser;
-- * Update User Function :
CREATE FUNCTION updateUser(
    userUsername VARCHAR(255),
    userEmail VARCHAR(255),
    userAge INT
) RETURNS INT DETERMINISTIC BEGIN
DECLARE msg INT DEFAULT 1;
-- 
UPDATE users
SET email = userEmail,
    age = userAge
WHERE username = userUsername;
-- 
RETURN msg;
END;
-- 
-- 
-- ? Drop Procedure :
DROP PROCEDURE IF EXISTS deleteUser;
-- ? Create Procedure :
CREATE PROCEDURE deleteUser(_username VARCHAR(255)) BEGIN
DELETE FROM users
WHERE username = _username;
END;
-- ? Call Procedure :
CALL deleteUser("Test1");
-- 
INSERT INTO users (username, email, password, age)
VALUES ('Test1', 'Test1@gmail.com', 'Test123', 30);
-- 
SELECT *
from users;
-- 
SELECT updateUser('Test2', 'test2@gmail.com', 32);