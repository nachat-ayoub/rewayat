DROP FUNCTION IF EXISTS updateUser;
-- 
CREATE FUNCTION updateUser(
    username VARCHAR(200),
    userEmail VARCHAR(200),
    userAge INT
) RETURNS INT;
BEGIN
DECLARE msg INT DEFAULT 1;
-- 
UPDATE users
SET email = userEmail,
    age = userAge,
    WHERE username = username;
RETURN INT;
END;
-- Query with errors. Please, check the error below.
-- ER_COL_COUNT_DOESNT_MATCH_PLEASE_UPDATE: Column count of mysql.proc is wrong. Expected 21, found 20. Created with MariaDB 100108, now running 100424. Please use mysql_upgrade to fix this error
-- CONSOLERE-RUN QUERYEXPORTOPEN