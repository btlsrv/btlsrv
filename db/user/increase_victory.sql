UPDATE users
SET victories = victories + 1
WHERE user_id = $1;