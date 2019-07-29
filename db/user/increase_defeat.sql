UPDATE users
SET defeats = defeats + 1
WHERE user_id = $1;